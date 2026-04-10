import { ChotkhoService } from './chotkho.service';
export declare class ChotkhoController {
    private readonly chotkhoService;
    constructor(chotkhoService: ChotkhoService);
    create(data: any): Promise<{
        success: boolean;
        message: string;
        data: ({
            user: {
                id: string;
                email: string | null;
                profile: {
                    name: string;
                } | null;
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
                userId: string | null;
                sanphamId: string | null;
                ngaychot: Date;
                sltonthucte: import("@prisma/client/runtime/library").Decimal;
                sltonhethong: import("@prisma/client/runtime/library").Decimal;
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
            userId: string | null;
            codeId: string | null;
            khoId: string | null;
            ngaychot: Date;
        }) | null;
    }>;
    getTraceLog(id: string, sanphamId: string): Promise<{
        initialQty: number;
        lastClosingDate: Date;
        currentCalc: number;
        history: any[];
    }>;
    getAllProductsByKho(khoId: string): Promise<any[]>;
    findOne(id: string): Promise<({
        user: {
            id: string;
            email: string | null;
            profile: {
                name: string;
            } | null;
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
            userId: string | null;
            sanphamId: string | null;
            ngaychot: Date;
            sltonthucte: import("@prisma/client/runtime/library").Decimal;
            sltonhethong: import("@prisma/client/runtime/library").Decimal;
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
        userId: string | null;
        codeId: string | null;
        khoId: string | null;
        ngaychot: Date;
    }) | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: ({
            user: {
                id: string;
                email: string | null;
                profile: {
                    name: string;
                } | null;
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
                userId: string | null;
                sanphamId: string | null;
                ngaychot: Date;
                sltonthucte: import("@prisma/client/runtime/library").Decimal;
                sltonhethong: import("@prisma/client/runtime/library").Decimal;
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
            userId: string | null;
            codeId: string | null;
            khoId: string | null;
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
            id: string;
            email: string | null;
            profile: {
                name: string;
            } | null;
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
            userId: string | null;
            sanphamId: string | null;
            ngaychot: Date;
            sltonthucte: import("@prisma/client/runtime/library").Decimal;
            sltonhethong: import("@prisma/client/runtime/library").Decimal;
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
        userId: string | null;
        codeId: string | null;
        khoId: string | null;
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
        userId: string | null;
        codeId: string | null;
        khoId: string | null;
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
        userId: string | null;
        codeId: string | null;
        khoId: string | null;
        ngaychot: Date;
    }>;
}
