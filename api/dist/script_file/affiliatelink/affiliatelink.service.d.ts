import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
import { CreateAffiliatelinkDto, UpdateAffiliatelinkDto } from './dto/affiliatelink.dto';
export declare class AffiliatelinkService {
    private readonly prisma;
    private readonly socketGateway;
    private readonly errorLogService;
    constructor(prisma: PrismaService, socketGateway: SocketGateway, errorLogService: ErrorlogService);
    private emitUpdateEvent;
    getLastUpdatedAffiliatelink(): Promise<{
        updatedAt: any;
    }>;
    generateCodeId(): Promise<string>;
    create(data: CreateAffiliatelinkDto): Promise<any>;
    reorderAffiliatelinks(affiliatelinkIds: string[]): Promise<void>;
    findAll(): Promise<any>;
    findBy(param: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: UpdateAffiliatelinkDto): Promise<any>;
    remove(id: string): Promise<any>;
}
