import { PrismaService } from 'prisma/prisma.service';
export declare class khoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        diachi: string | null;
        sdt: string | null;
        makho: string | null;
        congtyId: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        diachi: string | null;
        sdt: string | null;
        makho: string | null;
        congtyId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        diachi: string | null;
        sdt: string | null;
        makho: string | null;
        congtyId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        diachi: string | null;
        sdt: string | null;
        makho: string | null;
        congtyId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        diachi: string | null;
        sdt: string | null;
        makho: string | null;
        congtyId: string | null;
    }>;
}
