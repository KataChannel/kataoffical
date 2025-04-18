import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
import { CreateTrackingeventDto, UpdateTrackingeventDto } from './dto/trackingevent.dto';
export declare class TrackingeventService {
    private readonly prisma;
    private readonly socketGateway;
    private readonly errorLogService;
    constructor(prisma: PrismaService, socketGateway: SocketGateway, errorLogService: ErrorlogService);
    private emitUpdateEvent;
    getLastUpdatedTrackingevent(): Promise<{
        updatedAt: any;
    }>;
    generateCodeId(): Promise<string>;
    create(data: CreateTrackingeventDto): Promise<any>;
    reorderTrackingevents(trackingeventIds: string[]): Promise<void>;
    findAll(): Promise<any>;
    findBy(param: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: UpdateTrackingeventDto): Promise<any>;
    remove(id: string): Promise<any>;
}
