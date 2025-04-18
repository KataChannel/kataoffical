import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
import { CreateDashboardDto, UpdateDashboardDto } from './dto/dashboard.dto';
export declare class DashboardService {
    private readonly prisma;
    private readonly socketGateway;
    private readonly errorLogService;
    constructor(prisma: PrismaService, socketGateway: SocketGateway, errorLogService: ErrorlogService);
    private emitUpdateEvent;
    getLastUpdatedDashboard(): Promise<{
        updatedAt: any;
    }>;
    generateCodeId(): Promise<string>;
    create(data: CreateDashboardDto): Promise<any>;
    reorderDashboards(dashboardIds: string[]): Promise<void>;
    findAll(): Promise<any>;
    findBy(param: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: UpdateDashboardDto): Promise<any>;
    remove(id: string): Promise<any>;
}
