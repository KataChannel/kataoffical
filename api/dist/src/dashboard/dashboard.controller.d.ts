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
    getDonhang(query: any): Promise<{
        donhang: {
            total: number;
            previousTotal: number;
            percentageChange: number;
            sanphamCount: number;
        };
        dathang: {
            total: number;
            previousTotal: number;
            percentageChange: number;
            sanphamCount: number;
        };
        productQuantities: {
            donhang: {
                sanpham: {
                    id: string;
                    title: string;
                } | undefined;
                soluong: number | import("@prisma/client/runtime/library").Decimal;
            }[];
            dathang: {
                sanpham: {
                    id: string;
                    title: string;
                } | undefined;
                soluong: number | import("@prisma/client/runtime/library").Decimal;
            }[];
        };
        topProducts: {
            sanpham: {
                id: string;
                title: string;
            } | undefined;
            soluong: number | import("@prisma/client/runtime/library").Decimal;
        }[];
        revenue: {
            donhang: number | import("@prisma/client/runtime/library").Decimal;
            dathang: number | import("@prisma/client/runtime/library").Decimal;
        };
        period: {
            start: Date;
            end: Date;
        };
    }>;
}
