import { DoanhsoService } from './doanhso.service';
export declare class DoanhsoController {
    private readonly doanhsoService;
    constructor(doanhsoService: DoanhsoService);
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
    findby(param: any): Promise<{
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
    findAll(page?: string, limit?: string): Promise<{
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
    getLastUpdatedDoanhso(): Promise<{
        updatedAt: number;
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
    reorder(body: {
        doanhsoIds: string[];
    }): Promise<{
        status: string;
    }>;
}
