import { CacheService } from './cache.service';
export declare class CacheController {
    private readonly _CacheService;
    constructor(_CacheService: CacheService);
    checkRedis(): Promise<string>;
    getAllCachedData(): Promise<{
        key: string;
        value: string;
    }[]>;
    clearAllCache(): Promise<void>;
}
