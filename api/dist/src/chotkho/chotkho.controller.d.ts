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
                profile: {
                    name: string;
                } | null;
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
                ngaychot: Date;
                sltonhethong: import("@prisma/client/runtime/library").Decimal;
                sltonthucte: import("@prisma/client/runtime/library").Decimal;
                slhuy: import("@prisma/client/runtime/library").Decimal;
                chenhlech: import("@prisma/client/runtime/library").Decimal;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                order: number | null;
                sanphamId: string | null;
                chotkhoId: string | null;
                userId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            ngaychot: Date;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            userId: string | null;
            khoId: string | null;
            isActive: boolean;
            codeId: string | null;
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
            profile: {
                name: string;
            } | null;
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
            ngaychot: Date;
            sltonhethong: import("@prisma/client/runtime/library").Decimal;
            sltonthucte: import("@prisma/client/runtime/library").Decimal;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            sanphamId: string | null;
            chotkhoId: string | null;
            userId: string | null;
        })[];
    } & {
        id: string;
        title: string | null;
        ngaychot: Date;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        userId: string | null;
        khoId: string | null;
        isActive: boolean;
        codeId: string | null;
    }) | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: ({
            user: {
                id: string;
                profile: {
                    name: string;
                } | null;
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
                ngaychot: Date;
                sltonhethong: import("@prisma/client/runtime/library").Decimal;
                sltonthucte: import("@prisma/client/runtime/library").Decimal;
                slhuy: import("@prisma/client/runtime/library").Decimal;
                chenhlech: import("@prisma/client/runtime/library").Decimal;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                order: number | null;
                sanphamId: string | null;
                chotkhoId: string | null;
                userId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            ngaychot: Date;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            userId: string | null;
            khoId: string | null;
            isActive: boolean;
            codeId: string | null;
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
            profile: {
                name: string;
            } | null;
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
            ngaychot: Date;
            sltonhethong: import("@prisma/client/runtime/library").Decimal;
            sltonthucte: import("@prisma/client/runtime/library").Decimal;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            sanphamId: string | null;
            chotkhoId: string | null;
            userId: string | null;
        })[];
    } & {
        id: string;
        title: string | null;
        ngaychot: Date;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        userId: string | null;
        khoId: string | null;
        isActive: boolean;
        codeId: string | null;
    }) | null>;
    update(id: string, data: any): Promise<{
        id: string;
        title: string | null;
        ngaychot: Date;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        userId: string | null;
        khoId: string | null;
        isActive: boolean;
        codeId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        ngaychot: Date;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        userId: string | null;
        khoId: string | null;
        isActive: boolean;
        codeId: string | null;
    }>;
}
