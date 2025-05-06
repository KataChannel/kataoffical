import { DashboardService } from './dashboard.service';
import { SummaryQueryDto } from './dto/summary-query.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary(query: SummaryQueryDto): void;
    getTopSellingProducts(limit: number, query: SummaryQueryDto): void;
    getLowStockProducts(): void;
    getRecentOrders(limit: number): void;
    getSalesTrend(query: SummaryQueryDto): void;
    getDoanhthu(query: SummaryQueryDto): void;
}
