import { OnModuleDestroy } from '@nestjs/common';
export declare class RedisService implements OnModuleDestroy {
    private readonly logger;
    private client;
    constructor();
    onModuleDestroy(): Promise<void>;
    create(key: string, value: any, ttl?: number): Promise<void>;
    read(key: string): Promise<any>;
    update(key: string, value: any, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    deletePattern(pattern: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    expire(key: string, ttl: number): Promise<void>;
    keys(pattern: string): Promise<string[]>;
    clearAll(): Promise<void>;
    showAll(): Promise<{}>;
    cacheOrFetch<T>(key: string, fetchFn: () => Promise<T>, ttl?: number): Promise<T>;
    generateKey(prefix: string, ...parts: string[]): string;
}
