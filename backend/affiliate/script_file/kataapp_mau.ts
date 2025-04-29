// src/kataapp/kataapp.module.ts
import { Module, CacheModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';

import { KataAppController } from './kataapp.controller';
import { KataAppService } from './kataapp.service';
import { KataAppRepository } from './kataapp.repository';
import { KataAppEventService } from './kataapp-event.service';
import { KataAppElasticsearchService } from './kataapp-elasticsearch.service';
import { KataAppWebSocketGateway } from './kataapp-websocket.gateway';
import { KataAppRateLimitGuard } from './guards/kataapp-rate-limit.guard';
import { KataAppMLService } from './services/kataapp-ml.service';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    // Redis Cache Configuration
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST', 'localhost'),
        port: configService.get('REDIS_PORT', 6379),
        ttl: configService.get('REDIS_CACHE_TTL', 300), // 5 minutes
        max: 1000, // maximum number of items in cache
        isGlobal: true,
      }),
    }),
    
    // Kafka Configuration for Event-Driven Architecture
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'kataapp',
              brokers: configService.get('KAFKA_BROKERS', 'localhost:9092').split(','),
            },
            consumer: {
              groupId: 'kataapp-consumer',
              allowAutoTopicCreation: true,
            },
            producer: {
              allowAutoTopicCreation: true,
              transactionalId: 'kataapp-transaction',
            },
          },
        }),
      },
    ]),
    
    // Rate Limiting - Global Configuration
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('THROTTLE_TTL', 60), // 1 minute
        limit: configService.get('THROTTLE_LIMIT', 100), // 100 requests per minute
      }),
    }),
    
    // Elasticsearch for Full-text Search
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE', 'http://localhost:9200'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME', ''),
          password: configService.get('ELASTICSEARCH_PASSWORD', ''),
        },
        maxRetries: 10,
        requestTimeout: 60000,
      }),
    }),
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [KataAppController],
  providers: [
    KataAppService,
    KataAppRepository,
    KataAppEventService,
    KataAppElasticsearchService,
    KataAppWebSocketGateway,
    KataAppMLService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: KataAppRateLimitGuard,
    },
  ],
  exports: [KataAppService, PrismaService],
})
export class KataAppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware)
      .forRoutes('kataapp');
  }
}

// src/kataapp/kataapp.service.ts
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

import { KataAppRepository } from './kataapp.repository';
import { KataAppEventService } from './kataapp-event.service';
import { KataAppElasticsearchService } from './kataapp-elasticsearch.service';
import { KataAppMLService } from './services/kataapp-ml.service';
import { PaginationDto } from './dto/pagination.dto';
import { CreateKataAppDto, UpdateKataAppDto } from './dto/kataapp.dto';
import { KataApp } from './interfaces/kataapp.interface';

