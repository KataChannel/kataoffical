import { ServerStabilityService } from '../common/server-stability.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class HealthController {
    private readonly serverStability;
    private readonly prisma;
    constructor(serverStability: ServerStabilityService, prisma: PrismaService);
    getHealth(): Promise<any>;
    getDetailedHealth(): Promise<any>;
    getReadiness(): Promise<{
        status: string;
        timestamp: string;
        checks: {
            database: string;
        };
        error?: undefined;
    } | {
        status: string;
        timestamp: string;
        checks: {
            database: string;
        };
        error: any;
    }>;
    getLiveness(): Promise<{
        status: string;
        timestamp: string;
        uptime: number;
        memoryUsage: number;
    }>;
    private getDatabaseConnectionsCount;
    private getProcessStats;
}
