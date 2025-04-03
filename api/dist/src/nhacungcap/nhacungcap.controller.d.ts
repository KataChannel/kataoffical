import { NhacungcapService } from './nhacungcap.service';
export declare class NhacungcapController {
    private readonly nhacungcapService;
    constructor(nhacungcapService: NhacungcapService);
    create(createNhacungcapDto: any): Promise<{
        id: string;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mancc: string;
    }>;
    findByProductIds(productIds: any): Promise<({
        Sanpham: {
            id: string;
            subtitle: string | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            title2: string | null;
            slug: string | null;
            masp: string;
            giagoc: number;
            dvt: string | null;
            hinhanh: string | null;
            loadpoint: number | null;
            soluong: number;
            soluongkho: number;
            haohut: number;
            order: number | null;
        }[];
    } & {
        id: string;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mancc: string;
    })[]>;
    findAll(): Promise<{
        id: string;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mancc: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mancc: string;
    }>;
    update(id: string, updateNhacungcapDto: any): Promise<{
        id: string;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mancc: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mancc: string;
    }>;
}
