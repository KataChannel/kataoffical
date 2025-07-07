const fs = require('fs');
const path = require('path');

// --- Helper Functions for Case Conversion ---

function toPascalCase(str) {
  return str
    .split(/[-_]/) // Split by hyphen or underscore
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toKebabCase(str) {
    // Handle potential PascalCase input first
    str = str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    // Handle camelCase to kebab-case if needed, then replace underscores and ensure lowercase
    return str
        .replace(/_/g, '-') // Replace underscores with hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase();
}

function toLowerSnakeCase(str) {
    return toKebabCase(str).replace(/-/g, '_');
}

function toUpperSnakeCase(str) {
    return toKebabCase(str).replace(/-/g, '_').toUpperCase();
}

function toLowerCaseSimple(str) {
    return toKebabCase(str).replace(/-/g, ''); // Remove hyphens for simple lower case
}

// --- Get Module Name from Command Line Arguments ---

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Error: Please provide a module name as a command-line argument.');
  console.log('Example: node generate-module.js MyAwesomeModule');
  console.log('Or:      node generate-module.js my-awesome-module');
  process.exit(1);
}

const rawModuleName = args[0];

// --- Generate Name Variations ---

const moduleNamePascal = toPascalCase(rawModuleName); // e.g., MyAwesomeModule
const moduleNameCamel = toCamelCase(rawModuleName);   // e.g., myAwesomeModule
const moduleNameKebab = toKebabCase(rawModuleName);   // e.g., my-awesome-module
const moduleNameLowerSnake = toLowerSnakeCase(rawModuleName); // e.g., my_awesome_module
const moduleNameUpperSnake = toUpperSnakeCase(rawModuleName); // e.g., MY_AWESOME_MODULE
const moduleNameLower = toLowerCaseSimple(rawModuleName); // e.g., myawesomemodule - Use Kebab as base for consistency

console.log(`Generating module: ${moduleNamePascal} (${moduleNameKebab})`);

// --- Define Placeholders ---
const PLACEHOLDERS = {
  '__ModuleNamePascal__': moduleNamePascal,
  '__ModuleNameCamel__': moduleNameCamel,
  '__ModuleNameKebab__': moduleNameKebab,
  '__ModuleNameLowerSnake__': moduleNameLowerSnake,
  '__ModuleNameUpperSnake__': moduleNameUpperSnake,
  '__ModuleNameLower__': moduleNameLower,
  // Keep original 'kataapp' specific placeholders if needed for comparison or specific config keys
  // Or replace them too if they should *also* be dynamic
  'KataApp': moduleNamePascal,
  'kataApp': moduleNameCamel,
  'kataapp': moduleNameKebab, // Assuming most 'kataapp' strings should follow kebab-case convention
};

// --- Function to Replace Placeholders ---
function replacePlaceholders(content) {
  let newContent = content;
  for (const placeholder in PLACEHOLDERS) {
    // Use RegExp for global replacement
    newContent = newContent.replace(new RegExp(placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), PLACEHOLDERS[placeholder]);
  }
  return newContent;
}


// --- Updated Structure Definitions ---

// Use __ModuleNameKebab__ for directory names
const directories = [
  `src/${moduleNameKebab}`,
  `src/${moduleNameKebab}/dto`,
  `src/${moduleNameKebab}/interfaces`,
  `src/${moduleNameKebab}/guards`,
  `src/${moduleNameKebab}/middleware`,
  `src/${moduleNameKebab}/services`,
  `src/prisma` // Prisma location is usually shared
];

