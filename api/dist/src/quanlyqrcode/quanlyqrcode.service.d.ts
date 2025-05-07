import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
export declare class QuanlyqrcodeService {
    private readonly prisma;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _ErrorlogService: ErrorlogService);
    getLastUpdatedquanlyqrcode(): Promise<{
        updatedAt: any;
    }>;
    create(data: any): Promise<any>;
    findAll(): Promise<any>;
    findby(param: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
