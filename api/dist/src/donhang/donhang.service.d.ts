import { PrismaService } from 'prisma/prisma.service';
export declare class DonhangService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        order: number | null;
        title: string;
        slug: string | null;
        masp: string;
        giagoc: number;
        dvt: string | null;
        hinhanh: string | null;
        soluong: number;
        soluongkho: number;
        ghichu: string | null;
    }>;
    reorderDonHangs(donhangIds: string[]): Promise<void>;
    findAll(): Promise<{
        id: string;
        order: number;
        title: string;
        ghichu: string | null;
        type: string;
        madonhang: string;
        ngaygiao: Date;
        khachhang: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        order: number;
        title: string;
        ghichu: string | null;
        type: string;
        madonhang: string;
        ngaygiao: Date;
        khachhang: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        order: number;
        title: string;
        ghichu: string | null;
        type: string;
        madonhang: string;
        ngaygiao: Date;
        khachhang: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        order: number;
        title: string;
        ghichu: string | null;
        type: string;
        madonhang: string;
        ngaygiao: Date;
        khachhang: string;
    }>;
}
