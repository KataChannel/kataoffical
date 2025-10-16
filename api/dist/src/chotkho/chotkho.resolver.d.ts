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
                order: number | null;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                sanphamId: string | null;
                userId: string | null;
                slhuy: import("@prisma/client/runtime/library").Decimal;
                ngaychot: Date;
                sltonhethong: import("@prisma/client/runtime/library").Decimal;
                sltonthucte: import("@prisma/client/runtime/library").Decimal;
                chenhlech: import("@prisma/client/runtime/library").Decimal;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            order: number | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            khoId: string | null;
            userId: string | null;
            ngaychot: Date;
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
            order: number | null;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string | null;
            userId: string | null;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            ngaychot: Date;
            sltonhethong: import("@prisma/client/runtime/library").Decimal;
            sltonthucte: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal;
            chotkhoId: string | null;
        })[];
    } & {
        id: string;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        khoId: string | null;
        userId: string | null;
        ngaychot: Date;
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
                order: number | null;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                sanphamId: string | null;
                userId: string | null;
                slhuy: import("@prisma/client/runtime/library").Decimal;
                ngaychot: Date;
                sltonhethong: import("@prisma/client/runtime/library").Decimal;
                sltonthucte: import("@prisma/client/runtime/library").Decimal;
                chenhlech: import("@prisma/client/runtime/library").Decimal;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            order: number | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            khoId: string | null;
            userId: string | null;
            ngaychot: Date;
        }) | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        khoId: string | null;
        userId: string | null;
        ngaychot: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        khoId: string | null;
        userId: string | null;
        ngaychot: Date;
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
                order: number | null;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                sanphamId: string | null;
                userId: string | null;
                slhuy: import("@prisma/client/runtime/library").Decimal;
                ngaychot: Date;
                sltonhethong: import("@prisma/client/runtime/library").Decimal;
                sltonthucte: import("@prisma/client/runtime/library").Decimal;
                chenhlech: import("@prisma/client/runtime/library").Decimal;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            order: number | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            khoId: string | null;
            userId: string | null;
            ngaychot: Date;
        })[];
        pagination: {
            current: any;
            pageSize: any;
            total: number;
            totalPages: number;
        };
    }>;
}
