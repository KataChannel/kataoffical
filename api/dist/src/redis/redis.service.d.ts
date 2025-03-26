export declare class RedisService {
    private client;
    constructor();
    create(key: string, value: any, ttl?: number): Promise<void>;
    read(key: string): Promise<any>;
    update(key: string, value: any, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    expire(key: string, ttl: number): Promise<void>;
    keys(pattern: string): Promise<string[]>;
    clearAll(): Promise<void>;
}
