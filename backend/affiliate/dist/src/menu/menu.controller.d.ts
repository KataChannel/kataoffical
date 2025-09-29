import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: any): Promise<{
        updatedAt: Date;
        id: string;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        serviceType: import(".prisma/client").$Enums.serviceType | null;
        createdAt: Date;
    }>;
    findAll(): Promise<({
        children: {
            updatedAt: Date;
            id: string;
            title: string;
            icon: string | null;
            slug: string | null;
            parentId: string | null;
            order: number | null;
            isActive: boolean;
            serviceType: import(".prisma/client").$Enums.serviceType | null;
            createdAt: Date;
        }[];
    } & {
        updatedAt: Date;
        id: string;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        serviceType: import(".prisma/client").$Enums.serviceType | null;
        createdAt: Date;
    })[]>;
    getLastUpdated(): Promise<{
        updatedAt: number | Date;
    }>;
    findby(param: any): Promise<{
        updatedAt: Date;
        id: string;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        serviceType: import(".prisma/client").$Enums.serviceType | null;
        createdAt: Date;
    }>;
    getTree(data: any): Promise<any>;
    findOne(id: string): Promise<({
        children: {
            updatedAt: Date;
            id: string;
            title: string;
            icon: string | null;
            slug: string | null;
            parentId: string | null;
            order: number | null;
            isActive: boolean;
            serviceType: import(".prisma/client").$Enums.serviceType | null;
            createdAt: Date;
        }[];
    } & {
        updatedAt: Date;
        id: string;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        serviceType: import(".prisma/client").$Enums.serviceType | null;
        createdAt: Date;
    }) | null>;
    update(id: string, updateMenuDto: any): Promise<{
        updatedAt: Date;
        id: string;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        serviceType: import(".prisma/client").$Enums.serviceType | null;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        updatedAt: Date;
        id: string;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        serviceType: import(".prisma/client").$Enums.serviceType | null;
        createdAt: Date;
    }>;
}
