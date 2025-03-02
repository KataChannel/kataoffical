import { PrismaService } from 'prisma/prisma.service';
export declare class BanggiaService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        title: string;
        isActive: boolean;
        ghichu: string | null;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
    }>;
    createBanggia(data: any): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        title: string;
        isActive: boolean;
        ghichu: string | null;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
    }>;
    reorderBanggias(banggiaIds: string[]): Promise<void>;
    findAll(): Promise<({
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        title: string;
        isActive: boolean;
        ghichu: string | null;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
    })[]>;
    findOne(id: string): Promise<{
        sanpham: {
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
            ghichu: string | null;
            giaban: number;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        title: string;
        isActive: boolean;
        ghichu: string | null;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
    }>;
    update(id: string, data: any): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        title: string;
        isActive: boolean;
        ghichu: string | null;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        title: string;
        isActive: boolean;
        ghichu: string | null;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
    }>;
}
