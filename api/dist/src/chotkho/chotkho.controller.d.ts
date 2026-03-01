import { ChotkhoService } from './chotkho.service';
export declare class ChotkhoController {
    private readonly chotkhoService;
    constructor(chotkhoService: ChotkhoService);
    create(data: any): Promise<{
        success: boolean;
        message: string;
        data: ({
            user: {
                profile: {
                    name: string;
                } | null;
                id: string;
                email: string | null;
            } | null;
            kho: {
                id: string;
                name: string;
                makho: string | null;
            } | null;
            details: ({
                sanpham: {
                    id: string;
                    title: string;
                    masp: string;
                } | null;
            } & {
                id: string;
                title: string | null;
                ghichu: string | null;
                order: number | null;
                createdAt: Date;
                updatedAt: Date;
                slhuy: import("@prisma/client/runtime/library").Decimal;
                sanphamId: string | null;
                userId: string | null;
                ngaychot: Date;
                sltonhethong: import("@prisma/client/runtime/library").Decimal;
                sltonthucte: import("@prisma/client/runtime/library").Decimal;
                chenhlech: import("@prisma/client/runtime/library").Decimal;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            khoId: string | null;
            userId: string | null;
            codeId: string | null;
            ngaychot: Date;
        }) | null;
    }>;
    getAllProductsByKho(khoId: string): Promise<any[]>;
    findOne(id: string): Promise<({
        user: {
            profile: {
                name: string;
            } | null;
            id: string;
            email: string | null;
        } | null;
        kho: {
            id: string;
            name: string;
            makho: string | null;
        } | null;
        details: ({
            sanpham: {
                id: string;
                title: string;
                masp: string;
            } | null;
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            sanphamId: string | null;
            userId: string | null;
            ngaychot: Date;
            sltonhethong: import("@prisma/client/runtime/library").Decimal;
            sltonthucte: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal;
            chotkhoId: string | null;
        })[];
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        codeId: string | null;
        ngaychot: Date;
    }) | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: ({
            user: {
                profile: {
                    name: string;
                } | null;
                id: string;
                email: string | null;
            } | null;
            kho: {
                id: string;
                name: string;
                makho: string | null;
            } | null;
            details: ({
                sanpham: {
                    id: string;
                    title: string;
                    masp: string;
                } | null;
            } & {
                id: string;
                title: string | null;
                ghichu: string | null;
                order: number | null;
                createdAt: Date;
                updatedAt: Date;
                slhuy: import("@prisma/client/runtime/library").Decimal;
                sanphamId: string | null;
                userId: string | null;
                ngaychot: Date;
                sltonhethong: import("@prisma/client/runtime/library").Decimal;
                sltonthucte: import("@prisma/client/runtime/library").Decimal;
                chenhlech: import("@prisma/client/runtime/library").Decimal;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            khoId: string | null;
            userId: string | null;
            codeId: string | null;
            ngaychot: Date;
        })[];
        pagination: {
            current: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    updateWithDetails(id: string, data: any): Promise<({
        user: {
            profile: {
                name: string;
            } | null;
            id: string;
            email: string | null;
        } | null;
        details: ({
            sanpham: {
                id: string;
                title: string;
                masp: string;
            } | null;
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            sanphamId: string | null;
            userId: string | null;
            ngaychot: Date;
            sltonhethong: import("@prisma/client/runtime/library").Decimal;
            sltonthucte: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal;
            chotkhoId: string | null;
        })[];
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        codeId: string | null;
        ngaychot: Date;
    }) | null>;
    update(id: string, data: any): Promise<{
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        codeId: string | null;
        ngaychot: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        codeId: string | null;
        ngaychot: Date;
    }>;
}
