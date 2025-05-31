import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class DoanhsoService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedDoanhso(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        codeId: string | null;
        userId: string;
        dichvuId: string;
        originalAmount: number;
        discountAmount: number | null;
        actualAmount: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        affiliateCode: string | null;
        affiliateLinkId: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
    }>;
    syncsdoanhso(param: any): Promise<{
        success: number;
        failure: number;
    }>;
    findBy(param: any): Promise<{
        id: string;
        codeId: string | null;
        userId: string;
        dichvuId: string;
        originalAmount: number;
        discountAmount: number | null;
        actualAmount: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        affiliateCode: string | null;
        affiliateLinkId: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
    } | {
        data: {
            id: string;
            codeId: string | null;
            userId: string;
            dichvuId: string;
            originalAmount: number;
            discountAmount: number | null;
            actualAmount: number;
            status: import(".prisma/client").$Enums.OrderStatus;
            affiliateCode: string | null;
            affiliateLinkId: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            codeId: string | null;
            userId: string;
            dichvuId: string;
            originalAmount: number;
            discountAmount: number | null;
            actualAmount: number;
            status: import(".prisma/client").$Enums.OrderStatus;
            affiliateCode: string | null;
            affiliateLinkId: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        codeId: string | null;
        userId: string;
        dichvuId: string;
        originalAmount: number;
        discountAmount: number | null;
        actualAmount: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        affiliateCode: string | null;
        affiliateLinkId: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        codeId: string | null;
        userId: string;
        dichvuId: string;
        originalAmount: number;
        discountAmount: number | null;
        actualAmount: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        affiliateCode: string | null;
        affiliateLinkId: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
    }>;
    reorderDoanhsos(doanhsoIds: string[]): Promise<{
        status: string;
    }>;
}
