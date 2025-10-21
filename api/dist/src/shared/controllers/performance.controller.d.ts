import { PerformanceLogService } from '../services/performance-log.service';
export declare class PerformanceController {
    private readonly performanceLogService;
    constructor(performanceLogService: PerformanceLogService);
    getPerformanceStats(): {
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
    getDatabaseStats(hours?: number): Promise<{
        timeRange: string;
        overview: {
            totalOperations: number;
            successfulOperations: number;
            failedOperations: number;
            successRate: string;
            avgDuration: string;
            maxDuration: string;
            minDuration: string;
        };
        slowestOperations: {
            name: string;
            duration: string;
            timestamp: string;
            url: string | null;
            error: string | null;
        }[];
        recentErrors: {
            name: string;
            error: string | null;
            duration: string;
            timestamp: string;
            url: string | null;
        }[];
        operationBreakdown: {
            operation: string;
            count: number;
            avgDuration: string;
            maxDuration: string;
            minDuration: string;
        }[];
    }>;
    getLogs(limit?: number, offset?: number, operation?: string, success?: string, minDuration?: number, hours?: number): Promise<{
        error: string | null;
        id: string;
        name: string;
        timestamp: Date;
        success: boolean;
        duration: number;
        context: import("@prisma/client/runtime/library").JsonValue | null;
        method: string | null;
        url: string | null;
        statusCode: number | null;
        memoryUsage: number | null;
    }[]>;
    getTrends(hours?: number): Promise<{
        hour: any;
        totalOperations: number;
        avgDuration: string;
        maxDuration: string;
        errorCount: number;
        errorRate: string;
    }[]>;
    getPerformanceSummary(hours?: number): Promise<{
        realTime: {
            totalOperations: number;
            errorRate: string;
            recent: {
                last5Minutes: {
                    count: number;
                    averageResponseTime: string;
                    successRate: string;
                };
                last1Hour: {
                    count: number;
                    averageResponseTime: string;
                    successRate: string;
                };
            };
            slowestOperations: {
                operation: string;
                duration: string;
                timestamp: string;
            }[];
        };
        historical: {
            timeRange: string;
            overview: {
                totalOperations: number;
                successfulOperations: number;
                failedOperations: number;
                successRate: string;
                avgDuration: string;
                maxDuration: string;
                minDuration: string;
            };
            slowestOperations: {
                name: string;
                duration: string;
                timestamp: string;
                url: string | null;
                error: string | null;
            }[];
            recentErrors: {
                name: string;
                error: string | null;
                duration: string;
                timestamp: string;
                url: string | null;
            }[];
            operationBreakdown: {
                operation: string;
                count: number;
                avgDuration: string;
                maxDuration: string;
                minDuration: string;
            }[];
        };
        trends: {
            hour: any;
            totalOperations: number;
            avgDuration: string;
            maxDuration: string;
            errorCount: number;
            errorRate: string;
        }[];
    }>;
    cleanupOldLogs(days?: number): Promise<{
        message: string;
    }>;
    clearMemoryMetrics(): {
        message: string;
    };
}
