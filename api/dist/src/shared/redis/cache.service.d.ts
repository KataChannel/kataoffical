import { Cache } from 'cache-manager';
export interface CacheOptions {
    ttl?: number;
    prefix?: string;
}
export declare class CacheService {
    private cacheManager;
    private readonly redis;
    constructor(cacheManager: Cache);
    checkRedisConnection(): Promise<string>;
    getAllCachedData(): Promise<{
        key: string;
        value: string;
    }[]>;
    deleteCachedData(key: string): Promise<void>;
    clearAllCache(): Promise<void>;
    private generateKey;
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, options?: CacheOptions): Promise<void>;
    del(key: string): Promise<void>;
    delByPattern(pattern: string): Promise<void>;
    getOrSet<T>(prefix: string, identifier: string | number | object, fetchFunction: () => Promise<T>, options?: CacheOptions): Promise<T>;
    clearByPrefix(prefix: string): Promise<void>;
}