// Use __ModuleNameKebab__ for file names and replace placeholders in content
const files = [
 {
    path: `src/${moduleNameKebab}/${moduleNameKebab}.module.ts`,
    content: `import { Module, CacheModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';

import { __ModuleNamePascal__Controller } from './__ModuleNameKebab__.controller';
import { __ModuleNamePascal__Service } from './__ModuleNameKebab__.service';
import { __ModuleNamePascal__Repository } from './__ModuleNameKebab__.repository';
import { __ModuleNamePascal__EventService } from './__ModuleNameKebab__-event.service';
import { __ModuleNamePascal__ElasticsearchService } from './__ModuleNameKebab__-elasticsearch.service';
import { __ModuleNamePascal__WebSocketGateway } from './__ModuleNameKebab__-websocket.gateway';
import { __ModuleNamePascal__RateLimitGuard } from './guards/__ModuleNameKebab__-rate-limit.guard';
import { __ModuleNamePascal__MLService } from './services/__ModuleNameKebab__-ml.service';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware'; // Assuming middleware might be shared or renamed separately if needed
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
        isGlobal: true, // Consider if global cache is always desired
      }),
    }),

    // Kafka Configuration for Event-Driven Architecture
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE', // Keep generic or make dynamic e.g., \`KAFKA_SERVICE_\${moduleNameUpperSnake}\`
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: '__ModuleNameKebab__', // Dynamic client ID
              brokers: configService.get('KAFKA_BROKERS', 'localhost:9092').split(','),
            },
            consumer: {
              groupId: '__ModuleNameKebab__-consumer', // Dynamic consumer group
              allowAutoTopicCreation: true,
            },
            producer: {
              allowAutoTopicCreation: true,
              transactionalId: '__ModuleNameKebab__-transaction', // Dynamic transactional ID
            },
          },
        }),
      },
    ]),

    // Rate Limiting - Global Configuration (applied via Guard/Middleware)
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

    ConfigModule.forRoot({ // Assuming global config is okay, otherwise scope it
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [__ModuleNamePascal__Controller],
  providers: [
    __ModuleNamePascal__Service,
    __ModuleNamePascal__Repository,
    __ModuleNamePascal__EventService,
    __ModuleNamePascal__ElasticsearchService,
    __ModuleNamePascal__WebSocketGateway,
    __ModuleNamePascal__MLService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: __ModuleNamePascal__RateLimitGuard, // Apply the dynamic guard globally
    },
  ],
  exports: [__ModuleNamePascal__Service, PrismaService], // Export service and potentially Prisma
})
export class __ModuleNamePascal__Module {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware) // Apply generic middleware...
      .forRoutes('__ModuleNameKebab__'); // ...to the dynamic module's routes
  }
}`
  },
  {
    path: `src/${moduleNameKebab}/${moduleNameKebab}.service.ts`,
    content: `import { Injectable, Inject, CACHE_MANAGER, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

import { __ModuleNamePascal__Repository } from './__ModuleNameKebab__.repository';
import { __ModuleNamePascal__EventService } from './__ModuleNameKebab__-event.service';
import { __ModuleNamePascal__ElasticsearchService } from './__ModuleNameKebab__-elasticsearch.service';
import { __ModuleNamePascal__MLService } from './services/__ModuleNameKebab__-ml.service';
import { PaginationDto } from './dto/pagination.dto'; // Assuming pagination is common
import { Create__ModuleNamePascal__Dto, Update__ModuleNamePascal__Dto } from './dto/__ModuleNameKebab__.dto';
import { __ModuleNamePascal__ } from './interfaces/__ModuleNameKebab__.interface';

@Injectable()
export class __ModuleNamePascal__Service implements OnModuleInit {
  private readonly logger = new Logger(__ModuleNamePascal__Service.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka, // Use the same injected client name as in the module
    private readonly repository: __ModuleNamePascal__Repository,
    private readonly eventService: __ModuleNamePascal__EventService,
    private readonly elasticsearchService: __ModuleNamePascal__ElasticsearchService,
    private readonly mlService: __ModuleNamePascal__MLService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    // Subscribe to Kafka topics specific to this module
    const topics = [
        \`__ModuleNameKebab__.created\`,
        \`__ModuleNameKebab__.updated\`,
        \`__ModuleNameKebab__.deleted\`
    ];
    topics.forEach(topic => {
        this.kafkaClient.subscribeToResponseOf(topic);
        this.logger.log(\`Subscribing to Kafka topic: \${topic}\`);
    });
    try {
        await this.kafkaClient.connect();
        this.logger.log('Kafka client connected successfully.');
    } catch (error) {
        this.logger.error('Failed to connect Kafka client:', error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: __ModuleNamePascal__[]; meta: any }> {
    const cacheKey = \`__ModuleNameKebab__:all:\${JSON.stringify(paginationDto)}\`;
    const cachedData = await this.cacheManager.get<{ data: __ModuleNamePascal__[]; meta: any }>(cacheKey);

    if (cachedData) {
      this.logger.debug(\`Cache hit for key: \${cacheKey}\`);
      return cachedData;
    }
    this.logger.debug(\`Cache miss for key: \${cacheKey}\`);

    const result = await this.repository.findAll(paginationDto);

    // Cache the results for future requests
    await this.cacheManager.set(cacheKey, result, {
      ttl: this.configService.get<number>('CACHE_TTL_SECONDS', 300)
    });
    this.logger.debug(\`Cached result for key: \${cacheKey}\`);

    return result;
  }

  async findById(id: string): Promise<__ModuleNamePascal__> {
    const cacheKey = \`__ModuleNameKebab__:\${id}\`;
    const cachedData = await this.cacheManager.get<__ModuleNamePascal__>(cacheKey);

    if (cachedData) {
        this.logger.debug(\`Cache hit for key: \${cacheKey}\`);
        return cachedData;
    }
    this.logger.debug(\`Cache miss for key: \${cacheKey}\`);

    const result = await this.repository.findById(id);

    // Cache the result for future requests
    if (result) {
      await this.cacheManager.set(cacheKey, result, {
        ttl: this.configService.get<number>('CACHE_TTL_SECONDS', 300)
      });
      this.logger.debug(\`Cached result for key: \${cacheKey}\`);
    }

    return result;
  }

  async search(query: string, paginationDto: PaginationDto): Promise<{ data: __ModuleNamePascal__[]; meta: any }> {
    const cacheKey = \`__ModuleNameKebab__:search:\${query}:\${JSON.stringify(paginationDto)}\`;
    const cachedData = await this.cacheManager.get<{ data: __ModuleNamePascal__[]; meta: any }>(cacheKey);

    if (cachedData) {
        this.logger.debug(\`Cache hit for key: \${cacheKey}\`);
        return cachedData;
    }
    this.logger.debug(\`Cache miss for key: \${cacheKey}\`);

    // Use Elasticsearch for full-text search
    const searchResults = await this.elasticsearchService.search(query, paginationDto);

    // Cache the results
    await this.cacheManager.set(cacheKey, searchResults, {
      ttl: this.configService.get<number>('CACHE_TTL_SEARCH_SECONDS', 120)
    });
    this.logger.debug(\`Cached result for key: \${cacheKey}\`);

    return searchResults;
  }

  async create(createDto: Create__ModuleNamePascal__Dto): Promise<__ModuleNamePascal__> {
    // Create the entity
    const result = await this.repository.create(createDto);
    this.logger.log(\`Created entity with ID: \${result.id}\`);

    // Index in Elasticsearch
    await this.elasticsearchService.index(result);

    // Emit event to Kafka
    this.eventService.emitCreatedEvent(result);

    // Invalidate relevant 'findAll' caches (simple approach: invalidate all)
    await this.clearListCache();

    return result;
  }

  async update(id: string, updateDto: Update__ModuleNamePascal__Dto): Promise<__ModuleNamePascal__> {
    // Update the entity
    const result = await this.repository.update(id, updateDto);
    this.logger.log(\`Updated entity with ID: \${id}\`);

    // Update in Elasticsearch
    await this.elasticsearchService.update(id, result);

    // Emit event to Kafka
    this.eventService.emitUpdatedEvent(result);

    // Invalidate cache
    await this.clearItemCache(id);
    await this.clearListCache();
    await this.clearSearchCache();

    return result;
  }

  async delete(id: string): Promise<boolean> {
    // Delete the entity
    const result = await this.repository.delete(id);

    if (result) {
      this.logger.log(\`Deleted entity with ID: \${id}\`);
      // Delete from Elasticsearch
      await this.elasticsearchService.delete(id);

      // Emit event to Kafka
      this.eventService.emitDeletedEvent({ id });

      // Invalidate cache
      await this.clearItemCache(id);
      await this.clearListCache();
      await this.clearSearchCache();
    } else {
        this.logger.warn(\`Attempted to delete non-existent entity with ID: \${id}\`);
    }

    return result;
  }

  // --- ML Service Passthrough ---
  async predictWithRNN(data: any): Promise<any> {
     this.logger.log('Passing data to ML service for RNN prediction.');
     return this.mlService.predictWithRNN(data);
  }

  // --- Cache Invalidation Helpers ---
  private async clearItemCache(id: string) {
    const cacheKey = \`__ModuleNameKebab__:\${id}\`;
    await this.cacheManager.del(cacheKey);
    this.logger.debug(\`Invalidated item cache for key: \${cacheKey}\`);
  }

  private async clearListCache() {
    // More robust cache clearing might involve storing keys or using patterns
    // Simple approach: Delete all keys starting with the list prefix
    const keys = await this.cacheManager.store.keys('__ModuleNameKebab__:all:*');
    if (keys && keys.length > 0) {
        await this.cacheManager.store.del(keys);
        this.logger.debug(\`Invalidated list caches for keys matching: __ModuleNameKebab__:all:*\`);
    }
  }

    private async clearSearchCache() {
        const keys = await this.cacheManager.store.keys('__ModuleNameKebab__:search:*');
        if (keys && keys.length > 0) {
            await this.cacheManager.store.del(keys);
            this.logger.debug(\`Invalidated search caches for keys matching: __ModuleNameKebab__:search:*\`);
        }
    }
}`
  },
  {
    path: `src/${moduleNameKebab}/${moduleNameKebab}.repository.ts`,
    content: `import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from './dto/pagination.dto';
import { Create__ModuleNamePascal__Dto, Update__ModuleNamePascal__Dto } from './dto/__ModuleNameKebab__.dto';
import { __ModuleNamePascal__ } from './interfaces/__ModuleNameKebab__.interface';
import { Prisma } from '@prisma/client'; // Import Prisma types if needed

@Injectable()
export class __ModuleNamePascal__Repository {
  constructor(private prisma: PrismaService) {}

  // Helper to access the correct model dynamically - less type-safe but flexible
  // private get model() {
  //   return this.prisma[moduleNameCamel]; // e.g., this.prisma.myAwesomeModule
  // }
  // Or use a more type-safe approach if Prisma Client Extensions allow renaming or mapping easily.
  // For simplicity and direct mapping from schema.prisma, we'll use the PascalCase name defined there.
  private get model() {
      // IMPORTANT: Assumes the model name in schema.prisma is __ModuleNamePascal__
      // e.g. model MyAwesomeModule { ... }
      return this.prisma[moduleNamePascal];
  }


  async findAll(paginationDto: PaginationDto): Promise<{ data: __ModuleNamePascal__[]; meta: any }> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = paginationDto;
    const skip = (page - 1) * limit;

    const orderByCondition = {};
    if (sortBy) {
        orderByCondition[sortBy] = sortOrder.toLowerCase();
    }

    const [data, total] = await this.prisma.$transaction([
      this.model.findMany({
        skip,
        take: limit,
        orderBy: orderByCondition,
      }),
      this.model.count(),
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

  async findById(id: string): Promise<__ModuleNamePascal__> {
    const item = await this.model.findUnique({
      where: { id },
    });
    if (!item) {
        throw new NotFoundException(\`\${moduleNamePascal} with ID "\${id}" not found\`);
    }
    return item;
  }

  async create(createDto: Create__ModuleNamePascal__Dto): Promise<__ModuleNamePascal__> {
    try {
        return await this.model.create({
            data: createDto,
        });
    } catch (error) {
        // Handle potential Prisma errors (e.g., unique constraints)
        throw error; // Re-throw for NestJS to handle or add specific error handling
    }
  }

  async update(id: string, updateDto: Update__ModuleNamePascal__Dto): Promise<__ModuleNamePascal__> {
    try {
        return await this.model.update({
            where: { id },
            data: updateDto,
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new NotFoundException(\`\${moduleNamePascal} with ID "\${id}" not found for update\`);
        }
        throw error; // Re-throw other errors
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
        await this.model.delete({
            where: { id },
        });
        return true;
    } catch (error) {
       if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            // Record not found is not necessarily an error for delete, depends on desired behavior
            // Return false indicating it wasn't found/deleted
            return false;
        }
        throw error; // Re-throw other errors
    }
  }
}`
  },
   {
    path: `src/${moduleNameKebab}/${moduleNameKebab}-event.service.ts`,
    content: `import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { __ModuleNamePascal__ } from './interfaces/__ModuleNameKebab__.interface';

@Injectable()
export class __ModuleNamePascal__EventService {
  private readonly logger = new Logger(__ModuleNamePascal__EventService.name);

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka, // Use the same injected client name
  ) {}

  emitCreatedEvent(data: __ModuleNamePascal__): void {
    const topic = \`__ModuleNameKebab__.created\`;
    const message = {
      key: data.id,
      value: JSON.stringify(data),
      timestamp: Date.now().toString(),
    };
    this.kafkaClient.emit(topic, message);
    this.logger.log(\`Emitted event '\${topic}' for ID: \${data.id}\`);
  }

  emitUpdatedEvent(data: __ModuleNamePascal__): void {
     const topic = \`__ModuleNameKebab__.updated\`;
     const message = {
      key: data.id,
      value: JSON.stringify(data),
      timestamp: Date.now().toString(),
    };
    this.kafkaClient.emit(topic, message);
    this.logger.log(\`Emitted event '\${topic}' for ID: \${data.id}\`);
  }

  emitDeletedEvent(data: { id: string }): void {
    const topic = \`__ModuleNameKebab__.deleted\`;
    const message = {
      key: data.id,
      value: JSON.stringify(data), // Include ID in the message value
      timestamp: Date.now().toString(),
    };
    this.kafkaClient.emit(topic, message);
    this.logger.log(\`Emitted event '\${topic}' for ID: \${data.id}\`);
  }
}`
  },
  {
    path: `src/${moduleNameKebab}/${moduleNameKebab}-elasticsearch.service.ts`,
    content: `import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { __ModuleNamePascal__ } from './interfaces/__ModuleNameKebab__.interface';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class __ModuleNamePascal__ElasticsearchService implements OnModuleInit {
  private readonly logger = new Logger(__ModuleNamePascal__ElasticsearchService.name);
  private readonly indexName: string;

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {
    // Use a dynamic index name based on the module, fallback from config
    this.indexName = this.configService.get<string>('ELASTICSEARCH_INDEX', '__ModuleNameKebab__');
    this.logger.log(\`Using Elasticsearch index: \${this.indexName}\`);
  }

  async onModuleInit(): Promise<void> {
    await this.initIndex();
  }

  private async initIndex(): Promise<void> {
    try {
      const indexExists = await this.elasticsearchService.indices.exists({
        index: this.indexName,
      });

      // Type assertion needed as 'body' is generic
      if (!(indexExists as any).body) {
        this.logger.log(\`Index '\${this.indexName}' not found. Creating...\`);
        await this.elasticsearchService.indices.create({
          index: this.indexName,
          body: {
            // Define mappings relevant to your __ModuleNamePascal__ interface
            mappings: {
              properties: {
                title: { type: 'text', analyzer: 'standard' },
                description: { type: 'text', analyzer: 'standard' },
                content: { type: 'text', analyzer: 'standard' },
                tags: { type: 'keyword' },
                authorId: { type: 'keyword' }, // Assuming authorId is searchable
                createdAt: { type: 'date' },
                updatedAt: { type: 'date' },
                // Add other searchable fields from __ModuleNamePascal__ interface
              },
            },
             settings: { // Optional: Add settings like number of shards/replicas
              // number_of_shards: 1,
              // number_of_replicas: 0 // For single-node setup
            }
          },
        });
        this.logger.log(\`Index '\${this.indexName}' created successfully.\`);
      } else {
         this.logger.log(\`Index '\${this.indexName}' already exists.\`);
      }
    } catch (error) {
        this.logger.error(\`Error initializing Elasticsearch index '\${this.indexName}':\`, error);
        // Decide if the application should fail to start or just log the error
        // throw error;
    }
  }

  async index(document: __ModuleNamePascal__): Promise<any> {
    try {
      return await this.elasticsearchService.index({
        index: this.indexName,
        id: document.id,
        document: { // Use 'document' instead of 'body' for newer client versions
          ...document,
          // Ensure dates are in ISO format for Elasticsearch
          createdAt: new Date(document.createdAt).toISOString(),
          updatedAt: new Date(document.updatedAt).toISOString(),
        },
        refresh: 'wait_for', // Optional: ensure the document is searchable immediately (use cautiously)
      });
    } catch (error) {
        this.logger.error(\`Error indexing document ID \${document.id} in '\${this.indexName}':\`, error);
        throw error;
    }
  }

  async update(id: string, document: Partial<__ModuleNamePascal__>): Promise<any> {
     try {
        return await this.elasticsearchService.update({
            index: this.indexName,
            id,
            doc: { // Use 'doc' for partial updates
                ...document,
                // Ensure updatedAt is always updated and in ISO format
                updatedAt: new Date(document.updatedAt || Date.now()).toISOString(),
            },
            refresh: 'wait_for', // Optional
        });
     } catch (error) {
         this.logger.error(\`Error updating document ID \${id} in '\${this.indexName}':\`, error);
         // Handle specific ES errors, e.g., not found (404)
         if (error.statusCode === 404) {
             this.logger.warn(\`Document ID \${id} not found for update in Elasticsearch.\`);
             // Decide behavior: throw, return null, or log only
         }
         throw error; // Re-throw other errors
     }
  }

  async delete(id: string): Promise<any> {
    try {
      return await this.elasticsearchService.delete({
        index: this.indexName,
        id,
        refresh: 'wait_for', // Optional
      });
    } catch (error) {
        this.logger.error(\`Error deleting document ID \${id} from '\${this.indexName}':\`, error);
         if (error.statusCode === 404) {
             this.logger.warn(\Document ID \${id} not found for deletion in Elasticsearch.\`);
             // Usually okay to ignore 404 on delete
             return { body: { result: 'not_found' }}; // Mimic success response structure if needed elsewhere
         }
        throw error; // Re-throw other errors
    }
  }

  async search(query: string, paginationDto: PaginationDto): Promise<{ data: __ModuleNamePascal__[]; meta: any }> {
    const { page = 1, limit = 10 } = paginationDto;
    const from = (page - 1) * limit;

    try {
      const response = await this.elasticsearchService.search({
        index: this.indexName,
        from,
        size: limit,
        query: {
          multi_match: {
            query,
            // Update fields based on your __ModuleNamePascal__ interface and mappings
            fields: ['title^3', 'description^2', 'content', 'tags', 'authorId'],
            fuzziness: 'AUTO',
            // type: 'best_fields' // Consider different multi_match types
          },
          // Add filters here if needed (e.g., filter by authorId, status)
          // filter: [ { term: { status: 'published' } } ]
        },
        sort: [
          { _score: { order: 'desc' } }, // Relevance score first
          // Add other sort fields as needed, ensure they are mapped correctly
          { createdAt: { order: 'desc' } },
        ],
        // track_total_hits: true // Ensure accurate total count for pagination
      });

      // Access hits and total correctly based on client version response structure
      const hits = response?.hits?.hits || [];
      // Handle potential variations in total count structure
      const total = typeof response?.hits?.total === 'number'
                    ? response.hits.total
                    : (response?.hits?.total as any)?.value ?? 0; // Safely access nested value

      const lastPage = Math.ceil(total / limit);

      // Map _source back to your interface structure
      const data = hits.map(hit => ({
        ...(hit._source as __ModuleNamePascal__), // Type assertion
        id: hit._id, // Get ID from hit metadata
        // score: hit._score, // Include relevance score if needed
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
    } catch (error) {
        this.logger.error(\`Error searching in index '\${this.indexName}' with query '\${query}':\`, error);
        // Return empty result on error or re-throw
        return { data: [], meta: { total: 0, page, limit, lastPage: 0, hasNextPage: false, hasPrevPage: false } };
        // throw error;
    }
  }
}`
  },
  {
    path: `src/${moduleNameKebab}/${moduleNameKebab}-websocket.gateway.ts`,
    content: `import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
// import { __ModuleNamePascal__Service } from './__ModuleNameKebab__.service'; // Not directly needed if just broadcasting
import { WsJwtAuthGuard } from '../auth/guards/ws-jwt-auth.guard'; // Assuming shared auth guard
import { __ModuleNamePascal__ } from './interfaces/__ModuleNameKebab__.interface';

@WebSocketGateway({
  cors: {
    origin: '*', // Configure CORS appropriately for production
  },
  namespace: '__ModuleNameKebab__', // Dynamic namespace for this module's events
})
export class __ModuleNamePascal__WebSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(__ModuleNamePascal__WebSocketGateway.name);

  @WebSocketServer()
  server: Server;

  // Inject service if needed for more complex logic, otherwise just broadcast
  // constructor(private readonly service: __ModuleNamePascal__Service) {}
  constructor() {} // Constructor without service injection if only broadcasting

  afterInit(server: Server) {
    this.logger.log(\`WebSocket Gateway for namespace '/${moduleNameKebab}' initialized\`);
  }

  handleConnection(client: Socket) {
    this.logger.log(\`Client connected to /${moduleNameKebab}: \${client.id}\`);
    // Add authentication logic here if needed upon connection
  }

  handleDisconnect(client: Socket) {
    this.logger.log(\`Client disconnected from /${moduleNameKebab}: \${client.id}\`);
    // Handle cleanup, e.g., leave rooms
  }

  // --- Subscription Logic (Example) ---

  @UseGuards(WsJwtAuthGuard) // Protect subscription endpoint
  @SubscribeMessage('subscribeToUpdates') // Generic subscription message
  handleSubscribeToUpdates(
      @ConnectedSocket() client: Socket,
      @MessageBody() payload: { roomId?: string } // Allow subscribing to specific rooms (e.g., item ID) or general updates
  ): { event: string; data: any } {
      const { roomId } = payload;
      if (roomId) {
          client.join(roomId);
          this.logger.log(\`Client \${client.id} joined room: \${roomId} in /${moduleNameKebab}\`);
          return { event: 'subscribed', data: { roomId } };
      } else {
          // Handle subscription to general updates if needed
           this.logger.log(\`Client \${client.id} subscribed to general updates in /${moduleNameKebab}\`);
          return { event: 'subscribed', data: { general: true } };
      }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('unsubscribeFromUpdates')
  handleUnsubscribeFromUpdates(
      @ConnectedSocket() client: Socket,
      @MessageBody() payload: { roomId?: string }
   ): { event: string; data: any } {
      const { roomId } = payload;
       if (roomId) {
          client.leave(roomId);
          this.logger.log(\`Client \${client.id} left room: \${roomId} in /${moduleNameKebab}\`);
          return { event: 'unsubscribed', data: { roomId } };
      } else {
           // Handle unsubscription from general updates
           this.logger.log(\`Client \${client.id} unsubscribed from general updates in /${moduleNameKebab}\`);
           return { event: 'unsubscribed', data: { general: true } };
      }
  }

  // --- Broadcasting Methods (called from Service/Events) ---

  /**
   * Notify clients about a newly created item.
   * Emits to the general namespace and potentially a room if applicable.
   */
  notifyItemCreated(item: __ModuleNamePascal__): void {
    const eventName = \`\${moduleNameCamel}Created\`; // e.g., myAwesomeModuleCreated
    this.server.emit(eventName, item); // Broadcast to all in namespace
    this.logger.log(\`Broadcast event '\${eventName}' for ID: \${item.id}\`);
    // If items have specific rooms (e.g., based on category or ID itself), emit there too
    // this.server.to(item.id).emit(eventName, item);
  }

  /**
   * Notify clients about an updated item.
   * Emits to the general namespace and the specific item's room (using its ID).
   */
  notifyItemUpdated(item: __ModuleNamePascal__): void {
     const eventName = \`\${moduleNameCamel}Updated\`; // e.g., myAwesomeModuleUpdated
     this.server.emit(eventName, item); // Broadcast to all
     if (item.id) {
        this.server.to(item.id).emit(eventName, item); // Emit to specific room
        this.logger.log(\`Broadcast event '\${eventName}' to room '\${item.id}' for ID: \${item.id}\`);
     } else {
         this.logger.log(\`Broadcast event '\${eventName}' globally for ID: \${item.id}\`);
     }
  }

   /**
   * Notify clients about a deleted item.
   * Emits to the general namespace and the specific item's room (using its ID).
   */
  notifyItemDeleted(item: { id: string }): void {
      const eventName = \`\${moduleNameCamel}Deleted\`; // e.g., myAwesomeModuleDeleted
      this.server.emit(eventName, item); // Broadcast to all
      if (item.id) {
        this.server.to(item.id).emit(eventName, item); // Emit to specific room
        this.logger.log(\`Broadcast event '\${eventName}' to room '\${item.id}' for ID: \${item.id}\`);
      } else {
          this.logger.log(\`Broadcast event '\${eventName}' globally for ID: \${item.id}\`);
      }
      // Optional: Make clients leave the room for the deleted item
      this.server.in(item.id).socketsLeave(item.id);
  }
}`
  },
  {
    path: `src/${moduleNameKebab}/${moduleNameKebab}.controller.ts`,
    content: `import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
  CacheInterceptor, // Use CacheInterceptor for GET requests if desired
  UseInterceptors,
  ParseUUIDPipe, // Use ParseUUIDPipe for ID validation
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { __ModuleNamePascal__Service } from './__ModuleNameKebab__.service';
import { PaginationDto } from './dto/pagination.dto';
import { Create__ModuleNamePascal__Dto, Update__ModuleNamePascal__Dto } from './dto/__ModuleNameKebab__.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assuming shared auth guard
import { __ModuleNamePascal__ } from './interfaces/__ModuleNameKebab__.interface';

@ApiTags(__ModuleNameKebab__) // Use kebab-case for tags
@Controller(__ModuleNameKebab__) // Use kebab-case for the base route
@ApiBearerAuth() // Apply Bearer Auth documentation to all methods in the controller
export class __ModuleNamePascal__Controller {
  constructor(private readonly service: __ModuleNamePascal__Service) {}

  @Get()
  @UseInterceptors(CacheInterceptor) // Apply caching to the findAll endpoint
  @ApiOperation({ summary: 'Get all __ModuleNamePascal__ items with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Field to sort by (e.g., createdAt, title)' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Sort order (asc or desc)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of __ModuleNamePascal__ items retrieved successfully.', type: [__ModuleNamePascal__] }) // Improve response type
  async findAll(@Query() paginationDto: PaginationDto): Promise<{ data: __ModuleNamePascal__[]; meta: any }> {
    return this.service.findAll(paginationDto);
  }

  @Get('search')
  @UseInterceptors(CacheInterceptor) // Apply caching to the search endpoint
  @ApiOperation({ summary: 'Search __ModuleNamePascal__ items' })
  @ApiQuery({ name: 'query', required: true, type: String, description: 'Search query string' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search results retrieved successfully.', type: [__ModuleNamePascal__] }) // Improve response type
  async search(
    @Query('query') query: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<{ data: __ModuleNamePascal__[]; meta: any }> {
    return this.service.search(query, paginationDto);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor) // Apply caching to the findById endpoint
  @ApiOperation({ summary: 'Get a __ModuleNamePascal__ item by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: '__ModuleNamePascal__ item unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: '__ModuleNamePascal__ item found.', type: __ModuleNamePascal__ }) // Improve response type
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '__ModuleNamePascal__ item not found.' })
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<__ModuleNamePascal__> {
    // Service method findById should throw NotFoundException if not found
    return this.service.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard) // Apply auth guard specifically if not global
  @ApiOperation({ summary: 'Create a new __ModuleNamePascal__ item' })
  @ApiResponse({ status: HttpStatus.CREATED, description: '__ModuleNamePascal__ item created successfully.', type: __ModuleNamePascal__ })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User not authenticated.' })
  async create(@Body() createDto: Create__ModuleNamePascal__Dto): Promise<__ModuleNamePascal__> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update an existing __ModuleNamePascal__ item' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: '__ModuleNamePascal__ item unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: '__ModuleNamePascal__ item updated successfully.', type: __ModuleNamePascal__ })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '__ModuleNamePascal__ item not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User not authenticated.' })
  async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateDto: Update__ModuleNamePascal__Dto
  ): Promise<__ModuleNamePascal__> {
     // Service method update should throw NotFoundException if not found
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Set standard HTTP code for successful deletion
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a __ModuleNamePascal__ item' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: '__ModuleNamePascal__ item unique identifier' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: '__ModuleNamePascal__ item deleted successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '__ModuleNamePascal__ item not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User not authenticated.' })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleted = await this.service.delete(id);
    if (!deleted) {
        // Throw NotFoundException if the service indicates the item wasn't found for deletion
        throw new NotFoundException(\`\${moduleNamePascal} with ID "\${id}" not found.\`);
    }
    // No content returned on success
  }

  // --- ML Endpoint Example ---
  @Post('predict-rnn') // Keep specific endpoint name or make it dynamic if needed
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Make prediction using RNN model for __ModuleNamePascal__' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Prediction successful.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data for prediction.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User not authenticated.' })
  async predictWithRNN(@Body() data: any): Promise<any> {
    // Add validation for the 'data' payload if possible
    return this.service.predictWithRNN(data);
  }
}`
  },
  {
    path: `src/${moduleNameKebab}/middleware/rate-limit.middleware.ts`, // Assume middleware is potentially shared
    content: `import { Injectable, NestMiddleware, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from '@liaoliaots/nestjs-redis'; // Assuming this specific Redis service integration
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis'; // Import Redis type if needed

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RateLimitMiddleware.name);
  private redisClient: Redis;

  constructor(
    private readonly redisService: RedisService, // Specific integration
    private readonly configService: ConfigService,
  ) {
      try {
        this.redisClient = this.redisService.getClient();
      } catch (error) {
          this.logger.error('Failed to get Redis client for RateLimitMiddleware:', error);
          // Decide how to handle this - maybe disable rate limiting or throw on startup
          // For now, let it proceed, but 'use' will fail if redisClient is null
      }
  }

  async use(req: Request, res: Response, next: NextFunction) {
    if (!this.redisClient) {
        this.logger.warn('Redis client not available, skipping rate limiting.');
        return next();
    }

    const ip = req.ip;
    // Attempt to get user ID, default to 'anonymous' if not available or not authenticated
    const userId = (req as any).user?.id || 'anonymous';
    const path = req.baseUrl + req.path; // Use full path including global prefix if applicable
    const key = \`ratelimit:\${path}:\${userId}:\${ip}\`; // Key combines path, user, and IP

    const limit = this.configService.get<number>('API_RATE_LIMIT', 100);
    const windowSizeInSeconds = this.configService.get<number>('API_RATE_LIMIT_WINDOW', 60);

    try {
      const current = await this.redisClient.get(key);
      const currentCount = current ? parseInt(current, 10) : 0;

      let ttl = await this.redisClient.ttl(key);
      if (ttl < 0) { // Handle case where key exists but has no TTL or TTL expired between get/ttl
          ttl = windowSizeInSeconds; // Reset TTL display if needed
      }

      if (currentCount >= limit) {
        this.logger.warn(\`Rate limit exceeded for key: \${key} (Limit: \${limit})\`);
        res.setHeader('Retry-After', ttl); // Set Retry-After header
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', 0);
        res.setHeader('X-RateLimit-Reset', Math.floor(Date.now() / 1000) + ttl);
        // Use NestJS HttpException for standard error response
        throw new HttpException({
            statusCode: HttpStatus.TOO_MANY_REQUESTS,
            message: 'Too Many Requests',
            error: 'Rate limit exceeded',
            retryAfter: ttl,
        }, HttpStatus.TOO_MANY_REQUESTS);
      }

      // Increment the count and set expiry if it's the first request in the window
      const multi = this.redisClient.multi();
      multi.incr(key);
      if (currentCount === 0) {
          multi.expire(key, windowSizeInSeconds);
      }
      await multi.exec();

      // Recalculate remaining count and TTL after incrementing
      const remaining = Math.max(0, limit - (currentCount + 1));
      const currentTtl = await this.redisClient.ttl(key); // Get potentially updated TTL

      // Set X-RateLimit headers on successful request
      res.setHeader('X-RateLimit-Limit', limit);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', Math.floor(Date.now() / 1000) + currentTtl);

      next(); // Proceed to the next middleware or route handler

    } catch (error) {
        if (error instanceof HttpException) {
            throw error; // Re-throw known HTTP exceptions
        }
        // Log Redis or other unexpected errors
        this.logger.error(\`Error during rate limiting for key '\${key}':\`, error);
        // Allow request to proceed if rate limiting check fails unexpectedly? Or block?
        // Depending on policy, you might block or allow. Allowing is safer if Redis is down.
        next();
    }
  }
}`
  },
  {
    path: `src/${moduleNameKebab}/guards/__ModuleNameKebab__-rate-limit.guard.ts`,
    content: `import { Injectable, ExecutionContext, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerOptions, ThrottlerStorage } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core'; // Import Reflector if using @SkipThrottle decorator
// import { THROTTLER_SKIP } from '@nestjs/throttler/dist/throttler.constants'; // Path might change

@Injectable()
export class __ModuleNamePascal__RateLimitGuard extends ThrottlerGuard {
    private readonly logger = new Logger(__ModuleNamePascal__RateLimitGuard.name);

    constructor(
        options: ThrottlerOptions, // Inject standard options
        storageService: ThrottlerStorage, // Inject storage
        reflector: Reflector, // Inject Reflector
        private readonly configService: ConfigService // Inject ConfigService if needed for dynamic overrides
    ) {
        super(options, storageService, reflector);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const handler = context.getHandler();
        const classRef = context.getClass();

        // --- Optional: Skip throttling based on decorator ---
        // const skip = this.reflector.getAllAndOverride<boolean>(THROTTLER_SKIP, [handler, classRef]);
        // if (skip) {
        //     return true;
        // }

        // --- Optional: Custom logic before calling super.canActivate ---
        // Example: Skip rate limiting for specific roles or IPs
        const user = request.user;
        if (user?.role === 'admin') {
            this.logger.verbose(\`Skipping rate limit for admin user: \${user.id}\`);
            return true;
        }
        // const ipWhitelist = ['127.0.0.1', '::1'];
        // if (ipWhitelist.includes(request.ip)) {
        //     return true;
        // }

        // --- Call the parent canActivate ---
        try {
            const allowed = await super.handleRequest(
                context,
                this.configService.get<number>('THROTTLE_LIMIT', 100), // Use config for limit
                this.configService.get<number>('THROTTLE_TTL', 60), // Use config for TTL
                // Optionally override tracker based on context if needed
                // this.getTracker(request)
            );
            return allowed;
        } catch (error) { // Catch ThrottlerException explicitly if needed/possible
             this.logger.warn(\`Rate limit exceeded for request: \${this.getTracker(request)} - Path: \${request.path}\`);
            // Re-throw a standard HttpException for consistent error handling
             throw new HttpException({
                statusCode: HttpStatus.TOO_MANY_REQUESTS,
                message: 'Too Many Requests',
                error: 'Rate limit exceeded. Please try again later.',
                // Note: ThrottlerGuard itself might not easily provide Retry-After here.
                // The middleware approach is better for setting Retry-After header accurately.
             }, HttpStatus.TOO_MANY_REQUESTS);
        }
    }

    /**
     * Override the default tracker to potentially include user ID if available.
     * This makes the rate limit apply per-user-per-IP, or just per-IP for anonymous users.
     */
    getTracker(req: Record<string, any>): string {
        const userId = req.user?.id;
        return userId ? \`\${req.ip}-\${userId}\` : req.ip;
    }

    // Optional: Override generateKey if more complex key generation is needed
    // protected generateKey(context: ExecutionContext, suffix: string, name: string): string {
    //    return super.generateKey(context, suffix, name);
    // }
}`
},
 {
    path: `src/${moduleNameKebab}/services/__ModuleNameKebab__-ml.service.ts`,
    content: `import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs-node'; // Use tfjs-node for backend
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class __ModuleNamePascal__MLService implements OnModuleInit {
  private model: tf.LayersModel | null = null;
  private readonly logger = new Logger(__ModuleNamePascal__MLService.name);
  private readonly modelDir = path.resolve('./ml-models/__ModuleNameKebab__-rnn-model'); // Dynamic model path
  private readonly modelPath = \`file://\${path.join(this.modelDir, 'model.json')}\`;
  private isModelReady = false;

  constructor() {
    // Ensure model directory exists
    if (!fs.existsSync(this.modelDir)) {
        fs.mkdirSync(this.modelDir, { recursive: true });
        this.logger.log(\`Created directory for ML model: \${this.modelDir}\`);
    }
  }

  async onModuleInit() {
    await this.initModel();
  }

  private async initModel(): Promise<void> {
    if (this.isModelReady) return;

    try {
      this.logger.log(\`Attempting to load RNN model from: \${this.modelPath}\`);
      this.model = await tf.loadLayersModel(this.modelPath);
      this.logger.log('__ModuleNamePascal__ RNN model loaded successfully');
      this.isModelReady = true;
    } catch (error) {
      this.logger.warn(\`Could not load RNN model from \${this.modelPath}. Creating a new default model. Error: \${error.message}\`);
      this.createDefaultRNNModel(); // Create a fallback model
      this.isModelReady = true; // Mark as ready even with default model
      // Optionally save the newly created default model immediately
      // await this.saveModel();
    }
  }

  // Define input shape based on expected data structure
  // Example: [timesteps, features] -> [sequence length, number of input features]
  private readonly defaultInputShape: [number, number] = [10, 5]; // ADJUST AS NEEDED

  private createDefaultRNNModel(): void {
    this.logger.log('Creating a new default RNN model...');
    const model = tf.sequential();

    // Example architecture - ADJUST LAYERS AND UNITS BASED ON YOUR TASK
    model.add(tf.layers.lstm({
      units: 64, // Number of LSTM units
      // returnSequences: true, // Set to true if stacking RNN layers
      returnSequences: false, // False for final RNN layer if output is single vector
      inputShape: this.defaultInputShape,
    }));

    // Optional: Add more layers (Dropout, Dense, etc.)
    model.add(tf.layers.dropout({ rate: 0.2 })); // Dropout for regularization
    model.add(tf.layers.dense({ units: 32, activation: 'relu' })); // Dense layer
    model.add(tf.layers.dense({ units: 1 })); // Output layer (e.g., 1 for regression) - ADJUST UNITS FOR YOUR OUTPUT

    // Compile the model - Choose optimizer, loss, and metrics suitable for your task
    model.compile({
      optimizer: tf.train.adam(), // Common optimizer
      loss: tf.losses.meanSquaredError, // Example: MSE for regression
      // loss: tf.losses.binaryCrossentropy, // Example: for binary classification
      // metrics: ['accuracy'], // Example: Accuracy for classification
      metrics: ['mae'], // Example: Mean Absolute Error for regression
    });

    model.summary(); // Log model summary

    this.model = model;
    this.logger.log('New default RNN model created and compiled.');
  }

  private async ensureModelReady(): Promise<void> {
      if (!this.isModelReady || !this.model) {
          this.logger.log('Model not ready, attempting initialization...');
          await this.initModel();
          if (!this.model) {
              throw new Error('ML Model could not be initialized.');
          }
      }
  }

  private async saveModel(): Promise<void> {
      if (!this.model) {
          this.logger.error('Cannot save model: Model is not initialized.');
          return;
      }
      try {
          this.logger.log(\`Saving model to: \${this.modelPath}\`);
          await this.model.save(this.modelPath);
          this.logger.log('Model saved successfully.');
      } catch (error) {
          this.logger.error('Error saving ML model:', error);
      }
  }

  /**
   * Preprocesses input data into the shape expected by the model.
   * Input: Raw data (e.g., array of arrays, objects)
   * Output: tf.Tensor in the shape [batchSize, timesteps, features]
   */
  private preprocessInput(data: any): tf.Tensor {
       // --- THIS IS A PLACEHOLDER - IMPLEMENT ACTUAL PREPROCESSING ---
       // 1. Validate input data structure.
       // 2. Convert data to numerical format if needed.
       // 3. Normalize or scale features (important!).
       // 4. Reshape data into [batchSize, timesteps, features].
       // Example (assuming input 'data' is already shaped like [[feature1, feature2,...], ...]):
       if (!Array.isArray(data) || !Array.isArray(data[0])) {
           throw new Error('Invalid input data format for preprocessing.');
       }
        // Assume data is already [timesteps, features], wrap in batch dimension [1, timesteps, features]
       const expectedShape = [1, ...this.defaultInputShape]; // [batch, timesteps, features]
       try {
           const tensor = tf.tensor3d([data], expectedShape); // Explicitly provide shape
           this.logger.verbose(\`Preprocessed input tensor shape: \${tensor.shape}\`);
           return tensor;
       } catch (error) {
           this.logger.error(\`Error creating tensor. Input data shape might not match expected shape \${expectedShape}. Error: \${error.message}\`);
           throw new Error('Failed to preprocess input data.');
       }
       // --- END PLACEHOLDER ---
  }

   /**
   * Postprocesses the model's output tensor into a usable format.
   * Input: tf.Tensor (raw model output)
   * Output: Processed prediction (e.g., number, array, object)
   */
   private async postprocessOutput(prediction: tf.Tensor): Promise<any> {
        // --- THIS IS A PLACEHOLDER - IMPLEMENT ACTUAL POSTPROCESSING ---
        // 1. Inverse transform if data was normalized/scaled.
        // 2. Convert tensor data to desired format (e.g., number, array).
        // Example (assuming simple regression output):
        try {
            const result = await prediction.array(); // Get data as nested array
            this.logger.verbose(\`Raw prediction array: \${JSON.stringify(result)}\`);
            // Assuming output shape is [batchSize, outputUnits] e.g., [[value]]
            return result[0][0]; // Extract the single prediction value
        } catch (error) {
            this.logger.error('Error postprocessing prediction tensor:', error);
            throw new Error('Failed to postprocess prediction.');
        }
        // --- END PLACEHOLDER ---
   }


  async predictWithRNN(rawData: any): Promise<any> {
    await this.ensureModelReady(); // Ensure model is loaded/created

    let inputTensor: tf.Tensor | null = null;
    let predictionTensor: tf.Tensor | null = null;

    try {
      inputTensor = this.preprocessInput(rawData); // Preprocess data

      this.logger.debug('Making prediction with RNN model...');
      // Ensure model is not null before prediction
      if (!this.model) throw new Error('Prediction failed: Model is null.');

      predictionTensor = this.model.predict(inputTensor) as tf.Tensor; // Type assertion

      const result = await this.postprocessOutput(predictionTensor); // Postprocess output

      this.logger.log('RNN prediction successful.');
      return result;

    } catch (error) {
      this.logger.error('Error during RNN prediction:', error);
      // Provide more context in the thrown error
      throw new Error(\`RNN prediction failed: \${error.message}\`);
    } finally {
      // Clean up tensors to prevent memory leaks
      inputTensor?.dispose();
      predictionTensor?.dispose();
      this.logger.verbose('Prediction tensors disposed.');
    }
  }

  // --- Training Function (Example) ---
  /**
   * Trains the RNN model. Assumes trainingData has { input: number[][], output: number[] } structure.
   * INPUTS and OUTPUTS should be preprocessed and shaped correctly before calling this.
   */
  async trainRNNModel(
      inputs: tf.Tensor, // Shape: [samples, timesteps, features]
      outputs: tf.Tensor, // Shape: [samples, outputUnits]
      epochs = 10, // Default epochs
      batchSize = 32, // Default batch size
      validationSplit = 0.2 // Default validation split
      ): Promise<tf.History> {

    await this.ensureModelReady();
    if (!this.model) throw new Error('Training failed: Model is null.');

    this.logger.log(\`Starting RNN model training... Epochs: \${epochs}, Batch Size: \${batchSize}\`);

    try {
        const history = await this.model.fit(inputs, outputs, {
            epochs,
            batchSize,
            validationSplit,
            shuffle: true, // Shuffle data each epoch
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    this.logger.log(\`Epoch \${epoch + 1}/\${epochs} - loss: \${logs?.loss?.toFixed(4)}, val_loss: \${logs?.val_loss?.toFixed(4)}\`);
                    // Add other metrics if tracked (e.g., logs.accuracy, logs.val_accuracy)
                },
                // Optional: Add EarlyStopping, ModelCheckpoint (requires tfjs-node callbacks)
            }
        });

        this.logger.log('Model training finished.');
        await this.saveModel(); // Save the trained model

        return history;
    } catch (error) {
        this.logger.error('Error during RNN model training:', error);
        throw new Error(\`RNN training failed: \${error.message}\`);
    } finally {
        // Tensors 'inputs' and 'outputs' should be disposed by the caller
        // if they are no longer needed after training.
    }
  }
}`
  },
  {
    path: `src/${moduleNameKebab}/dto/pagination.dto.ts`, // Keep pagination DTO likely generic/shared
    content: `import { IsOptional, IsInt, Min, Max, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger'; // Add Swagger decorators

export class PaginationDto {
  @ApiPropertyOptional({
      description: 'Page number (starting from 1)',
      minimum: 1,
      default: 1,
      type: Number,
  })
  @IsOptional()
  @Type(() => Number) // Ensure transformation from query string
  @IsInt()
  @Min(1)
  page?: number = 1; // Provide default value

  @ApiPropertyOptional({
      description: 'Number of items per page',
      minimum: 1,
      maximum: 100, // Set a reasonable max limit
      default: 10,
      type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100) // Add a Max decorator for safety
  limit?: number = 10; // Provide default value

  @ApiPropertyOptional({
      description: 'Field to sort by (e.g., "createdAt", "title")',
      type: String,
      default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt'; // Provide default value

  @ApiPropertyOptional({
      description: 'Sort order ("asc" or "desc")',
      enum: ['asc', 'desc', 'ASC', 'DESC'],
      default: 'desc',
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc', 'ASC', 'DESC'], { message: 'sortOrder must be either "asc" or "desc"' })
  sortOrder?: 'asc' | 'desc' = 'desc'; // Provide default value and restrict type
}`
  },
  {
    path: `src/${moduleNameKebab}/dto/__ModuleNameKebab__.dto.ts`,
    content: `import { IsNotEmpty, IsString, IsOptional, IsArray, MaxLength, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; // Import Swagger decorators

export class Create__ModuleNamePascal__Dto {
  @ApiProperty({
      description: 'The title of the __ModuleNamePascal__ item',
      maxLength: 100,
      example: 'My First Awesome Item',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({
      description: 'A short description of the item',
      maxLength: 500,
      example: 'This item does amazing things.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @ApiProperty({
      description: 'The main content of the item',
      example: 'Detailed content goes here...',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiPropertyOptional({
      description: 'Tags associated with the item',
      type: [String],
      example: ['nestjs', 'dynamic-module', 'example'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
      description: 'ID of the author (user) creating the item (if applicable)',
      format: 'uuid',
      example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  @IsOptional()
  @IsUUID() // Validate if it's a UUID if provided
  authorId?: string;
}

// Use PartialType or OmitType from @nestjs/swagger/mapped-types for less repetition
// Or define Update DTO explicitly like below:
export class Update__ModuleNamePascal__Dto {
  @ApiPropertyOptional({
      description: 'The updated title of the __ModuleNamePascal__ item',
      maxLength: 100,
      example: 'My Updated Awesome Item',
  })
  @IsOptional() // All fields are optional on update
  @IsString()
  @MaxLength(100)
  title?: string;

  @ApiPropertyOptional({
      description: 'The updated short description',
      maxLength: 500,
      example: 'This item now does even more amazing things.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
      description: 'The updated main content',
      example: 'Updated detailed content...',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
      description: 'Updated list of tags (replaces existing tags)',
      type: [String],
      example: ['nestjs', 'updated', 'example'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  // authorId is usually not updatable directly via PUT/PATCH by regular users
  // @IsOptional()
  // @IsUUID()
  // authorId?: string;
}`
  },
  {
    path: `src/${moduleNameKebab}/interfaces/__ModuleNameKebab__.interface.ts`,
    content: `/**
 * Represents the structure of a __ModuleNamePascal__ item.
 */
export interface __ModuleNamePascal__ {
  /**
   * Unique identifier for the item (UUID).
   * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
   */
  id: string;

  /**
   * The main title of the item.
   * @example "My Awesome Item"
   */
  title: string;

  /**
   * A brief description of the item.
   * @example "This is a description."
   */
  description: string;

  /**
   * The detailed content or body of the item.
   */
  content: string;

  /**
   * An array of tags or keywords associated with the item.
   * @optional
   * @example ["tag1", "tag2"]
   */
  tags?: string[];

  /**
   * The ID of the user who created/owns the item.
   * @optional
   * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
   */
  authorId?: string;

  /**
   * Timestamp when the item was created.
   * Represented as Date object or ISO 8601 string.
   */
  createdAt: Date | string;

  /**
   * Timestamp when the item was last updated.
   * Represented as Date object or ISO 8601 string.
   */
  updatedAt: Date | string;

   /**
    * Optional: Relevance score from search results.
    * @optional
    */
   // score?: number;
}`
  },
  {
    path: 'src/prisma/prisma.service.ts', // Shared Prisma service
    content: `import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [ // Configure logging levels as needed
        { emit: 'stdout', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'pretty', // Or 'minimal'
    });
    this.logger.log('PrismaService Initialized');
  }

  async onModuleInit() {
    try {
        this.logger.log('Connecting to database...');
        await this.$connect();
        this.logger.log('Database connection established.');
    } catch (error) {
        this.logger.error('Failed to connect to the database:', error);
        // Depending on the app, you might want to exit or handle reconnection attempts
        process.exit(1); // Exit if DB connection fails on init
    }
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting from database...');
    await this.$disconnect();
    this.logger.log('Database connection closed.');
  }

   // Optional: Add a method for graceful shutdown enabling
  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  // }
}`
  },
  {
    // IMPORTANT: This adds the model to an *existing* schema.prisma.
    // You might want to create a new file or handle this differently.
    // This approach appends to the file if it exists, or creates it.
    path: 'prisma/schema.prisma',
    content: `// --- Append this model definition to your existing schema.prisma ---

model ${moduleNamePascal} {
  id          String    @id @default(uuid())
  title       String
  description String    @db.VarChar(500) // Example: Set max length if needed
  content     String    @db.Text // Use Text for potentially long content
  tags        String[]  // Array of strings
  authorId    String?   // Optional relation/foreign key
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Optional: Define relation to a User model if authorId is a foreign key
  // author      User?     @relation(fields: [authorId], references: [id])

  @@map("${moduleNameLowerSnake}") // Map to a snake_case table name in the DB (convention)
  @@index([title])                // Index common query fields
  @@index([tags])                 // Index array field if supported and queried often
  @@index([authorId])             // Index foreign key
  @@index([createdAt])            // Index for sorting by creation date
}

// Make sure you have the generator and datasource blocks already defined:
/*
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or your DB provider
  url      = env("DATABASE_URL")
}

// ... other models ...
*/
`
  },
  {
    path: '.env.example', // Add module-specific env vars if needed
    content: `# === General App Settings ===
PORT=3000
NODE_ENV=development

# === Database (PostgreSQL example) ===
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydatabase?schema=public"

# === Redis ===
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD= # Optional
REDIS_CACHE_TTL=300 # Default TTL for general cache (seconds)
CACHE_TTL_SECONDS=300 # Specific TTL for regular service cache
CACHE_TTL_SEARCH_SECONDS=120 # Specific TTL for search results cache

# === Kafka ===
KAFKA_BROKERS=localhost:9092 # Comma-separated list for multiple brokers

# === Elasticsearch ===
ELASTICSEARCH_NODE=http://localhost:9200
ELASTICSEARCH_USERNAME= # Optional auth
ELASTICSEARCH_PASSWORD= # Optional auth
# Index name can be set here, or default to module name in kebab-case
ELASTICSEARCH_INDEX=${moduleNameKebab} # Default index name matches module

# === API Rate Limiting ===
# Middleware-based limiting (if using RateLimitMiddleware)
API_RATE_LIMIT=100 # Requests per window per user/IP
API_RATE_LIMIT_WINDOW=60 # Window size in seconds
# ThrottlerModule-based limiting (if using ThrottlerGuard)
THROTTLE_TTL=60 # Window size in seconds
THROTTLE_LIMIT=100 # Requests per window per tracker (IP or IP-User)

# === Authentication (JWT Example) ===
JWT_SECRET=your-very-strong-secret-key-here # CHANGE THIS!
JWT_EXPIRATION_TIME=3600 # Token expiration time in seconds (e.g., 1 hour)

# === Module Specific Settings (Optional) ===
# Example: __MODULE_NAME_UPPER_SNAKE___API_KEY=some_key
`
  },
  {
    path: 'package.json', // No changes needed here typically for adding a module
    content: `{
  "name": "dynamic-nestjs-app",
  "version": "0.1.0",
  "description": "NestJS application with dynamically generated modules",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \\"src/**/*.ts\\" \\"test/**/*.ts\\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \\"{src,apps,libs,test}/**/*.ts\\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "prisma:generate": "prisma generate",
    "prisma:migrate:dev": "prisma migrate dev --name init",
    "prisma:migrate:deploy": "prisma migrate deploy",
    "prisma:studio": "prisma studio",
    "prisma:validate": "prisma validate",
    "prisma:reset": "prisma migrate reset --force",
    "// --- Custom Script to Generate Module ---": "",
    "generate:module": "node generate-module.js"
  },
  "dependencies": {
    "@liaoliaots/nestjs-redis": "^9.0.5",
    "@nestjs/common": "^9.0.0", // Consider updating to NestJS v10+
    "@nestjs/config": "^2.3.0", // Or latest v3+
    "@nestjs/core": "^9.0.0",
    "@nestjs/elasticsearch": "^9.0.0", // Or latest compatible version
    "@nestjs/jwt": "^10.0.0", // Or latest v10+
    "@nestjs/microservices": "^9.0.0",
    "@nestjs/passport": "^9.0.0", // Or latest v10+
    "@nestjs/platform-express": "^9.0.0",
    "@nestjs/platform-socket.io": "^9.0.0",
    "@nestjs/swagger": "^6.3.0", // Or latest v7+
    "@nestjs/throttler": "^4.0.0", // Or latest v5+
    "@nestjs/websockets": "^9.0.0",
    "@prisma/client": "^4.11.0", // Or latest v5+
    "@tensorflow/tfjs-node": "^4.2.0", // Or latest v4+
    "cache-manager": "^4.1.0", // Or latest v5+ compatible with redis-store
    "cache-manager-redis-store": "^2.0.0", // Check compatibility with cache-manager v5+ if upgrading
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "compression": "^1.7.4",
    "helmet": "^7.0.0", // Or latest v7+
    "ioredis": "^5.3.0",
    "kafkajs": "^2.2.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.1",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^5.0.0",
    "rxjs": "^7.8.0",
    "socket.io": "^4.6.0",
    "swagger-ui-express": "^4.6.0" // Or latest v5+
  },
  "devDependencies": {
    "@nestjs/cli": "^9.3.0", // Or latest v10+
    "@nestjs/schematics": "^9.1.0", // Or latest v10+
    "@nestjs/testing": "^9.0.0", // Or latest v10+
    "@types/cache-manager-redis-store": "^2.0.1",
    "@types/compression": "^1.7.2",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.0",
    "@types/node": "^18.15.0", // Or LTS v20+
    "@types/passport-jwt": "^3.0.8",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.57.0",
    "@typescript-eslint/parser": "^5.57.0",
    "eslint": "^8.37.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-prettier": "^4.2.1",
    "jest": "^29.5.0",
    "prettier": "^2.8.7",
    "prisma": "^4.11.0", // Should match @prisma/client version
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.0.5",
    "ts-loader": "^9.4.2",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^4.9.5" // Or latest v5+
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\\\.spec\\\\.ts$",
    "transform": {
      "^.+\\\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  },
  "prisma": {
     "seed": "ts-node prisma/seed.ts" // Example seed script
  }
}`
  },
  {
    path: 'src/main.ts', // Setup remains largely the same
    content: `import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor, Logger, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
// import { PrismaService } from './prisma/prisma.service'; // Import if using shutdown hooks

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
      // Optionally enable logger levels directly
      // logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector); // Get reflector instance

  const port = configService.get<number>('PORT', 3000);
  const globalPrefix = 'api'; // Define global prefix

  // --- Middleware ---
  app.use(helmet()); // Security headers
  app.use(compression()); // Response compression
  app.enableCors({ // Configure CORS more securely for production
      // origin: configService.get('CORS_ORIGIN') || '*', // Allow specific origins
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
  });

  // --- Global Pipes ---
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not defined in DTO
      transform: true, // Automatically transform payloads to DTO instances
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transformOptions: {
        enableImplicitConversion: true, // Convert query/param strings to primitive types if possible
      },
    }),
  );

  // --- Global Interceptors ---
  // Enable transformation based on @Exclude, @Expose decorators in DTOs/Entities
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  // Consider adding a global logging or timeout interceptor here

  // --- Global Prefix ---
  app.setGlobalPrefix(globalPrefix);

  // --- API Versioning (Optional) ---
  app.enableVersioning({
      type: VersioningType.URI, // e.g., /api/v1/resource
      defaultVersion: '1', // Default version if not specified
  });

  // --- Swagger API Documentation ---
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Dynamic NestJS App API')
    .setDescription('API documentation for the application featuring dynamically generated modules.')
    .setVersion('1.0') // App version
    // Add tags dynamically if needed, or let controllers define them
    // .addTag('__ModuleNameKebab__') // Example - defined in controller usually
    .addBearerAuth() // Add JWT Bearer token authentication UI
    .addServer(\`http://localhost:\${port}\`, 'Local Development Server') // Add server URL
    // .addServer('https://staging.example.com', 'Staging Server')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(\`\${globalPrefix}/docs\`, app, document, { // Place Swagger under the global prefix
      swaggerOptions: {
          persistAuthorization: true, // Keep auth token across page refreshes
          docExpansion: 'list', // How documentation expands ('none', 'list', 'full')
          filter: true, // Enable filtering endpoints by tag
      },
      customSiteTitle: 'App API Docs', // Browser tab title
  });

  // --- Graceful Shutdown Hooks (Optional with Prisma) ---
  // const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);

  // --- Start Application ---
  await app.listen(port);
  logger.log(\`🚀 Application is running on: http://localhost:\${port}/\${globalPrefix}\`);
  logger.log(\`📚 Swagger documentation available at: http://localhost:\${port}/\${globalPrefix}/docs\`);
  logger.log(\`🌱 Current NODE_ENV: \${configService.get('NODE_ENV')}\`);
}
bootstrap().catch(error => {
    // Log bootstrap errors
    const logger = new Logger('BootstrapError');
    logger.error('Application failed to start:', error);
    process.exit(1);
});`
  },
  {
    path: 'src/app.module.ts', // Import the dynamically generated module here
    content: `import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis'; // Specific Redis integration

// --- Dynamically import the generated module ---
// This requires knowing the module's class name and file path convention.
// It assumes the generator script has run and created the module.
// NOTE: This dynamic import approach might face issues with NestJS's dependency
// resolution during compile time if not handled carefully (e.g., using path aliases).
// A simpler approach for many use cases is to manually add the import after generation.

// **Option 1: Manual Import (Recommended for simplicity after generation)**
// import { MyAwesomeModuleModule } from './my-awesome-module/my-awesome-module.module'; // <-- Add this manually

// **Option 2: Attempt Dynamic Import (More complex, might need adjustments)**
// This is illustrative and might require tsconfig-paths or similar setup.
// It also assumes the module name is known *at runtime* which isn't typical for AppModule.
// Usually, you know which modules to include when writing AppModule.

// Let's stick to the placeholder for manual addition:
// import { __ModuleNamePascal__Module } from './__ModuleNameKebab__/__ModuleNameKebab__.module';

// --- Placeholder for actual module import ---
// You will need to replace this comment and the line below
// with the actual import of the generated module, e.g.:
// import { UserProfileModule } from './user-profile/user-profile.module';
import { ${moduleNamePascal}Module } from './${moduleNameKebab}/${moduleNameKebab}.module'; // <-- GENERATED IMPORT


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available globally
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env', // Load .env file
      cache: true, // Improve performance by caching env variables
      // validationSchema: Joi.object({ ... }), // Optional: Add validation schema
    }),

    // Redis Module Configuration (using @liaoliaots/nestjs-redis)
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger(RedisModule.name);
        const redisOptions = {
            host: configService.get<string>('REDIS_HOST', 'localhost'),
            port: configService.get<number>('REDIS_PORT', 6379),
            password: configService.get<string>('REDIS_PASSWORD'), // Optional password
            // Add other ioredis options if needed
            // db: 0, // Optional Redis DB index
        };
        logger.log(\`Connecting to Redis at \${redisOptions.host}:\${redisOptions.port}\`);
        return {
            config: redisOptions,
            // Add error logging
             onClientReady: (client) => {
                logger.log('Redis client ready');
                client.on('error', (err) => {
                    logger.error('Redis Client Error:', err);
                });
            },
        };
      },
      inject: [ConfigService],
    }),

    // --- Import your generated module here ---
     ${moduleNamePascal}Module, // <-- Use the imported module variable

    // --- Import other core modules (Auth, Users, etc.) if applicable ---
    // AuthModule,
    // UsersModule,

  ],
  controllers: [], // AppController can be added if needed for root endpoints
  providers: [], // AppService or global providers can be added here
})
export class AppModule {}`
  },
  {
    path: 'docker-compose.yml', // Keep infra names generic unless needed
    content: `version: '3.8'

services:
  # --- PostgreSQL Database ---
  postgres:
    image: postgres:15-alpine # Use a specific version
    container_name: nestapp-postgres # Generic name
    restart: always
    ports:
      - "5432:5432" # Map host port 5432 to container port 5432
    environment:
      POSTGRES_USER: \${POSTGRES_USER:-postgres} # Use .env or default
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD:-password} # Use .env or default
      POSTGRES_DB: \${POSTGRES_DB:-mydatabase} # Use .env or default
    volumes:
      - postgres-data:/var/lib/postgresql/data # Persist data
    healthcheck:
        test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER:-postgres} -d \${POSTGRES_DB:-mydatabase}"]
        interval: 10s
        timeout: 5s
        retries: 5

  # --- Redis Cache / Message Broker ---
  redis:
    image: redis:7-alpine # Use a specific version
    container_name: nestapp-redis # Generic name
    restart: always
    ports:
      - "6379:6379"
    command: redis-server --save 60 1 --loglevel warning # Add persistence options if needed
    volumes:
      - redis-data:/data # Persist data
    # Add password if set in .env
    # environment:
    #   REDIS_PASSWORD: \${REDIS_PASSWORD}
    healthcheck:
        test: ["CMD", "redis-cli", "ping"]
        interval: 10s
        timeout: 5s
        retries: 5

  # --- Elasticsearch Search Engine ---
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.6.2 # Use a specific compatible version
    container_name: nestapp-elasticsearch # Generic name
    restart: always
    environment:
      - discovery.type=single-node # Single node for local dev
      - ES_JAVA_OPTS=-Xms512m -Xmx512m # Limit JVM heap size
      - xpack.security.enabled=false # Disable security for local dev (Enable for Prod!)
      # - ELASTIC_PASSWORD=your_password # Set if security is enabled
      # - xpack.security.http.ssl.enabled=false # Disable SSL for HTTP if needed
      # - xpack.security.transport.ssl.enabled=false # Disable SSL for transport if needed
    ulimits: # Recommended settings for Elasticsearch
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    ports:
      - "9200:9200" # HTTP port
      # - "9300:9300" # Transport port (if needed)
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data # Persist data
    healthcheck:
        test: ["CMD-SHELL", "curl -s --fail http://localhost:9200/_cluster/health?wait_for_status=yellow&timeout=5s || exit 1"]
        interval: 10s
        timeout: 10s
        retries: 10

  # --- Kafka Cluster (Zookeeper + Kafka Broker) ---
  zookeeper:
    image: confluentinc/cp-zookeeper:7.3.0 # Use a specific version
    container_name: nestapp-zookeeper # Generic name
    restart: always
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    healthcheck:
        test: ["CMD", "echo", "ruok", "|", "nc", "-w", "2", "localhost", "2181"]
        interval: 10s
        timeout: 5s
        retries: 5


  kafka:
    image: confluentinc/cp-kafka:7.3.0 # Use a specific version
    container_name: nestapp-kafka # Generic name
    restart: always
    depends_on:
      zookeeper:
        condition: service_healthy # Wait for Zookeeper to be healthy
    ports:
      # Expose the internal port 29092 as 9092 on the host network
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181 # Connect to Zookeeper service
      # Listeners: PLAINTEXT for inter-broker and within Docker network, PLAINTEXT_HOST for host access
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1 # Single broker setup
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      # Optional: Auto create topics (disable for production)
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: 'true'
    healthcheck:
        # Simple check: try to list topics. Needs kafkacat or similar tool inside the container,
        # or a more robust check script. This is a basic placeholder.
        test: ["CMD-SHELL", "kafka-topics --bootstrap-server localhost:29092 --list || exit 1"]
        interval: 15s
        timeout: 10s
        retries: 10


  # --- Optional: Kafka UI (e.g., Kafdrop or Kafka UI) ---
  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    container_name: nestapp-kafka-ui # Generic name
    depends_on:
      kafka:
        condition: service_healthy # Wait for Kafka to be healthy (or started)
      zookeeper:
        condition: service_healthy
    ports:
      - "8080:8080" # Map host port 8080 to container port 8080
    environment:
      KAFKA_CLUSTERS_0_NAME: local-docker-cluster
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:29092 # Internal Kafka address
      KAFKA_CLUSTERS_0_ZOOKEEPER: zookeeper:2181 # Zookeeper address
      # Optional: Add Schema Registry, Kafka Connect configs if used
      # KAFKA_CLUSTERS_0_SCHEMAREGISTRY: http://schema-registry:8081

# --- Named Volumes for Data Persistence ---
volumes:
  postgres-data:
    driver: local
  redis-data:
    driver: local
  elasticsearch-data:
    driver: local
`
  }
];

