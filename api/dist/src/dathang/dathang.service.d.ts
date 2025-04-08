import { PrismaService } from 'prisma/prisma.service';
export declare class DathangService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    reorderDathangs(dathangIds: string[]): Promise<void>;
    findAll(): Promise<{
        sanpham: any[];
        nhacungcap: {
            email: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            diachi: string | null;
            sdt: string | null;
            mancc: string;
        };
        type: string | null;
        id: string;
        isActive: boolean;
        title: string | null;
        order: number | null;
        ghichu: string | null;
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
        }[];
        nhacungcap: {
            email: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            diachi: string | null;
            sdt: string | null;
            mancc: string;
        };
        type: string | null;
        id: string;
        isActive: boolean;
        title: string | null;
        order: number | null;
        ghichu: string | null;
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
        type: string | null;
        id: string;
        isActive: boolean;
        title: string | null;
        order: number | null;
        ghichu: string | null;
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
        type: string | null;
        id: string;
        isActive: boolean;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        madncc: string | null;
        ngaynhan: Date | null;
        nhacungcapId: string;
    }>;
    remove(id: string): Promise<{
        type: string | null;
        id: string;
        isActive: boolean;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        madncc: string | null;
        ngaynhan: Date | null;
        nhacungcapId: string;
    }>;
}
