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
            sanphamId: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        type: string | null;
        madonhang: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        madncc: string | null;
        khoId: string | null;
        maphieu: string | null;
        madathang: string | null;
        ngay: Date | null;
        isChotkho: boolean;
    }>;
    findAll(): Promise<({
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
        kho: {
            id: string;
            name: string;
        } | null;
    } & {
        id: string;
        title: string | null;
        type: string | null;
        madonhang: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        madncc: string | null;
        khoId: string | null;
        maphieu: string | null;
        madathang: string | null;
        ngay: Date | null;
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
        sanpham: {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
            phieuKhoId: string;
        }[];
        kho: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            diachi: string | null;
            sdt: string | null;
            makho: string | null;
            congtyId: string | null;
        } | null;
    } & {
        id: string;
        title: string | null;
        type: string | null;
        madonhang: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        madncc: string | null;
        khoId: string | null;
        maphieu: string | null;
        madathang: string | null;
        ngay: Date | null;
        isChotkho: boolean;
    }>;
    update(id: string, updatePhieukhoDto: any): Promise<{
        sanpham: {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        type: string | null;
        madonhang: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        madncc: string | null;
        khoId: string | null;
        maphieu: string | null;
        madathang: string | null;
        ngay: Date | null;
        isChotkho: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        type: string | null;
        madonhang: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        madncc: string | null;
        khoId: string | null;
        maphieu: string | null;
        madathang: string | null;
        ngay: Date | null;
        isChotkho: boolean;
    }>;
}
