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
            sldat: number;
            soluong: number;
        }[];
    } & {
        id: string;
        maphieu: string;
        ngay: Date;
        type: string;
        khoId: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        sanpham: {
            sanpham: {
                id: string;
                ghichu: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                soluong: number;
                title: string;
                slug: string | null;
                masp: string;
                giagoc: number;
                dvt: string | null;
                hinhanh: string | null;
                soluongkho: number;
                haohut: number;
                order: number | null;
            };
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            phieuKhoId: string;
            sanphamId: string;
            sldat: number;
            soluong: number;
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
        };
        id: string;
        maphieu: string;
        ngay: Date;
        type: string;
        khoId: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    xuatnhapton(query: any): Promise<{
        khoname: string;
        maphieu: string;
        ngay: Date;
        type: string;
        sanpham: {
            sldat: number;
            soluong: number;
            title: string;
        }[];
    }[]>;
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
        };
        sanpham: {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            phieuKhoId: string;
            sanphamId: string;
            sldat: number;
            soluong: number;
        }[];
    } & {
        id: string;
        maphieu: string;
        ngay: Date;
        type: string;
        khoId: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updatePhieukhoDto: any): Promise<{
        sanpham: {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            phieuKhoId: string;
            sanphamId: string;
            sldat: number;
            soluong: number;
        }[];
    } & {
        id: string;
        maphieu: string;
        ngay: Date;
        type: string;
        khoId: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        maphieu: string;
        ngay: Date;
        type: string;
        khoId: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
