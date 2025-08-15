export declare class GraphQLPerformanceService {
    private metrics;
    private queryCache;
    constructor();
    startOperation(operationName: string, modelName: string, context?: any): string;
    endOperation(operationId: string, result: {
        success: boolean;
        recordCount?: number;
        error?: string;
        queryOptimized?: boolean;
        cacheHit?: boolean;
    }): void;
    getPerformanceStats(modelName?: string): any;
    cacheQueryResult(queryKey: string, result: any, ttl?: number): void;
    getCachedQueryResult(queryKey: string): any;
    generateQueryKey(modelName: string, operation: string, args: any): string;
    getCacheStats(): any;
    clearAll(): void;
    exportPerformanceData(): any;
    private logPerformanceInfo;
    private updateAggregatedStats;
    private formatMetricForDisplay;
    private hashObject;
    private cleanupOldMetrics;
    private cleanupExpiredCache;
    private estimateCacheMemoryUsage;
    private getTopCachedQueries;
}
