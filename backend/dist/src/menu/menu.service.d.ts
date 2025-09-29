import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class MenuService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdated(): Promise<{
        updatedAt: number | Date;
    }>;
    create(data: any): Promise<{
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
    update(id: string, data: any): Promise<{
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
    getTree(data: any): Promise<any>;
    private buildTree;
}
