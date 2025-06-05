import { PrismaService } from 'prisma/prisma.service';
export declare class MenuService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        title: string;
        slug: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        icon: string | null;
        parentId: string | null;
    }>;
    findAll(): Promise<({
        children: {
            id: string;
            title: string;
            slug: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            icon: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        title: string;
        slug: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        icon: string | null;
        parentId: string | null;
    })[]>;
    findOne(id: string): Promise<({
        children: {
            id: string;
            title: string;
            slug: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            icon: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        title: string;
        slug: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        icon: string | null;
        parentId: string | null;
    }) | null>;
    update(id: string, data: any): Promise<{
        id: string;
        title: string;
        slug: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        icon: string | null;
        parentId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        slug: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        icon: string | null;
        parentId: string | null;
    }>;
    getTree(data: any): Promise<any>;
    private buildTree;
    reorderMenus(menuIds: string[]): Promise<boolean>;
}
