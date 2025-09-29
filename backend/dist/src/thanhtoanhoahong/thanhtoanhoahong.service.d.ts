import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class ThanhtoanhoahongService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedThanhtoanhoahong(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        order: number | null;
        hoaHongId: string;
        amountPaid: number;
        paymentMethod: string | null;
        paymentDate: Date;
    }>;
    getTotalThanhtoanhoahongByUserId(userId: string): Promise<{
        total: number;
    }>;
    findBy(param: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        order: number | null;
        hoaHongId: string;
        amountPaid: number;
        paymentMethod: string | null;
        paymentDate: Date;
    } | {
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            order: number | null;
            hoaHongId: string;
            amountPaid: number;
            paymentMethod: string | null;
            paymentDate: Date;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(query: any): Promise<{
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            order: number | null;
            hoaHongId: string;
            amountPaid: number;
            paymentMethod: string | null;
            paymentDate: Date;
        }[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        order: number | null;
        hoaHongId: string;
        amountPaid: number;
        paymentMethod: string | null;
        paymentDate: Date;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        order: number | null;
        hoaHongId: string;
        amountPaid: number;
        paymentMethod: string | null;
        paymentDate: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        order: number | null;
        hoaHongId: string;
        amountPaid: number;
        paymentMethod: string | null;
        paymentDate: Date;
    }>;
    reorderThanhtoanhoahongs(thanhtoanhoahongIds: string[]): Promise<{
        status: string;
    }>;
}
