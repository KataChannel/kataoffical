import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class landingPageService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedlandingPage(): Promise<{
        updatedAt: any;
    }>;
    generatecodeId(): Promise<string>;
    create(data: any): Promise<any>;
    reorderlandingPages(landingPageIds: string[]): Promise<void>;
    findAll(): Promise<any>;
    findby(param: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
