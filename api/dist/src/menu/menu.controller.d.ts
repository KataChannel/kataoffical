import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: any): Promise<{
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
    update(id: string, updateMenuDto: any): Promise<{
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
    reorder(body: {
        menuIds: string[];
    }): Promise<void>;
}
