import { ChotkhoService } from './chotkho.service';
export declare class ChotkhoResolver {
    private readonly chotkhoService;
    constructor(chotkhoService: ChotkhoService);
    findMany(page?: number, limit?: number): Promise<{
        data: ({
            kho: {
                id: string;
                name: string;
                makho: string | null;
            } | null;
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
                giaGocSnapshot: import("@prisma/client/runtime/library").Decimal;
                giaTriChenhLech: import("@prisma/client/runtime/library").Decimal;
                giaTriHuy: import("@prisma/client/runtime/library").Decimal;
                isEstimated: boolean;
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
            isLocked: boolean;
            lockedAt: Date | null;
            lockedBy: string | null;
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
        kho: {
            id: string;
            name: string;
            makho: string | null;
        } | null;
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
            giaGocSnapshot: import("@prisma/client/runtime/library").Decimal;
            giaTriChenhLech: import("@prisma/client/runtime/library").Decimal;
            giaTriHuy: import("@prisma/client/runtime/library").Decimal;
            isEstimated: boolean;
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
        isLocked: boolean;
        lockedAt: Date | null;
        lockedBy: string | null;
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
            kho: {
                id: string;
                name: string;
                makho: string | null;
            } | null;
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
                giaGocSnapshot: import("@prisma/client/runtime/library").Decimal;
                giaTriChenhLech: import("@prisma/client/runtime/library").Decimal;
                giaTriHuy: import("@prisma/client/runtime/library").Decimal;
                isEstimated: boolean;
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
            isLocked: boolean;
            lockedAt: Date | null;
            lockedBy: string | null;
            ngaychot: Date;
        }) | null;
        warnings: any[];
    }>;
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
        isLocked: boolean;
        lockedAt: Date | null;
        lockedBy: string | null;
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
        isLocked: boolean;
        lockedAt: Date | null;
        lockedBy: string | null;
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
            kho: {
                id: string;
                name: string;
                makho: string | null;
            } | null;
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
                giaGocSnapshot: import("@prisma/client/runtime/library").Decimal;
                giaTriChenhLech: import("@prisma/client/runtime/library").Decimal;
                giaTriHuy: import("@prisma/client/runtime/library").Decimal;
                isEstimated: boolean;
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
            isLocked: boolean;
            lockedAt: Date | null;
            lockedBy: string | null;
            ngaychot: Date;
        })[];
        pagination: {
            current: any;
            pageSize: any;
            total: number;
            totalPages: number;
        };
    }>;
    lock(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
        data: {
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
            isLocked: boolean;
            lockedAt: Date | null;
            lockedBy: string | null;
            ngaychot: Date;
        };
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    unlock(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
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
            isLocked: boolean;
            lockedAt: Date | null;
            lockedBy: string | null;
            ngaychot: Date;
        };
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    getScrapReport(filters?: {
        khoId?: string;
        fromDate?: string;
        toDate?: string;
    }): Promise<{
        id: string;
        ngay: Date | undefined;
        kho: string | undefined;
        sanpham: string | undefined;
        masp: string | undefined;
        slhuy: number;
        giaGoc: number;
        giaTriHuy: number;
        nguoiChot: string | null | undefined;
        ghichu: string | null;
    }[]>;
    getDailyInventorySummary(khoId: string, date?: string): Promise<{
        tonDau?: number | undefined;
        nhap?: number | undefined;
        xuat?: number | undefined;
        tonHienTai?: number | undefined;
        id: string;
        title: string;
        masp: string;
        dvt: string | null;
    }[]>;
}
