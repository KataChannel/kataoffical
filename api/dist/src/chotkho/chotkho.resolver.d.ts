import { ChotkhoService } from './chotkho.service';
export declare class ChotkhoResolver {
    private readonly chotkhoService;
    constructor(chotkhoService: ChotkhoService);
    findMany(page?: number, limit?: number): Promise<{
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
    getProductsByWarehouse(khoId: string): Promise<any[]>;
    getAllProducts(): Promise<any[]>;
    getAllWarehouses(): Promise<any[]>;
    create(data: {
        ngaychot?: Date;
        title?: string;
        ghichu?: string;
        khoId: string;
        userId?: string;
        details: Array<{
            sanphamId: string;
            sltonhethong: number;
            sltonthucte: number;
            slhuy: number;
            ghichu?: string;
        }>;
    }): Promise<{
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
    search(filters?: {
        khoId?: string;
        sanphamId?: string;
        fromDate?: string;
        toDate?: string;
        page?: number;
        limit?: number;
    }): Promise<{
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
            current: any;
            pageSize: any;
            total: number;
            totalPages: number;
        };
    }>;
}
