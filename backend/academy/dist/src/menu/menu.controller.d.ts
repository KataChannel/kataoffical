import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
    }>;
    findAll(): Promise<({
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            icon: string | null;
            slug: string | null;
            parentId: string | null;
            order: number | null;
            isActive: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
    })[]>;
    getLastUpdated(): Promise<{
        updatedAt: number | Date;
    }>;
    findby(param: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
    }>;
    getTree(data: any): Promise<any>;
    findOne(id: string): Promise<({
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            icon: string | null;
            slug: string | null;
            parentId: string | null;
            order: number | null;
            isActive: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
    }) | null>;
    update(id: string, updateMenuDto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
    }>;
}