// --- File Generation Logic ---

// Function to create directory if it doesn't exist (recursively)
function createDirectoryIfNotExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    try {
        fs.mkdirSync(directoryPath, { recursive: true });
        console.log(`Directory ${directoryPath} created.`);
    } catch (error) {
        console.error(`Error creating directory ${directoryPath}:`, error);
        process.exit(1); // Exit if directory creation fails
    }
  }
}

// Create all base directories first
directories.forEach(dir => {
  createDirectoryIfNotExists(dir);
});

// Process and create/update all files
files.forEach(fileInfo => {
  const finalPath = replacePlaceholders(fileInfo.path);
  const finalContent = replacePlaceholders(fileInfo.content);
  const dirName = path.dirname(finalPath);

  // Ensure directory for the file exists
  createDirectoryIfNotExists(dirName);

  try {
    // Special handling for schema.prisma: Append if exists, otherwise create.
    if (path.basename(finalPath) === 'schema.prisma' && fs.existsSync(finalPath)) {
        fs.appendFileSync(finalPath, '\n\n' + finalContent); // Add newline separation
        console.log(`Content appended to ${finalPath}.`);
    } else {
        fs.writeFileSync(finalPath, finalContent);
        console.log(`File ${finalPath} created/updated.`);
    }
  } catch (error) {
       console.error(`Error writing file ${finalPath}:`, error);
  }
});

