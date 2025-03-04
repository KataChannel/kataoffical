import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: any): Promise<{
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
    getTree(): Promise<any>;
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
    update(id: string, updateMenuDto: any): Promise<{
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
}
