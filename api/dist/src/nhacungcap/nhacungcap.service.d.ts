import { PrismaService } from 'prisma/prisma.service';
export declare class NhacungcapService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
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
    }>;
    findAll(): Promise<{
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
    }[]>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, data: any): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
