import { BanggiaService } from './banggia.service';
export declare class BanggiaController {
    private readonly banggiaService;
    constructor(banggiaService: BanggiaService);
    create(createBanggiaDto: any): Promise<{
        sanpham: {
            id: string;
            isActive: boolean;
            order: number | null;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        type: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        status: string | null;
        ghichu: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    findAll(): Promise<({
        sanpham: {
            id: string;
            isActive: boolean;
            order: number | null;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        type: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        status: string | null;
        ghichu: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
    })[]>;
    addMultipleKhachhangToBanggia(data: any): Promise<{
        type: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        status: string | null;
        ghichu: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    removeKHfromBG(data: any): Promise<{
        type: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        status: string | null;
        ghichu: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    findOne(id: string): Promise<{
        sanpham: {
            giaban: number;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number | null;
            slug: string | null;
            masp: string;
            giagoc: number;
            dvt: string | null;
            hinhanh: string | null;
            soluong: number;
            soluongkho: number;
            haohut: number;
            ghichu: string | null;
        }[];
        khachhang: {
            address: string | null;
            email: string | null;
            phone: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            namenn: string | null;
            makh: string;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            loaikh: string | null;
            hiengia: boolean;
        }[];
        type: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        status: string | null;
        ghichu: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    update(id: string, updateBanggiaDto: any): Promise<{
        sanpham: {
            id: string;
            isActive: boolean;
            order: number | null;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        type: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        status: string | null;
        ghichu: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    remove(id: string): Promise<{
        type: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        status: string | null;
        ghichu: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    reorder(body: {
        banggiaIds: string[];
    }): Promise<void>;
}
