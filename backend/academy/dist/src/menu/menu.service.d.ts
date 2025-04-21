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
    update(id: string, data: any): Promise<{
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
    getTree(data: any): Promise<any>;
    private buildTree;
}
