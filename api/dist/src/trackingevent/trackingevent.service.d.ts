import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class TrackingEventService {
    private readonly prisma;
    private readonly socketGateway;
    private readonly errorLogService;
    constructor(prisma: PrismaService, socketGateway: SocketGateway, errorLogService: ErrorlogService);
    logEvent(data: any): Promise<any>;
    getEventsByLink(linkId: string, type?: string): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        timestamp: Date;
        affiliateLinkId: string;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }[]>;
    private emitUpdateEvent;
    create(data: any): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        timestamp: Date;
        affiliateLinkId: string;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }>;
    findAll(): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        timestamp: Date;
        affiliateLinkId: string;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }[]>;
    findBy(param: any): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        timestamp: Date;
        affiliateLinkId: string;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }>;
    findOne(id: string): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        timestamp: Date;
        affiliateLinkId: string;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        timestamp: Date;
        affiliateLinkId: string;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }>;
    remove(id: string): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        timestamp: Date;
        affiliateLinkId: string;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }>;
}