@Injectable()
export class KataAppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly repository: KataAppRepository,
    private readonly eventService: KataAppEventService,
    private readonly elasticsearchService: KataAppElasticsearchService,
    private readonly mlService: KataAppMLService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    // Subscribe to Kafka topics
    const topics = ['kataapp.created', 'kataapp.updated', 'kataapp.deleted'];
    topics.forEach(topic => {
      this.kafkaClient.subscribeToResponseOf(topic);
    });
    await this.kafkaClient.connect();
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: KataApp[]; meta: any }> {
    const cacheKey = `kataapp:all:${JSON.stringify(paginationDto)}`;
    const cachedData = await this.cacheManager.get<{ data: KataApp[]; meta: any }>(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    const result = await this.repository.findAll(paginationDto);
    
    // Cache the results for future requests
    await this.cacheManager.set(cacheKey, result, {
      ttl: this.configService.get('CACHE_TTL_SECONDS', 300)
    });
    
    return result;
  }

  async findById(id: string): Promise<KataApp> {
    const cacheKey = `kataapp:${id}`;
    const cachedData = await this.cacheManager.get<KataApp>(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    const result = await this.repository.findById(id);
    
    // Cache the result for future requests
    if (result) {
      await this.cacheManager.set(cacheKey, result, {
        ttl: this.configService.get('CACHE_TTL_SECONDS', 300)
      });
    }
    
    return result;
  }

  async search(query: string, paginationDto: PaginationDto): Promise<{ data: KataApp[]; meta: any }> {
    const cacheKey = `kataapp:search:${query}:${JSON.stringify(paginationDto)}`;
    const cachedData = await this.cacheManager.get<{ data: KataApp[]; meta: any }>(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }
    
    // Use Elasticsearch for full-text search
    const searchResults = await this.elasticsearchService.search(query, paginationDto);
    
    // Cache the results
    await this.cacheManager.set(cacheKey, searchResults, {
      ttl: this.configService.get('CACHE_TTL_SEARCH_SECONDS', 120)
    });
    
    return searchResults;
  }

  async create(createDto: CreateKataAppDto): Promise<KataApp> {
    // Create the entity
    const result = await this.repository.create(createDto);
    
    // Index in Elasticsearch
    await this.elasticsearchService.index(result);
    
    // Emit event to Kafka
    this.eventService.emitCreatedEvent(result);
    
    return result;
  }

  async update(id: string, updateDto: UpdateKataAppDto): Promise<KataApp> {
    // Update the entity
    const result = await this.repository.update(id, updateDto);
    
    // Update in Elasticsearch
    await this.elasticsearchService.update(id, result);
    
    // Emit event to Kafka
    this.eventService.emitUpdatedEvent(result);
    
    // Invalidate cache
    await this.cacheManager.del(`kataapp:${id}`);
    await this.cacheManager.del(new RegExp(`kataapp:all:*`));
    await this.cacheManager.del(new RegExp(`kataapp:search:*`));
    
    return result;
  }

  async delete(id: string): Promise<boolean> {
    // Delete the entity
    const result = await this.repository.delete(id);
    
    // Delete from Elasticsearch
    if (result) {
      await this.elasticsearchService.delete(id);
      
      // Emit event to Kafka
      this.eventService.emitDeletedEvent({ id });
      
      // Invalidate cache
      await this.cacheManager.del(`kataapp:${id}`);
      await this.cacheManager.del(new RegExp(`kataapp:all:*`));
      await this.cacheManager.del(new RegExp(`kataapp:search:*`));
    }
    
    return result;
  }

  async predictWithRNN(data: any): Promise<any> {
    return this.mlService.predictWithRNN(data);
  }
}

// src/kataapp/kataapp.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from './dto/pagination.dto';
import { CreateKataAppDto, UpdateKataAppDto } from './dto/kataapp.dto';
import { KataApp } from './interfaces/kataapp.interface';

@Injectable()
export class KataAppRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(paginationDto: PaginationDto): Promise<{ data: KataApp[]; meta: any }> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = paginationDto;
    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
      this.prisma.kataApp.findMany({
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder.toLowerCase() },
      }),
      this.prisma.kataApp.count(),
    ]);
    
    const lastPage = Math.ceil(total / limit);
    
    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage,
        hasNextPage: page < lastPage,
        hasPrevPage: page > 1,
      },
    };
  }

  async findById(id: string): Promise<KataApp> {
    return this.prisma.kataApp.findUnique({
      where: { id },
    });
  }

  async create(createDto: CreateKataAppDto): Promise<KataApp> {
    return this.prisma.kataApp.create({
      data: createDto,
    });
  }

  async update(id: string, updateDto: UpdateKataAppDto): Promise<KataApp> {
    return this.prisma.kataApp.update({
      where: { id },
      data: updateDto,
    });
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.prisma.kataApp.delete({
      where: { id },
    });
    return !!deleted;
  }
}

// src/kataapp/kataapp-event.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KataApp } from './interfaces/kataapp.interface';

@Injectable()
export class KataAppEventService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  emitCreatedEvent(data: KataApp): void {
    this.kafkaClient.emit('kataapp.created', {
      key: data.id,
      value: JSON.stringify(data),
      timestamp: Date.now().toString(),
    });
  }

  emitUpdatedEvent(data: KataApp): void {
    this.kafkaClient.emit('kataapp.updated', {
      key: data.id,
      value: JSON.stringify(data),
      timestamp: Date.now().toString(),
    });
  }

  emitDeletedEvent(data: { id: string }): void {
    this.kafkaClient.emit('kataapp.deleted', {
      key: data.id,
      value: JSON.stringify(data),
      timestamp: Date.now().toString(),
    });
  }
}

