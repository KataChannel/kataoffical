import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class DoanhthuService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedDoanhthu(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        doanhsoId: string;
        amount: number;
        commission: number;
        completedAt: Date | null;
    }>;
    findBy(param: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        doanhsoId: string;
        amount: number;
        commission: number;
        completedAt: Date | null;
    } | {
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            status: string;
            doanhsoId: string;
            amount: number;
            commission: number;
            completedAt: Date | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            status: string;
            doanhsoId: string;
            amount: number;
            commission: number;
            completedAt: Date | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        doanhsoId: string;
        amount: number;
        commission: number;
        completedAt: Date | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        doanhsoId: string;
        amount: number;
        commission: number;
        completedAt: Date | null;
    }>;
    reorderDoanhthus(doanhthuIds: string[]): Promise<{
        status: string;
    }>;
}
