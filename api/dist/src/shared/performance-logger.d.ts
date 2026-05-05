export declare class PerformanceLogger {
    private static logger;
    private static metrics;
    private static readonly MAX_METRICS;
    private static performanceLogService;
    static setPerformanceLogService(service: any): void;
    static logAsync<T>(name: string, fn: () => Promise<T>, context?: any): Promise<T>;
    static logSync<T>(name: string, fn: () => T, context?: any): T;
    static logDuration(name: string, duration: number, context?: any): void;
    private static recordMetric;
    private static logPerformance;
    static getStatistics(): {
        total: number;
        last5Minutes: {
            count: number;
            avgDuration: number;
            successRate: number;
        };
        last1Hour: {
            count: number;
            avgDuration: number;
            successRate: number;
        };
        slowest: {
            name: string;
            duration: number;
            timestamp: number;
        }[];
        errorRate: number;
    };
    static clearMetrics(): void;
}
