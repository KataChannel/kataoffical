import { PrismaService } from 'prisma/prisma.service';
export declare class MenuService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
    }>;
    findAll(): Promise<({
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            title: string;
            icon: string | null;
            slug: string | null;
            parentId: string | null;
            order: number | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
    })[]>;
    findOne(id: string): Promise<({
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            title: string;
            icon: string | null;
            slug: string | null;
            parentId: string | null;
            order: number | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
    }) | null>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
    }>;
    getTree(): Promise<any>;
    private buildTree;
}
