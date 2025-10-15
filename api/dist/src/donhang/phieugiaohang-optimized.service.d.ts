import { PrismaService } from '../../prisma/prisma.service';
export declare class PhieuGiaoHangOptimizedService {
    private prisma;
    private readonly logger;
    private readonly BATCH_SIZE;
    private readonly TRANSACTION_TIMEOUT;
    constructor(prisma: PrismaService);
    updatePhieugiaoOptimized(id: string, data: any): Promise<{
        khachhang: {
            id: string;
            subtitle: string | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            name: string | null;
            diachi: string | null;
            sdt: string | null;
            namenn: string | null;
            makh: string;
            makhold: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
            hiengia: boolean;
            istitle2: boolean;
            tenfile: string | null;
            tenkh: string | null;
            banggiaId: string | null;
            isshowvat: boolean;
        } | null;
        sanpham: ({
            sanpham: {
                id: string;
                title: string;
                title2: string | null;
                slug: string | null;
                masp: string;
                subtitle: string | null;
                giagoc: import("@prisma/client/runtime/library").Decimal;
                dvt: string | null;
                hinhanh: string | null;
                loadpoint: import("@prisma/client/runtime/library").Decimal | null;
                soluong: import("@prisma/client/runtime/library").Decimal | null;
                soluongkho: import("@prisma/client/runtime/library").Decimal | null;
                haohut: import("@prisma/client/runtime/library").Decimal;
                ghichu: string | null;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                giaban: import("@prisma/client/runtime/library").Decimal;
                vat: import("@prisma/client/runtime/library").Decimal | null;
            };
        } & {
            id: string;
            ghichu: string | null;
            order: number | null;
            isActive: boolean | null;
            giaban: import("@prisma/client/runtime/library").Decimal;
            vat: import("@prisma/client/runtime/library").Decimal;
            idSP: string;
            sldat: import("@prisma/client/runtime/library").Decimal;
            slgiao: import("@prisma/client/runtime/library").Decimal;
            slnhan: import("@prisma/client/runtime/library").Decimal;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            ttdat: import("@prisma/client/runtime/library").Decimal;
            ttgiao: import("@prisma/client/runtime/library").Decimal;
            ttnhan: import("@prisma/client/runtime/library").Decimal;
            donhangId: string;
            ttsauvat: import("@prisma/client/runtime/library").Decimal;
        })[];
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        vat: import("@prisma/client/runtime/library").Decimal;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        banggiaId: string | null;
        isshowvat: boolean;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string | null;
        printCount: number | null;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
        lydohuy: string | null;
    }>;
    updateBulkOptimized(ids: string[], status: string): Promise<{
        success: number;
        fail: number;
    }>;
    private processBatch;
    healthCheck(): Promise<{
        status: string;
        duration: number;
        pendingOrders: number;
        timestamp: string;
        error?: undefined;
    } | {
        status: string;
        duration: number;
        error: any;
        timestamp: string;
        pendingOrders?: undefined;
    }>;
}
