import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
import { CreateTrackingDto, UpdateTrackingDto } from './dto/tracking.dto';
export declare class TrackingService {
    private readonly prisma;
    private readonly socketGateway;
    private readonly errorLogService;
    constructor(prisma: PrismaService, socketGateway: SocketGateway, errorLogService: ErrorlogService);
    private emitUpdateEvent;
    getLastUpdatedTracking(): Promise<{
        updatedAt: any;
    }>;
    generateCodeId(): Promise<string>;
    create(data: CreateTrackingDto): Promise<any>;
    reorderTrackings(trackingIds: string[]): Promise<void>;
    findAll(): Promise<any>;
    findBy(param: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: UpdateTrackingDto): Promise<any>;
    remove(id: string): Promise<any>;
}
