import { PrismaService } from 'prisma/prisma.service';
export declare class SanphamService {
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
    reorderSanphams(sanphamIds: string[]): Promise<void>;
    findAll(): Promise<{
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
    }[]>;
    findOne(id: string): Promise<{
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
    update(id: string, data: any): Promise<{
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
    remove(id: string): Promise<{
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
}
