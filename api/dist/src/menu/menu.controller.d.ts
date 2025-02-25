import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        parentId: string | null;
        title: string;
        icon: string | null;
        slug: string | null;
        isActive: boolean;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        parentId: string | null;
        title: string;
        icon: string | null;
        slug: string | null;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        parentId: string | null;
        title: string;
        icon: string | null;
        slug: string | null;
        isActive: boolean;
    }>;
    update(id: string, updateMenuDto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        parentId: string | null;
        title: string;
        icon: string | null;
        slug: string | null;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        parentId: string | null;
        title: string;
        icon: string | null;
        slug: string | null;
        isActive: boolean;
    }>;
    reorder(body: {
        menuIds: string[];
    }): Promise<void>;
}
