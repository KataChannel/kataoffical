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
                ngaychot: Date;
                title: string | null;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                order: number | null;
                userId: string | null;
                sltonhethong: import("@prisma/client/runtime/library").Decimal;
                sltonthucte: import("@prisma/client/runtime/library").Decimal;
                slhuy: import("@prisma/client/runtime/library").Decimal;
                chenhlech: import("@prisma/client/runtime/library").Decimal;
                sanphamId: string | null;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            ngaychot: Date;
            title: string | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            order: number | null;
            khoId: string | null;
            userId: string | null;
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
            ngaychot: Date;
            title: string | null;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            userId: string | null;
            sltonhethong: import("@prisma/client/runtime/library").Decimal;
            sltonthucte: import("@prisma/client/runtime/library").Decimal;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal;
            sanphamId: string | null;
            chotkhoId: string | null;
        })[];
    } & {
        id: string;
        ngaychot: Date;
        title: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        order: number | null;
        khoId: string | null;
        userId: string | null;
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
                ngaychot: Date;
                title: string | null;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                order: number | null;
                userId: string | null;
                sltonhethong: import("@prisma/client/runtime/library").Decimal;
                sltonthucte: import("@prisma/client/runtime/library").Decimal;
                slhuy: import("@prisma/client/runtime/library").Decimal;
                chenhlech: import("@prisma/client/runtime/library").Decimal;
                sanphamId: string | null;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            ngaychot: Date;
            title: string | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            order: number | null;
            khoId: string | null;
            userId: string | null;
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
            ngaychot: Date;
            title: string | null;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            userId: string | null;
            sltonhethong: import("@prisma/client/runtime/library").Decimal;
            sltonthucte: import("@prisma/client/runtime/library").Decimal;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal;
            sanphamId: string | null;
            chotkhoId: string | null;
        })[];
    } & {
        id: string;
        ngaychot: Date;
        title: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        order: number | null;
        khoId: string | null;
        userId: string | null;
    }) | null>;
    update(id: string, data: any): Promise<{
        id: string;
        ngaychot: Date;
        title: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        order: number | null;
        khoId: string | null;
        userId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        ngaychot: Date;
        title: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        order: number | null;
        khoId: string | null;
        userId: string | null;
    }>;
}
