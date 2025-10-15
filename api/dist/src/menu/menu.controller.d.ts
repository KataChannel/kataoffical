import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: any): Promise<{
        id: string;
        title: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        icon: string | null;
        parentId: string | null;
    }>;
    findAll(): Promise<({
        children: {
            id: string;
            title: string;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
            icon: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        title: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        icon: string | null;
        parentId: string | null;
    })[]>;
    getTree(data: any): Promise<any>;
    reorder(banggiaIds: string[]): Promise<boolean>;
    findOne(id: string): Promise<({
        children: {
            id: string;
            title: string;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
            icon: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        title: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        icon: string | null;
        parentId: string | null;
    }) | null>;
    update(id: string, updateMenuDto: any): Promise<{
        id: string;
        title: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        icon: string | null;
        parentId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string | null;
        icon: string | null;
        parentId: string | null;
    }>;
}
