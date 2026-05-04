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
export declare class TopCustomerItem {
    id: string;
    ten: string;
    loai: string;
    doanhthu: number;
    ngay?: string;
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
export declare class InventoryDiscrepancyItem {
    id: string;
    title: string;
    masp?: string;
    chenhlech: number;
    sltonhethong: number;
    sltonthucte: number;
    type: string;
    ngaychot?: string;
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
    topCustomers(batdau: string, ketthuc: string, limit: number): Promise<TopCustomerItem[]>;
    getStagnantProducts(limit?: number): Promise<StagnantProductItem[]>;
    getInventoryDiscrepancies(): Promise<InventoryDiscrepancyItem[]>;
}
export declare class StagnantProductItem {
    sanpham: SanphamInfo;
    status: string;
    hoursStagnant: number;
    oldestOrderCode?: string;
    realStatus?: string;
    orderId?: string;
    quantity: number;
}
