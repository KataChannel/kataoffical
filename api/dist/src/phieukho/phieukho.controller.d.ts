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
            sldat: number;
            soluong: number;
            sanphamId: string;
            phieuKhoId: string;
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
    findAll(): Promise<({
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
            sldat: number;
            soluong: number;
            sanphamId: string;
            phieuKhoId: string;
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
        };
        sanpham: {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sldat: number;
            soluong: number;
            sanphamId: string;
            phieuKhoId: string;
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
            sldat: number;
            soluong: number;
            sanphamId: string;
            phieuKhoId: string;
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
