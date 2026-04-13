import { PhieukhoService } from './phieukho.service';
export declare class PhieukhoController {
    private readonly phieukhoService;
    constructor(phieukhoService: PhieukhoService);
    create(createPhieukhoDto: any): Promise<{
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
    createAdjustment(data: {
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
    update(id: string, updatePhieukhoDto: any): Promise<{
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
    getNextCode(type: string): Promise<string>;
}
