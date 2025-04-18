import { MiddlewareConsumer } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KataAppService } from './kataapp.service';
import { KataAppRepository } from './kataapp.repository';
import { KataAppEventService } from './kataapp-event.service';
import { KataAppElasticsearchService } from './kataapp-elasticsearch.service';
import { KataAppMLService } from './services/kataapp-ml.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class KataAppModule {
    configure(consumer: MiddlewareConsumer): void;
}
import { ClientKafka } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { PaginationDto } from './dto/pagination.dto';
import { CreateKataAppDto, UpdateKataAppDto } from './dto/kataapp.dto';
import { KataApp } from './interfaces/kataapp.interface';
export declare class KataAppService {
    private cacheManager;
    private readonly kafkaClient;
    private readonly repository;
    private readonly eventService;
    private readonly elasticsearchService;
    private readonly mlService;
    private readonly configService;
    constructor(cacheManager: Cache, kafkaClient: ClientKafka, repository: KataAppRepository, eventService: KataAppEventService, elasticsearchService: KataAppElasticsearchService, mlService: KataAppMLService, configService: ConfigService);
    onModuleInit(): Promise<void>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: KataApp[];
        meta: any;
    }>;
    findById(id: string): Promise<KataApp>;
    search(query: string, paginationDto: PaginationDto): Promise<{
        data: KataApp[];
        meta: any;
    }>;
    create(createDto: CreateKataAppDto): Promise<KataApp>;
    update(id: string, updateDto: UpdateKataAppDto): Promise<KataApp>;
    delete(id: string): Promise<boolean>;
    predictWithRNN(data: any): Promise<any>;
}
export declare class KataAppRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(paginationDto: PaginationDto): Promise<{
        data: KataApp[];
        meta: any;
    }>;
    findById(id: string): Promise<KataApp>;
    create(createDto: CreateKataAppDto): Promise<KataApp>;
    update(id: string, updateDto: UpdateKataAppDto): Promise<KataApp>;
    delete(id: string): Promise<boolean>;
}
export declare class KataAppEventService {
    private readonly kafkaClient;
    constructor(kafkaClient: ClientKafka);
    emitCreatedEvent(data: KataApp): void;
    emitUpdatedEvent(data: KataApp): void;
    emitDeletedEvent(data: {
        id: string;
    }): void;
}
import { ElasticsearchService } from '@nestjs/elasticsearch';
export declare class KataAppElasticsearchService {
    private readonly elasticsearchService;
    private readonly configService;
    private readonly indexName;
    constructor(elasticsearchService: ElasticsearchService, configService: ConfigService);
    private initIndex;
    index(document: KataApp): Promise<any>;
    update(id: string, document: KataApp): Promise<any>;
    delete(id: string): Promise<any>;
    search(query: string, paginationDto: PaginationDto): Promise<{
        data: KataApp[];
        meta: any;
    }>;
}
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class KataAppWebSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly kataAppService;
    private readonly logger;
    server: Server;
    constructor(kataAppService: KataAppService);
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSubscribeToUpdates(client: Socket, payload: {
        roomId: string;
    }): {
        event: string;
        data: {
            roomId: string;
        };
    };
    handleUnsubscribeFromUpdates(client: Socket, payload: {
        roomId: string;
    }): {
        event: string;
        data: {
            roomId: string;
        };
    };
    notifyKataAppCreated(kataApp: any): void;
    notifyKataAppUpdated(kataApp: any): void;
    notifyKataAppDeleted(kataApp: {
        id: string;
    }): void;
}
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from '@liaoliaots/nestjs-redis';
export declare class RateLimitMiddleware implements NestMiddleware {
    private readonly redisService;
    private readonly configService;
    constructor(redisService: RedisService, configService: ConfigService);
    use(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
export declare class KataAppRateLimitGuard extends ThrottlerGuard implements CanActivate {
    private readonly configService;
    constructor(configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    getTracker(req: Record<string, any>): string;
}
export declare class KataAppMLService {
    private model;
    private readonly logger;
    constructor();
    private initModel;
    private createRNNModel;
    predictWithRNN(data: number[][]): Promise<number[]>;
    trainRNNModel(trainingData: {
        input: number[][];
        output: number[];
    }[], epochs?: number): Promise<any>;
}
export declare class PaginationDto {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
}
export declare class CreateKataAppDto {
    title: string;
    description: string;
    content: string;
    tags?: string[];
    authorId?: string;
}
export declare class UpdateKataAppDto {
    title?: string;
    description?: string;
    content?: string;
    tags?: string[];
}
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
import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor();
    onModuleInit(): Promise<void>;
}
