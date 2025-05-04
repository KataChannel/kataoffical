import { PrismaService } from 'prisma/prisma.service';
export declare class NhacungcapService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generateMancc(): Promise<string>;
    create(data: any): Promise<{
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
    }>;
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
    }[]>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, data: any): Promise<{
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
    }>;
    findByProductIds(productIds: string[]): Promise<({
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
    })[]>;
}
