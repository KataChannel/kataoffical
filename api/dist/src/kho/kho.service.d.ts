import { PrismaService } from 'prisma/prisma.service';
export declare class khoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    gettonkho(page: number, limit: number): Promise<{
        data: {
            slchogiao: number;
            slchonhap: number;
            slton: number;
            masp: string;
            dvt: string | null;
            title: string;
            subtitle: string;
            haohut: import("@prisma/client/runtime/library").Decimal;
            goiy: number;
            id: string;
            sanphamId: string;
            sltontt: import("@prisma/client/runtime/library").Decimal;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    create(data: any): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        makho: string | null;
        diachi: string | null;
        sdt: string | null;
        congtyId: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        makho: string | null;
        diachi: string | null;
        sdt: string | null;
        congtyId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        makho: string | null;
        diachi: string | null;
        sdt: string | null;
        congtyId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        makho: string | null;
        diachi: string | null;
        sdt: string | null;
        congtyId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        makho: string | null;
        diachi: string | null;
        sdt: string | null;
        congtyId: string | null;
    }>;
}
