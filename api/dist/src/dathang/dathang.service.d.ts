import { PrismaService } from 'prisma/prisma.service';
export declare class DathangService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    reorderDathangs(dathangIds: string[]): Promise<void>;
    findAll(): Promise<{
        sanpham: any[];
        nhacungcap: {
            id: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            isActive: boolean;
            ghichu: string | null;
            diachi: string | null;
            sdt: string | null;
            mancc: string;
        };
        id: string;
        isActive: boolean;
        title: string | null;
        order: number | null;
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
            isActive: boolean;
            title: string;
            slug: string | null;
            order: number | null;
            masp: string;
            giagoc: number;
            dvt: string | null;
            hinhanh: string | null;
            soluong: number;
            soluongkho: number;
        }[];
        nhacungcap: {
            id: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            isActive: boolean;
            ghichu: string | null;
            diachi: string | null;
            sdt: string | null;
            mancc: string;
        };
        id: string;
        isActive: boolean;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        type: string | null;
        madncc: string | null;
        ngaynhan: Date | null;
        nhacungcapId: string;
    }>;
    create(data: any): Promise<{
        sanpham: {
            id: string;
            isActive: boolean;
            order: number | null;
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
        isActive: boolean;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        type: string | null;
        madncc: string | null;
        ngaynhan: Date | null;
        nhacungcapId: string;
    }>;
    update(id: string, data: any): Promise<{
        sanpham: {
            id: string;
            isActive: boolean;
            order: number | null;
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
        isActive: boolean;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        type: string | null;
        madncc: string | null;
        ngaynhan: Date | null;
        nhacungcapId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        type: string | null;
        madncc: string | null;
        ngaynhan: Date | null;
        nhacungcapId: string;
    }>;
}
