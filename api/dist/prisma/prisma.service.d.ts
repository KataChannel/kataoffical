import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RedisService } from '../src/redis/redis.service';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly redisService;
    private readonly logger;
    constructor(redisService: RedisService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    executeWithRetry<T>(operation: (prisma: PrismaService) => Promise<T>, maxRetries?: number, baseDelay?: number): Promise<T>;
    safeTransaction<T>(fn: (prisma: PrismaService) => Promise<T>, options?: {
        timeout?: number;
        maxWait?: number;
        retries?: number;
    }): Promise<T>;
}
