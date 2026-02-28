import { PrismaService } from '../../prisma/prisma.service';
export declare class AggregateCount {
    _all: number;
}
export declare class AggregateSum {
    tongtien?: number;
    tongvat?: number;
}
export declare class AggregateResult {
    _count: AggregateCount;
    _sum?: AggregateSum;
}
export declare class DailyMonthlyReportItem {
    period: string;
    totalDonhang: number;
    totalDathang: number;
    totalRevenue: number;
    totalProfit: number;
}
export declare class SanphamInfo {
    id: string;
    title?: string;
    masp?: string;
}
export declare class TopProductItem {
    sanpham: SanphamInfo;
    totalQuantity: number;
    totalValue: number;
}
export declare class DashboardResolver {
    private prisma;
    constructor(prisma: PrismaService);
    aggregateDonhang(batdau?: string, ketthuc?: string): Promise<AggregateResult>;
    aggregateDathang(batdau?: string, ketthuc?: string): Promise<AggregateResult>;
    aggregateSanpham(): Promise<AggregateResult>;
    aggregateKhachhang(): Promise<AggregateResult>;
    aggregateNhacungcap(): Promise<AggregateResult>;
    dailyMonthlyReport(batdau: string, ketthuc: string, groupBy: string): Promise<DailyMonthlyReportItem[]>;
    topProductsByQuantity(batdau: string, ketthuc: string, limit: number): Promise<TopProductItem[]>;
    topProductsByValue(batdau: string, ketthuc: string, limit: number): Promise<TopProductItem[]>;
}
