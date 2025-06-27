import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class MenuService {
    private readonly prisma;
    private _SocketGateway;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway);
    getLastUpdated(): Promise<{
        updatedAt: number | Date;
    }>;
    create(data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        serviceType: import(".prisma/client").$Enums.serviceType | null;
    }>;
    findAll(): Promise<({
        children: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            icon: string | null;
            slug: string | null;
            parentId: string | null;
            order: number | null;
            serviceType: import(".prisma/client").$Enums.serviceType | null;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        serviceType: import(".prisma/client").$Enums.serviceType | null;
    })[]>;
    findby(param: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        serviceType: import(".prisma/client").$Enums.serviceType | null;
    }>;
    findOne(id: string): Promise<({
        children: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            icon: string | null;
            slug: string | null;
            parentId: string | null;
            order: number | null;
            serviceType: import(".prisma/client").$Enums.serviceType | null;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        serviceType: import(".prisma/client").$Enums.serviceType | null;
    }) | null>;
    update(id: string, data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        serviceType: import(".prisma/client").$Enums.serviceType | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
        order: number | null;
        serviceType: import(".prisma/client").$Enums.serviceType | null;
    }>;
    getTree(data: any): Promise<any>;
    private buildTree;
}
