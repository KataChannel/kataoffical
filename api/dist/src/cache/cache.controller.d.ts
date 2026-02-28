export declare class CacheController {
    private redis;
    constructor();
    invalidateCache(model: string): Promise<{
        success: boolean;
        message: string;
        deletedKeys: number;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        deletedKeys?: undefined;
    }>;
    invalidateAllCache(): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
    getCacheStats(): Promise<{
        success: boolean;
        totalKeys: number;
        dbSize: number;
        memoryInfo: string;
        sampleKeys: string[];
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        totalKeys?: undefined;
        dbSize?: undefined;
        memoryInfo?: undefined;
        sampleKeys?: undefined;
    }>;
}
