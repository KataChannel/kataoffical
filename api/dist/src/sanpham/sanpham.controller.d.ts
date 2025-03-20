import { SanphamService } from './sanpham.service';
export declare class SanphamController {
    private readonly sanphamService;
    constructor(sanphamService: SanphamService);
    create(createSanphamDto: any): Promise<{
        id: string;
        subtitle: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        slug: string | null;
        title2: string | null;
        masp: string;
        giagoc: number;
        dvt: string | null;
        hinhanh: string | null;
        soluong: number;
        soluongkho: number;
        haohut: number;
    }>;
    findAll(): Promise<{
        id: string;
        subtitle: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        slug: string | null;
        title2: string | null;
        masp: string;
        giagoc: number;
        dvt: string | null;
        hinhanh: string | null;
        soluong: number;
        soluongkho: number;
        haohut: number;
    }[]>;
    getLastUpdatedSanpham(): Promise<{
        updatedAt: number | Date;
    }>;
    findOne(id: string): Promise<{
        Donhang: {
            createdAt: Date;
            madonhang: string;
            sldat: number;
            slgiao: number;
            slnhan: number;
        }[];
        Dathang: {
            createdAt: Date;
            madncc: string | null;
            sldat: number;
            slgiao: number;
            slnhan: number;
        }[];
        Dathangsanpham: ({
            dathang: {
                id: string;
                ghichu: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date | null;
                title: string | null;
                type: string | null;
                order: number | null;
                printCount: number | null;
                madncc: string | null;
                ngaynhan: Date | null;
                nhacungcapId: string;
            };
        } & {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            order: number | null;
            idSP: string;
            sldat: number | null;
            slgiao: number | null;
            slnhan: number | null;
            ttdat: number | null;
            ttgiao: number | null;
            ttnhan: number | null;
            dathangId: string;
        })[];
        Donhangsanpham: ({
            donhang: {
                id: string;
                ghichu: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                type: string | null;
                order: number | null;
                status: import(".prisma/client").$Enums.StatusDonhang;
                madonhang: string;
                ngaygiao: Date | null;
                khachhangId: string;
                printCount: number | null;
            };
        } & {
            id: string;
            ghichu: string | null;
            isActive: boolean | null;
            order: number | null;
            idSP: string;
            sldat: number | null;
            slgiao: number | null;
            slnhan: number | null;
            ttdat: number | null;
            ttgiao: number | null;
            ttnhan: number | null;
            donhangId: string;
        })[];
        id: string;
        subtitle: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        slug: string | null;
        title2: string | null;
        masp: string;
        giagoc: number;
        dvt: string | null;
        hinhanh: string | null;
        soluong: number;
        soluongkho: number;
        haohut: number;
    }>;
    update(id: string, updateSanphamDto: any): Promise<{
        id: string;
        subtitle: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        slug: string | null;
        title2: string | null;
        masp: string;
        giagoc: number;
        dvt: string | null;
        hinhanh: string | null;
        soluong: number;
        soluongkho: number;
        haohut: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        subtitle: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        slug: string | null;
        title2: string | null;
        masp: string;
        giagoc: number;
        dvt: string | null;
        hinhanh: string | null;
        soluong: number;
        soluongkho: number;
        haohut: number;
    }>;
    reorder(body: {
        sanphamIds: string[];
    }): Promise<void>;
}
