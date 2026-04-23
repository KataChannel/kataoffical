import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { NotificationService } from '../notification/notification.service';
export declare class ChotkhoService {
    private prisma;
    private notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    calculateStockFromLogs(sanphamId: string, khoId: string, endTime?: Date, tx?: any): Promise<{
        initialQty: number;
        lastClosingDate: Date;
        currentCalc: number;
        history: any[];
    }>;
    getTraceLog(chotkhoId: string, sanphamId: string): Promise<{
        initialQty: number;
        lastClosingDate: Date;
        currentCalc: number;
        history: any[];
    }>;
    create(inventoryData: {
        ngaychot?: Date;
        title?: string;
        ghichu?: string;
        khoId: string;
        userId?: string;
        confirmOrderIds?: string[];
        details: Array<{
            sanphamId: string;
            sltonhethong: number;
            sltonthucte: number;
            slhuy: number;
            isEstimated?: boolean;
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
                slhuy: Decimal;
                userId: string | null;
                sanphamId: string | null;
                ngaychot: Date;
                sltonthucte: Decimal;
                sltonhethong: Decimal;
                chenhlech: Decimal;
                giaGocSnapshot: Decimal;
                giaTriChenhLech: Decimal;
                giaTriHuy: Decimal;
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
    getAllProductsByKho(khoId: string): Promise<any[]>;
    getAllKho(): Promise<any[]>;
    getScrapReport(filters: any): Promise<{
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
    getAllProducts(): Promise<any[]>;
    getDailyInventorySummary(khoId: string, date?: Date): Promise<{
        tonDau?: number | undefined;
        nhap?: number | undefined;
        xuat?: number | undefined;
        tonHienTai?: number | undefined;
        id: string;
        title: string;
        masp: string;
        dvt: string | null;
    }[]>;
    findAll(page?: number, limit?: number): Promise<{
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
                slhuy: Decimal;
                userId: string | null;
                sanphamId: string | null;
                ngaychot: Date;
                sltonthucte: Decimal;
                sltonhethong: Decimal;
                chenhlech: Decimal;
                giaGocSnapshot: Decimal;
                giaTriChenhLech: Decimal;
                giaTriHuy: Decimal;
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
            slhuy: Decimal;
            userId: string | null;
            sanphamId: string | null;
            ngaychot: Date;
            sltonthucte: Decimal;
            sltonhethong: Decimal;
            chenhlech: Decimal;
            giaGocSnapshot: Decimal;
            giaTriChenhLech: Decimal;
            giaTriHuy: Decimal;
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
    update(id: string, updateData: any): Promise<{
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
    search(searchParams: any): Promise<{
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
                slhuy: Decimal;
                userId: string | null;
                sanphamId: string | null;
                ngaychot: Date;
                sltonthucte: Decimal;
                sltonhethong: Decimal;
                chenhlech: Decimal;
                giaGocSnapshot: Decimal;
                giaTriChenhLech: Decimal;
                giaTriHuy: Decimal;
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
    updateChotkhoWithDetails(id: string, data: {
        ngaychot?: Date;
        title?: string;
        ghichu?: string;
        isActive?: boolean;
        details?: Array<{
            sanphamId: string;
            sltonhethong: number;
            sltonthucte: number;
            slhuy: number;
            isEstimated?: boolean;
            ghichu?: string;
        }>;
    }): Promise<({
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
            slhuy: Decimal;
            userId: string | null;
            sanphamId: string | null;
            ngaychot: Date;
            sltonthucte: Decimal;
            sltonhethong: Decimal;
            chenhlech: Decimal;
            giaGocSnapshot: Decimal;
            giaTriChenhLech: Decimal;
            giaTriHuy: Decimal;
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
}
