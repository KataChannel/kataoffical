import { DoanhsoService } from './doanhso.service';
export declare class DoanhsoController {
    private readonly doanhsoService;
    constructor(doanhsoService: DoanhsoService);
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
    findby(param: any): Promise<{
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
    findAll(page?: string, limit?: string): Promise<{
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
    getLastUpdatedDoanhso(): Promise<{
        updatedAt: number;
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
    reorder(body: {
        doanhsoIds: string[];
    }): Promise<{
        status: string;
    }>;
}