console.log('\n--------------------------------------------------');
console.log(`Module '${moduleNamePascal}' generation process completed.`);
console.log('--------------------------------------------------');
console.log('\nNext steps:');
console.log(`1. Manually import '${moduleNamePascal}Module' into 'src/app.module.ts'.`);
console.log(`   Add: import { ${moduleNamePascal}Module } from './${moduleNameKebab}/${moduleNameKebab}.module';`);
console.log(`   And add ${moduleNamePascal}Module to the 'imports' array.`);
console.log(`2. Review the generated Prisma model in 'prisma/schema.prisma' and adjust if needed.`);
console.log(`3. Run 'npx prisma generate' to update your Prisma Client.`);
console.log(`4. Run 'npx prisma migrate dev --name add_${moduleNameLowerSnake}_model' (or similar) to create a migration and apply it to your database.`);
console.log(`5. Review all generated files (\`src/${moduleNameKebab}/**\`) for TODOs, placeholders, and correctness specific to your needs (especially ML, Elasticsearch mappings, DTOs, interfaces).`);
console.log(`6. Update '.env' with any necessary environment variables (e.g., database URL, secrets).`);
console.log('7. Run `npm install` if new dependencies were added (check package.json diffs).');
console.log('8. Start your application (`npm run start:dev`).');