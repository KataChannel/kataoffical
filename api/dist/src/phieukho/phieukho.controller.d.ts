import { PhieukhoService } from './phieukho.service';
export declare class PhieukhoController {
    private readonly phieukhoService;
    constructor(phieukhoService: PhieukhoService);
    create(createPhieukhoDto: any): Promise<any>;
    findAll(): Promise<{
        sanpham: {
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
            id: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            phieuKhoId: string;
        }[];
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
        id: string;
        title: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        madonhang: string | null;
        madncc: string | null;
        khoId: string | null;
        maphieu: string | null;
        madathang: string | null;
        ngay: Date | null;
        isChotkho: boolean;
    }[]>;
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
            soluong: import("@prisma/client/runtime/library").Decimal;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            phieuKhoId: string;
        }[];
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
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        madonhang: string | null;
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
            soluong: import("@prisma/client/runtime/library").Decimal;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        madonhang: string | null;
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
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        madonhang: string | null;
        madncc: string | null;
        khoId: string | null;
        maphieu: string | null;
        madathang: string | null;
        ngay: Date | null;
        isChotkho: boolean;
    }>;
}
