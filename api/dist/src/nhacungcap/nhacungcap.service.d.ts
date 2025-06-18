import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class NhacungcapService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedNhacungcap(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        codeId: string;
        diachi: string | null;
        createdBy: string | null;
    }>;
    findBy(param: any): Promise<{
        id: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        codeId: string;
        diachi: string | null;
        createdBy: string | null;
    } | {
        data: {
            id: string;
            email: string | null;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            codeId: string;
            diachi: string | null;
            createdBy: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            email: string | null;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            codeId: string;
            diachi: string | null;
            createdBy: string | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        codeId: string;
        diachi: string | null;
        createdBy: string | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        codeId: string;
        diachi: string | null;
        createdBy: string | null;
    }>;
    reorderNhacungcaps(nhacungcapIds: string[]): Promise<{
        status: string;
    }>;
}
