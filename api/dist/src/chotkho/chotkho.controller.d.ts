import { ChotkhoService } from './chotkho.service';
export declare class ChotkhoController {
    private readonly chotkhoService;
    constructor(chotkhoService: ChotkhoService);
    create(data: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            totalProducts: number;
            totalDifference: number;
            records: any[];
        };
    }>;
    getAllProductsByKho(khoId: string): Promise<any[]>;
    findOne(id: string): Promise<({
        sanpham: {
            id: string;
            title: string;
            masp: string;
        } | null;
        kho: {
            id: string;
            name: string;
        } | null;
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        khoId: string | null;
        sanphamId: string | null;
        userId: string | null;
        slhuy: import("@prisma/client/runtime/library").Decimal;
        ngaychot: Date;
        sltonhethong: import("@prisma/client/runtime/library").Decimal;
        sltonthucte: import("@prisma/client/runtime/library").Decimal;
        chenhlech: import("@prisma/client/runtime/library").Decimal;
    }) | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: ({
            sanpham: {
                id: string;
                title: string;
                masp: string;
            } | null;
            kho: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            khoId: string | null;
            sanphamId: string | null;
            userId: string | null;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            ngaychot: Date;
            sltonhethong: import("@prisma/client/runtime/library").Decimal;
            sltonthucte: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal;
        })[];
        pagination: {
            current: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        khoId: string | null;
        sanphamId: string | null;
        userId: string | null;
        slhuy: import("@prisma/client/runtime/library").Decimal;
        ngaychot: Date;
        sltonhethong: import("@prisma/client/runtime/library").Decimal;
        sltonthucte: import("@prisma/client/runtime/library").Decimal;
        chenhlech: import("@prisma/client/runtime/library").Decimal;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        khoId: string | null;
        sanphamId: string | null;
        userId: string | null;
        slhuy: import("@prisma/client/runtime/library").Decimal;
        ngaychot: Date;
        sltonhethong: import("@prisma/client/runtime/library").Decimal;
        sltonthucte: import("@prisma/client/runtime/library").Decimal;
        chenhlech: import("@prisma/client/runtime/library").Decimal;
    }>;
}
