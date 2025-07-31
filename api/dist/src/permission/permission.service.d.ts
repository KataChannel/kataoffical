import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from './socket.gateway';
import { ErrorlogsService } from 'src/errorlogs/errorlogs.service';
export declare class PermissionService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogsService);
    getLastUpdatedPermission(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    updateCodeIds(): Promise<{
        status: string;
    }>;
    create(data: any): Promise<{
        id: string;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        codeId: string | null;
        description: string | null;
        group: string | null;
    }>;
    findBy(param: any): Promise<{
        id: string;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        codeId: string | null;
        description: string | null;
        group: string | null;
    } | {
        data: {
            id: string;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            codeId: string | null;
            description: string | null;
            group: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            codeId: string | null;
            description: string | null;
            group: string | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        codeId: string | null;
        description: string | null;
        group: string | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        codeId: string | null;
        description: string | null;
        group: string | null;
    }>;
    reorderPermissions(permissionIds: string[]): Promise<{
        status: string;
    }>;
}
