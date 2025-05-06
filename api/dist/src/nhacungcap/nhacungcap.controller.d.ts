import { NhacungcapService } from './nhacungcap.service';
export declare class NhacungcapController {
    private readonly nhacungcapService;
    constructor(nhacungcapService: NhacungcapService);
    create(createNhacungcapDto: any): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        mancc: string;
        manccold: string | null;
    }>;
    findByProductIds(productIds: any): Promise<({
        Sanpham: {
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
        }[];
    } & {
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        mancc: string;
        manccold: string | null;
    })[]>;
    findAll(): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        mancc: string;
        manccold: string | null;
    }[]>;
    findOne(id: string): Promise<{
        Sanpham: {
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
        }[];
    } & {
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        mancc: string;
        manccold: string | null;
    }>;
    update(id: string, updateNhacungcapDto: any): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        mancc: string;
        manccold: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        mancc: string;
        manccold: string | null;
    }>;
}
