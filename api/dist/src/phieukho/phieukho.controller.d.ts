import { PhieukhoService } from './phieukho.service';
export declare class PhieukhoController {
    private readonly phieukhoService;
    constructor(phieukhoService: PhieukhoService);
    create(createPhieukhoDto: any): Promise<{
        sanpham: {
            id: string;
            soluong: import("@prisma/client/runtime/library").Decimal | null;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sldat: number;
            sanphamId: string;
            sltra: number;
            slhuy: number;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }>;
    findAll(): Promise<{
        sanpham: {
            sanpham: {
                id: string;
                title: string;
                title2: string | null;
                slug: string | null;
                masp: string;
                subtitle: string | null;
                giagoc: number;
                dvt: string | null;
                hinhanh: string | null;
                loadpoint: number | null;
                soluong: import("@prisma/client/runtime/library").Decimal | null;
                soluongkho: import("@prisma/client/runtime/library").Decimal | null;
                haohut: number;
                ghichu: string | null;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
            id: string;
            soluong: import("@prisma/client/runtime/library").Decimal | null;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sldat: number;
            sanphamId: string;
            sltra: number;
            slhuy: number;
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
        };
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }[]>;
    xuatnhapton(query: any): Promise<{
        id: string;
        khoname: string;
        title: string;
        slxuat: number;
        slnhap: number;
        soluong: number;
        chitiet: any[];
    }[]>;
    findOne(id: string): Promise<{
        sanpham: {
            id: string;
            soluong: import("@prisma/client/runtime/library").Decimal | null;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sldat: number;
            sanphamId: string;
            sltra: number;
            slhuy: number;
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
        };
    } & {
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }>;
    update(id: string, updatePhieukhoDto: any): Promise<{
        sanpham: {
            id: string;
            soluong: import("@prisma/client/runtime/library").Decimal | null;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sldat: number;
            sanphamId: string;
            sltra: number;
            slhuy: number;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }>;
}
