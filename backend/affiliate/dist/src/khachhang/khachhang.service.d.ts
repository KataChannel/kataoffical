import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class khachHangService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    create(data: any): Promise<void>;
    findBy(param: any): Promise<void>;
    findAll(page?: number, limit?: number): Promise<void>;
    findOne(id: string): Promise<void>;
    update(id: string, data: any): Promise<void>;
    remove(id: string): Promise<void>;
    reorderkhachHangs(khachHangIds: string[]): Promise<void>;
}
