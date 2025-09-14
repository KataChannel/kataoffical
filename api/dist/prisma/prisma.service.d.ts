import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    executeWithRetry<T>(operation: (prisma: PrismaService) => Promise<T>, maxRetries?: number, baseDelay?: number): Promise<T>;
    safeTransaction<T>(fn: (prisma: PrismaService) => Promise<T>, options?: {
        timeout?: number;
        maxWait?: number;
        retries?: number;
    }): Promise<T>;
}
