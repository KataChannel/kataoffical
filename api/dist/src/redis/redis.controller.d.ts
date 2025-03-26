import { RedisService } from './redis.service';
export declare class RedisController {
    private readonly redisService;
    constructor(redisService: RedisService);
    create(key: string, value: any, ttl?: number): Promise<{
        message: string;
    }>;
    read(key: string): Promise<{
        key: string;
        data: any;
    }>;
    update(key: string, value: any, ttl?: number): Promise<{
        message: string;
    }>;
    clearAll(): Promise<{
        message: string;
    }>;
    delete(key: string): Promise<{
        message: string;
    }>;
    exists(key: string): Promise<{
        key: string;
        exists: boolean;
    }>;
    expire(key: string, ttl: number): Promise<{
        message: string;
    }>;
    keys(pattern: string): Promise<{
        keys: string[];
    }>;
}
