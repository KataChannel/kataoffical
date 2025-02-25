import { PhieukhoService } from './phieukho.service';
export declare class PhieukhoController {
    private readonly phieukhoService;
    constructor(phieukhoService: PhieukhoService);
    create(createPhieukhoDto: any): Promise<{
        sanpham: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            soluong: number;
            ghichu: string | null;
            sanphamId: string;
            sldat: number;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        ghichu: string | null;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }>;
    findAll(): Promise<({
        kho: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            ghichu: string | null;
            diachi: string | null;
            sdt: string | null;
            makho: string | null;
            congtyId: string | null;
        };
        sanpham: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            soluong: number;
            ghichu: string | null;
            sanphamId: string;
            sldat: number;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        ghichu: string | null;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    })[]>;
    findOne(id: string): Promise<{
        kho: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            isActive: boolean;
            ghichu: string | null;
            diachi: string | null;
            sdt: string | null;
            makho: string | null;
            congtyId: string | null;
        };
        sanpham: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            soluong: number;
            ghichu: string | null;
            sanphamId: string;
            sldat: number;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        ghichu: string | null;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }>;
    update(id: string, updatePhieukhoDto: any): Promise<{
        sanpham: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            soluong: number;
            ghichu: string | null;
            sanphamId: string;
            sldat: number;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        ghichu: string | null;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        ghichu: string | null;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }>;
}
