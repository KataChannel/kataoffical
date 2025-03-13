import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
    }>;
    findAll(): Promise<({
        children: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number | null;
            icon: string | null;
            slug: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
    })[]>;
    getTree(data: any): Promise<any>;
    findOne(id: string): Promise<({
        children: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number | null;
            icon: string | null;
            slug: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
    }) | null>;
    update(id: string, updateMenuDto: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
    }>;
}
