import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from '../importdata/importdata.service';
export declare class PhieukhoService {
    private readonly prisma;
    private _ImportdataService;
    constructor(prisma: PrismaService, _ImportdataService: ImportdataService);
    private formatDateForFilename;
    generateNextOrderCode(type: any): Promise<string>;
    private incrementOrderCode;
    private incrementLetters;
    xuatnhapton(query: any): Promise<{
        khoname: string;
        maphieu: string | null;
        ngay: Date | null;
        type: string | null;
        sanpham: {
            id: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
            title: string;
        }[];
    }[]>;
    findAll(): Promise<({
        kho: {
            id: string;
            name: string;
        } | null;
        tuKho: {
            id: string;
            name: string;
        } | null;
        denKho: {
            id: string;
            name: string;
        } | null;
        sanpham: {
            id: string;
            ghichu: string | null;
            sanpham: {
                id: string;
                title: string;
                masp: string;
            };
            soluong: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        title: string | null;
        maphieu: string | null;
        madonhang: string | null;
        madncc: string | null;
        madathang: string | null;
        ngay: Date | null;
        type: string | null;
        khoId: string | null;
        tuKhoId: string | null;
        denKhoId: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        isChotkho: boolean;
    })[]>;
    findByRange(start: string, end: string): Promise<({
        kho: {
            id: string;
            name: string;
        } | null;
        tuKho: {
            id: string;
            name: string;
        } | null;
        denKho: {
            id: string;
            name: string;
        } | null;
        sanpham: {
            id: string;
            ghichu: string | null;
            sanpham: {
                id: string;
                title: string;
                masp: string;
            };
            soluong: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        title: string | null;
        maphieu: string | null;
        madonhang: string | null;
        madncc: string | null;
        madathang: string | null;
        ngay: Date | null;
        type: string | null;
        khoId: string | null;
        tuKhoId: string | null;
        denKhoId: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        isChotkho: boolean;
    })[]>;
    findOne(id: string): Promise<{
        kho: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            makho: string | null;
            diachi: string | null;
            sdt: string | null;
            congtyId: string | null;
        } | null;
        sanpham: {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            phieuKhoId: string;
            sanphamId: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        title: string | null;
        maphieu: string | null;
        madonhang: string | null;
        madncc: string | null;
        madathang: string | null;
        ngay: Date | null;
        type: string | null;
        khoId: string | null;
        tuKhoId: string | null;
        denKhoId: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        isChotkho: boolean;
    }>;
    create(data: any): Promise<{
        sanpham: {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            phieuKhoId: string;
            sanphamId: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        title: string | null;
        maphieu: string | null;
        madonhang: string | null;
        madncc: string | null;
        madathang: string | null;
        ngay: Date | null;
        type: string | null;
        khoId: string | null;
        tuKhoId: string | null;
        denKhoId: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        isChotkho: boolean;
    }>;
    update(id: string, data: any): Promise<{
        sanpham: {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            phieuKhoId: string;
            sanphamId: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        title: string | null;
        maphieu: string | null;
        madonhang: string | null;
        madncc: string | null;
        madathang: string | null;
        ngay: Date | null;
        type: string | null;
        khoId: string | null;
        tuKhoId: string | null;
        denKhoId: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        isChotkho: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        maphieu: string | null;
        madonhang: string | null;
        madncc: string | null;
        madathang: string | null;
        ngay: Date | null;
        type: string | null;
        khoId: string | null;
        tuKhoId: string | null;
        denKhoId: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        isChotkho: boolean;
    }>;
    createAdjustmentPhieuKho(data: {
        type: 'nhap' | 'xuat';
        sanphamId: string;
        soluong: number;
        ghichu: string;
        khoId: string;
        chothkhoId?: string;
    }): Promise<{
        success: boolean;
        phieukho?: any;
        message?: string;
    }>;
    private updateTonKhoSafely;
    private calculateInitialTonKhoValue;
}
