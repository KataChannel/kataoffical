import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
import { ErrorlogsService } from 'src/errorlogs/errorlogs.service';
import { SummaryQueryDto } from './dto/summary-query.dto';
export declare class DashboardService {
    private readonly prisma;
    private readonly socketGateway;
    private readonly errorLogService;
    constructor(prisma: PrismaService, socketGateway: SocketGateway, errorLogService: ErrorlogsService);
    getSummary(query: SummaryQueryDto): void;
    getTopSellingProducts(limit: number, query: SummaryQueryDto): void;
    getLowStockProducts(): void;
    getRecentOrders(limit: number): void;
    getSalesTrend(query: SummaryQueryDto): void;
}
