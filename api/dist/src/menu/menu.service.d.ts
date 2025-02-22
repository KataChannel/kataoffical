import { PrismaService } from 'prisma/prisma.service';
export declare class MenuService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        parentId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        title: string;
        icon: string | null;
        slug: string | null;
        isActive: boolean;
    }>;
    reorderMenus(menuIds: string[]): Promise<void>;
    findAll(): Promise<{
        parentId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        title: string;
        icon: string | null;
        slug: string | null;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<{
        parentId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        title: string;
        icon: string | null;
        slug: string | null;
        isActive: boolean;
    }>;
    update(id: string, data: any): Promise<{
        parentId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        title: string;
        icon: string | null;
        slug: string | null;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        parentId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        title: string;
        icon: string | null;
        slug: string | null;
        isActive: boolean;
    }>;
}
