export declare class RedisService {
    private client;
    constructor();
    set(key: string, value: any, ttl?: number): Promise<void>;
    get(key: string): Promise<any>;
}
