import { ChotkhoService } from './chotkho.service';
export declare class ChotkhoController {
    private readonly chotkhoService;
    constructor(chotkhoService: ChotkhoService);
    create(data: any): Promise<{
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
    getTraceLog(id: string, sanphamId: string): Promise<{
        initialQty: number;
        lastClosingDate: Date;
        currentCalc: number;
        history: any[];
    }>;
    getProductTimeline(sanphamId: string, khoId: string, fromDate: string, toDate: string): Promise<{
        startQty: number;
        timeline: any[];
    }>;
    getAllProductsByKho(khoId: string): Promise<any[]>;
    getNegativeStockReport(): Promise<{
        latestChotkho: null;
        products: never[];
    } | {
        latestChotkho: {
            id: string;
            title: string | null;
            ngaychot: Date;
        };
        products: any[];
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
    findAll(page?: string, limit?: string): Promise<{
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
                vat: import("@prisma/client/runtime/library").Decimal | null;
                subtitle: string | null;
                giaban: import("@prisma/client/runtime/library").Decimal;
                title2: string | null;
                slug: string | null;
                masp: string;
                giagoc: import("@prisma/client/runtime/library").Decimal;
                dvt: string | null;
                hinhanh: string | null;
                loadpoint: import("@prisma/client/runtime/library").Decimal | null;
                soluong: import("@prisma/client/runtime/library").Decimal | null;
                soluongkho: import("@prisma/client/runtime/library").Decimal | null;
                haohut: import("@prisma/client/runtime/library").Decimal;
            };
        } & {
            id: string;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            idSP: string;
            sldat: import("@prisma/client/runtime/library").Decimal;
            slgiao: import("@prisma/client/runtime/library").Decimal;
            slnhan: import("@prisma/client/runtime/library").Decimal;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            ttdat: import("@prisma/client/runtime/library").Decimal;
            ttgiao: import("@prisma/client/runtime/library").Decimal;
            ttnhan: import("@prisma/client/runtime/library").Decimal;
            dathangId: string;
            gianhap: import("@prisma/client/runtime/library").Decimal;
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
}