// src/kataapp/kataapp-elasticsearch.service.ts
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { KataApp } from './interfaces/kataapp.interface';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class KataAppElasticsearchService {
  private readonly indexName: string;

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {
    this.indexName = this.configService.get('ELASTICSEARCH_INDEX', 'kataapp');
    this.initIndex();
  }

  private async initIndex(): Promise<void> {
    const indexExists = await this.elasticsearchService.indices.exists({
      index: this.indexName,
    });

    if (!indexExists.body) {
      await this.elasticsearchService.indices.create({
        index: this.indexName,
        body: {
          mappings: {
            properties: {
              title: { type: 'text', analyzer: 'standard' },
              description: { type: 'text', analyzer: 'standard' },
              content: { type: 'text', analyzer: 'standard' },
              tags: { type: 'keyword' },
              createdAt: { type: 'date' },
              updatedAt: { type: 'date' },
            },
          },
        },
      });
    }
  }

  async index(document: KataApp): Promise<any> {
    return this.elasticsearchService.index({
      index: this.indexName,
      id: document.id,
      body: {
        ...document,
        createdAt: new Date(document.createdAt).toISOString(),
        updatedAt: new Date(document.updatedAt).toISOString(),
      },
    });
  }

  async update(id: string, document: KataApp): Promise<any> {
    return this.elasticsearchService.update({
      index: this.indexName,
      id,
      body: {
        doc: {
          ...document,
          updatedAt: new Date(document.updatedAt).toISOString(),
        },
      },
    });
  }

  async delete(id: string): Promise<any> {
    return this.elasticsearchService.delete({
      index: this.indexName,
      id,
    });
  }

  async search(query: string, paginationDto: PaginationDto): Promise<{ data: KataApp[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const from = (page - 1) * limit;

    const response = await this.elasticsearchService.search({
      index: this.indexName,
      body: {
        from,
        size: limit,
        query: {
          multi_match: {
            query,
            fields: ['title^3', 'description^2', 'content', 'tags'],
            fuzziness: 'AUTO',
          },
        },
        sort: [
          { _score: { order: 'desc' } },
          { createdAt: { order: 'desc' } },
        ],
      },
    });

    const hits = response.body.hits.hits;
    const total = response.body.hits.total.value;
    const lastPage = Math.ceil(total / limit);

    const data = hits.map(hit => ({
      ...hit._source,
      id: hit._id,
      score: hit._score,
    }));

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage,
        hasNextPage: page < lastPage,
        hasPrevPage: page > 1,
      },
    };
  }
}

// src/kataapp/kataapp-websocket.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { KataAppService } from './kataapp.service';
import { WsJwtAuthGuard } from '../auth/guards/ws-jwt-auth.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'kataapp',
})
export class KataAppWebSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(KataAppWebSocketGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private readonly kataAppService: KataAppService) {}

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('subscribeToKataAppUpdates')
  handleSubscribeToUpdates(client: Socket, payload: { roomId: string }) {
    const { roomId } = payload;
    client.join(roomId);
    this.logger.log(`Client ${client.id} joined room: ${roomId}`);
    return { event: 'subscribed', data: { roomId } };
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('unsubscribeFromKataAppUpdates')
  handleUnsubscribeFromUpdates(client: Socket, payload: { roomId: string }) {
    const { roomId } = payload;
    client.leave(roomId);
    this.logger.log(`Client ${client.id} left room: ${roomId}`);
    return { event: 'unsubscribed', data: { roomId } };
  }

  notifyKataAppCreated(kataApp: any) {
    this.server.emit('kataAppCreated', kataApp);
    if (kataApp.id) {
      this.server.to(kataApp.id).emit('kataAppCreated', kataApp);
    }
  }

  notifyKataAppUpdated(kataApp: any) {
    this.server.emit('kataAppUpdated', kataApp);
    if (kataApp.id) {
      this.server.to(kataApp.id).emit('kataAppUpdated', kataApp);
    }
  }

  notifyKataAppDeleted(kataApp: { id: string }) {
    this.server.emit('kataAppDeleted', kataApp);
    if (kataApp.id) {
      this.server.to(kataApp.id).emit('kataAppDeleted', kataApp);
    }
  }
}

// src/kataapp/middleware/rate-limit.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    const user = (req as any).user?.id || 'anonymous';
    const path = req.path;
    const key = `ratelimit:${path}:${user}:${ip}`;
    
    const redis = this.redisService.getClient();
    const limit = this.configService.get('API_RATE_LIMIT', 100);
    const windowSizeInSeconds = this.configService.get('API_RATE_LIMIT_WINDOW', 60);
    
    const current = await redis.get(key);
    const currentCount = current ? parseInt(current, 10) : 0;
    
    if (currentCount >= limit) {
      return res.status(429).json({
        statusCode: 429,
        message: 'Too Many Requests',
        error: 'Rate limit exceeded',
        retryAfter: await redis.ttl(key),
      });
    }
    
    await redis.incr(key);
    
    // Set expiry on first request
    if (currentCount === 0) {
      await redis.expire(key, windowSizeInSeconds);
    }
    
    // Set X-RateLimit headers
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - (currentCount + 1)));
    res.setHeader('X-RateLimit-Reset', Math.floor(Date.now() / 1000) + (await redis.ttl(key)));
    
    next();
  }
}

