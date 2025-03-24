import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class SanphamService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedSanpham(): Promise<{
        updatedAt: any;
    }>;
    generateMaSP(): Promise<string>;
    create(data: any): Promise<any>;
    reorderSanphams(sanphamIds: string[]): Promise<void>;
    findAll(): Promise<any>;
    findby(param: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
