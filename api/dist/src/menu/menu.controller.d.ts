import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: any): Promise<{
        id: string;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateMenuDto: any): Promise<{
        id: string;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    reorder(body: {
        menuIds: string[];
    }): Promise<void>;
}