// src/kataapp/guards/kataapp-rate-limit.guard.ts
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KataAppRateLimitGuard extends ThrottlerGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user?.id || 'anonymous';
    
    // Skip rate limiting for admin users
    if (request.user?.role === 'admin') {
      return true;
    }
    
    try {
      return await super.canActivate(context);
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: 'Too Many Requests',
        error: 'Rate limit exceeded',
        retryAfter: this.configService.get('THROTTLE_TTL', 60),
      }, HttpStatus.TOO_MANY_REQUESTS);
    }
  }

  getTracker(req: Record<string, any>): string {
    return req.user?.id 
      ? `${req.ip}-${req.user.id}`
      : req.ip;
  }
}

// src/kataapp/services/kataapp-ml.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs-node';

@Injectable()
export class KataAppMLService {
  private model: tf.LayersModel;
  private readonly logger = new Logger(KataAppMLService.name);

  constructor() {
    this.initModel();
  }

  private async initModel() {
    try {
      // Try to load existing model
      this.model = await tf.loadLayersModel('file://./ml-models/rnn-model/model.json');
      this.logger.log('RNN model loaded successfully');
    } catch (error) {
      // Create a new model if loading fails
      this.logger.warn('Could not load RNN model, creating a new one');
      this.createRNNModel();
    }
  }

  private createRNNModel() {
    // Create a simple RNN model for demonstration purposes
    const model = tf.sequential();
    
    // Add RNN layer
    model.add(tf.layers.lstm({
      units: 64,
      returnSequences: false,
      inputShape: [10, 5], // [timesteps, features]
    }));
    
    // Add Dense layers
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.2 }));
    model.add(tf.layers.dense({ units: 1 }));
    
    // Compile the model
    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
      metrics: ['accuracy'],
    });
    
    this.model = model;
    this.logger.log('New RNN model created');
  }

  async predictWithRNN(data: number[][]): Promise<number[]> {
    if (!this.model) {
      await this.initModel();
    }
    
    try {
      // Ensure correct input shape [batch, timesteps, features]
      const tensorData = tf.tensor3d([data]);
      
      // Make prediction
      const prediction = this.model.predict(tensorData) as tf.Tensor;
      const result = await prediction.array();
      
      // Clean up tensors
      tensorData.dispose();
      prediction.dispose();
      
      return result[0];
    } catch (error) {
      this.logger.error('Error in RNN prediction', error);
      throw new Error(`RNN prediction failed: ${error.message}`);
    }
  }

  async trainRNNModel(trainingData: { input: number[][], output: number[] }[], epochs = 50): Promise<any> {
    if (!this.model) {
      await this.initModel();
    }
    
    try {
      // Prepare training data
      const inputs = tf.tensor3d(trainingData.map(item => item.input));
      const outputs = tf.tensor2d(trainingData.map(item => [item.output]));
      
      // Train the model
      const result = await this.model.fit(inputs, outputs, {
        epochs,
        batchSize: 32,
        validationSplit: 0.2,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            this.logger.debug(`Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.accuracy}`);
          }
        }
      });
      
      // Save the model after training
      await this.model.save('file://./ml-models/rnn-model');
      
      // Clean up tensors
      inputs.dispose();
      outputs.dispose();
      
      return {
        loss: result.history.loss[result.history.loss.length - 1],
        accuracy: result.history.accuracy[result.history.accuracy.length - 1],
      };
    } catch (error) {
      this.logger.error('Error in RNN training', error);
      throw new Error(`RNN training failed: ${error.message}`);
    }
  }
}

// src/kataapp/dto/pagination.dto.ts
import { IsOptional, IsInt, Min, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc', 'ASC', 'DESC'])
  sortOrder?: string = 'desc';
}

// src/kataapp/dto/kataapp.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsArray, MaxLength } from 'class-validator';

export class CreateKataAppDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  authorId?: string;
}

export class UpdateKataAppDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

// src/kataapp/interfaces/kataapp.interface.ts
export interface KataApp {
  id: string;
  title: string;
  description: string;
  content: string;
  tags?: string[];
  authorId?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }