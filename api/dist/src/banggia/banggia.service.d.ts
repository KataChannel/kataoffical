import { PrismaService } from 'prisma/prisma.service';
export declare class BanggiaService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        ghichu: string | null;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
    }>;
    createBanggia(data: any): Promise<{
        sanpham: {
            id: string;
            isActive: boolean;
            order: number | null;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
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
            isActive: boolean;
            order: number | null;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        ghichu: string | null;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
    })[]>;
    findOne(id: string): Promise<{
        sanpham: {
            giaban: number;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string | null;
            order: number | null;
            masp: string;
            giagoc: number;
            dvt: string | null;
            hinhanh: string | null;
            soluong: number;
            soluongkho: number;
            haohut: number;
            ghichu: string | null;
        }[];
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        ghichu: string | null;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
    }>;
    update(id: string, data: any): Promise<{
        sanpham: {
            id: string;
            isActive: boolean;
            order: number | null;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        ghichu: string | null;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        ghichu: string | null;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
    }>;
}
