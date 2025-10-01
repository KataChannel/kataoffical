import { PrismaService } from 'prisma/prisma.service';
interface PerformanceMetric {
    name: string;
    duration: number;
    timestamp: number;
    context?: any;
    success: boolean;
    error?: string;
    method?: string;
    url?: string;
    statusCode?: number;
    memoryUsage?: number;
}
interface PerformanceQueryOptions {
    startDate?: Date;
    endDate?: Date;
    operation?: string;
    success?: boolean;
    minDuration?: number;
    maxDuration?: number;
    limit?: number;
    offset?: number;
}
export declare class PerformanceLogService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    saveMetric(metric: PerformanceMetric): Promise<void>;
    saveMetrics(metrics: PerformanceMetric[]): Promise<void>;
    getLogs(options?: PerformanceQueryOptions): Promise<{
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
    getStatistics(hours?: number): Promise<{
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
    cleanupOldLogs(daysToKeep?: number): Promise<number>;
    getTrends(hours?: number): Promise<{
        hour: any;
        totalOperations: number;
        avgDuration: string;
        maxDuration: string;
        errorCount: number;
        errorRate: string;
    }[]>;
}
export {};
