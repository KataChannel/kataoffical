import { PrismaService } from 'prisma/prisma.service';
export declare class KhotaskService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        title: string;
        description?: string;
        type: string;
        khoId?: string;
        userId?: string;
    }): Promise<{
        id: string;
        title: string;
        type: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        description: string | null;
        ngaythuchien: Date;
    }>;
    findAll(filters: {
        khoId?: string;
        userId?: string;
        type?: string;
        status?: string;
    }): Promise<({
        kho: {
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
        } | null;
        user: {
            id: string;
            name: string | null;
            email: string | null;
        } | null;
    } & {
        id: string;
        title: string;
        type: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        description: string | null;
        ngaythuchien: Date;
    })[]>;
    update(id: string, data: {
        status?: string;
        notes?: string;
    }): Promise<{
        id: string;
        title: string;
        type: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        description: string | null;
        ngaythuchien: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        type: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        description: string | null;
        ngaythuchien: Date;
    }>;
    getDailyChecklist(khoId: string, date?: Date): Promise<{
        id: string;
        title: string;
        type: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        khoId: string | null;
        userId: string | null;
        description: string | null;
        ngaythuchien: Date;
    }[]>;
}
