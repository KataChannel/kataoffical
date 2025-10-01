import { ServerStabilityService } from '../common/server-stability.service';
export declare class EnhancedDongbogiaService {
    private readonly serverStability;
    constructor(serverStability: ServerStabilityService);
    dongbogiaEnhanced(listdonhang: any[]): Promise<{
        status: string;
        message: string;
        stats: {
            totalOrders: number;
            successful: number;
            failed: number;
            successRate: number;
        };
    }>;
}
