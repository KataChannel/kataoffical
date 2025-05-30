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
        createdAt: Date;
        updatedAt: Date;
        affiliateCode: string | null;
        userId: string;
        order: number | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        affiliateLinkId: string | null;
        dichvuId: string;
        originalAmount: number;
        discountAmount: number | null;
        actualAmount: number;
    }>;
    syncsdoanhso(param: any): Promise<{
        success: number;
        failure: number;
    }>;
    findBy(param: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        affiliateCode: string | null;
        userId: string;
        order: number | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        affiliateLinkId: string | null;
        dichvuId: string;
        originalAmount: number;
        discountAmount: number | null;
        actualAmount: number;
    } | {
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            affiliateCode: string | null;
            userId: string;
            order: number | null;
            status: import(".prisma/client").$Enums.OrderStatus;
            affiliateLinkId: string | null;
            dichvuId: string;
            originalAmount: number;
            discountAmount: number | null;
            actualAmount: number;
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
            affiliateCode: string | null;
            userId: string;
            order: number | null;
            status: import(".prisma/client").$Enums.OrderStatus;
            affiliateLinkId: string | null;
            dichvuId: string;
            originalAmount: number;
            discountAmount: number | null;
            actualAmount: number;
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
        affiliateCode: string | null;
        userId: string;
        order: number | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        affiliateLinkId: string | null;
        dichvuId: string;
        originalAmount: number;
        discountAmount: number | null;
        actualAmount: number;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        affiliateCode: string | null;
        userId: string;
        order: number | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        affiliateLinkId: string | null;
        dichvuId: string;
        originalAmount: number;
        discountAmount: number | null;
        actualAmount: number;
    }>;
    reorderDoanhsos(doanhsoIds: string[]): Promise<{
        status: string;
    }>;
}
