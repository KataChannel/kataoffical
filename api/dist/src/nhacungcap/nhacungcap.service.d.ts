import { PrismaService } from 'prisma/prisma.service';
export declare class NhacungcapService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generateMancc(): Promise<string>;
    create(data: any): Promise<{
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
    }>;
    findAll(): Promise<{
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
    }[]>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, data: any): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
