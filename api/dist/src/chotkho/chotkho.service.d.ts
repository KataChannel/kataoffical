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
    getPendingOrders(khoId: string): Promise<({
        sanpham: ({
            sanpham: {
                id: string;
                title: string;
                ghichu: string | null;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                vat: Decimal | null;
                subtitle: string | null;
                giaban: Decimal;
                title2: string | null;
                slug: string | null;
                masp: string;
                giagoc: Decimal;
                dvt: string | null;
                hinhanh: string | null;
                loadpoint: Decimal | null;
                soluong: Decimal | null;
                soluongkho: Decimal | null;
                haohut: Decimal;
            };
        } & {
            id: string;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            idSP: string;
            sldat: Decimal;
            slgiao: Decimal;
            slnhan: Decimal;
            slhuy: Decimal;
            ttdat: Decimal;
            ttgiao: Decimal;
            ttnhan: Decimal;
            dathangId: string;
            gianhap: Decimal;
        })[];
        nhacungcap: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            isshowvat: boolean;
            name: string | null;
            diachi: string | null;
            sdt: string | null;
            email: string | null;
            tenfile: string | null;
            mancc: string;
            manccold: string | null;
        } | null;
    } & {
        id: string;
        title: string | null;
        type: string | null;
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        printCount: number | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date | null;
        lydohuy: string | null;
        khoId: string | null;
        subtitle: string | null;
        madncc: string | null;
        ngaynhan: Date | null;
        ngaynhanEnd: Date | null;
        nhacungcapId: string | null;
    })[]>;
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
    getAllProducts(): Promise<any[]>;
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
