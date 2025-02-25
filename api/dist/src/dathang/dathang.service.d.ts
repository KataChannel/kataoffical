import { PrismaService } from 'prisma/prisma.service';
export declare class DathangService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            ghichu: string | null;
            sldat: number | null;
            slgiao: number | null;
            slnhan: number | null;
            ttdat: number | null;
            ttgiao: number | null;
            ttnhan: number | null;
            idSP: string;
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
    reorderDathangs(dathangIds: string[]): Promise<void>;
    findAll(): Promise<({
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
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            ghichu: string | null;
            sldat: number | null;
            slgiao: number | null;
            slnhan: number | null;
            ttdat: number | null;
            ttgiao: number | null;
            ttnhan: number | null;
            idSP: string;
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
    })[]>;
    findOne(id: string): Promise<{
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
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            ghichu: string | null;
            sldat: number | null;
            slgiao: number | null;
            slnhan: number | null;
            ttdat: number | null;
            ttgiao: number | null;
            ttnhan: number | null;
            idSP: string;
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
    update(id: string, data: any): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            ghichu: string | null;
            sldat: number | null;
            slgiao: number | null;
            slnhan: number | null;
            ttdat: number | null;
            ttgiao: number | null;
            ttnhan: number | null;
            idSP: string;
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
}
