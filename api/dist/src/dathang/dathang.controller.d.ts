import { DathangService } from './dathang.service';
export declare class DathangController {
    private readonly dathangService;
    constructor(dathangService: DathangService);
    create(createDathangDto: any): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            ghichu: string | null;
            idSP: string;
            sldat: number | null;
            slgiao: number | null;
            slnhan: number | null;
            ttdat: number | null;
            ttgiao: number | null;
            ttnhan: number | null;
            dathangId: string;
        }[];
    } & {
        id: string;
        order: number | null;
        title: string | null;
        isActive: boolean;
        ghichu: string | null;
        type: string | null;
        madncc: string | null;
        ngaynhan: Date | null;
        nhacungcapId: string;
    }>;
    findAll(): Promise<{
        sanpham: any[];
        nhacungcap: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            isActive: boolean;
            ghichu: string | null;
            diachi: string | null;
            sdt: string | null;
            mancc: string;
        };
        id: string;
        order: number | null;
        title: string | null;
        isActive: boolean;
        ghichu: string | null;
        type: string | null;
        madncc: string | null;
        ngaynhan: Date | null;
        nhacungcapId: string;
    }[]>;
    findOne(id: string): Promise<{
        sanpham: {
            idSP: string;
            sldat: number;
            slgiao: number;
            slnhan: number;
            ttdat: number;
            ttgiao: number;
            ttnhan: number;
            ghichu: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            title: string;
            slug: string | null;
            isActive: boolean;
            masp: string;
            giagoc: number;
            dvt: string | null;
            hinhanh: string | null;
            soluong: number;
            soluongkho: number;
        }[];
        nhacungcap: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            isActive: boolean;
            ghichu: string | null;
            diachi: string | null;
            sdt: string | null;
            mancc: string;
        };
        id: string;
        order: number | null;
        title: string | null;
        isActive: boolean;
        ghichu: string | null;
        type: string | null;
        madncc: string | null;
        ngaynhan: Date | null;
        nhacungcapId: string;
    }>;
    update(id: string, updateDathangDto: any): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            ghichu: string | null;
            idSP: string;
            sldat: number | null;
            slgiao: number | null;
            slnhan: number | null;
            ttdat: number | null;
            ttgiao: number | null;
            ttnhan: number | null;
            dathangId: string;
        }[];
    } & {
        id: string;
        order: number | null;
        title: string | null;
        isActive: boolean;
        ghichu: string | null;
        type: string | null;
        madncc: string | null;
        ngaynhan: Date | null;
        nhacungcapId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        order: number | null;
        title: string | null;
        isActive: boolean;
        ghichu: string | null;
        type: string | null;
        madncc: string | null;
        ngaynhan: Date | null;
        nhacungcapId: string;
    }>;
    reorder(body: {
        dathangIds: string[];
    }): Promise<void>;
}
