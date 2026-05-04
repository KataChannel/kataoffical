import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from '../socket.gateway';
import { ErrorlogsService } from '../errorlogs/errorlogs.service';
import { SummaryQueryDto } from './dto/summary-query.dto';
export declare class DashboardService {
    private readonly prisma;
    private readonly socketGateway;
    private readonly errorLogService;
    constructor(prisma: PrismaService, socketGateway: SocketGateway, errorLogService: ErrorlogsService);
    private getStartOfDay;
    private getEndOfDay;
    getSummary(query: SummaryQueryDto): void;
    getTopSellingProducts(limit: number, query: SummaryQueryDto): void;
    getLowStockProducts(): void;
    getRecentOrders(limit: number): void;
    getSalesTrend(query: SummaryQueryDto): void;
    getDoanhthu(data: any): void;
    getDonhang(data: any): Promise<{
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
    getInventoryDiscrepancies(): Promise<{
        negativeStock: {
            id: string;
            title: string;
            masp: string;
            slton: number;
            type: string;
        }[];
        discrepancies: {
            id: string;
            title: string;
            masp: string;
            chenhlech: number;
            sltonhethong: number;
            sltonthucte: number;
            ngaychot: Date;
            type: string;
        }[];
    }>;
}
