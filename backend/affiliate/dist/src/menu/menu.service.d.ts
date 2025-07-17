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
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
    }>;
    findAll(): Promise<({
        children: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            title: string;
            icon: string | null;
            slug: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
    })[]>;
    findby(param: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
    }>;
    findOne(id: string): Promise<({
        children: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            title: string;
            icon: string | null;
            slug: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
    }) | null>;
    update(id: string, data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        title: string;
        icon: string | null;
        slug: string | null;
        parentId: string | null;
    }>;
    getTree(data: any): Promise<any>;
    private buildTree;
}
