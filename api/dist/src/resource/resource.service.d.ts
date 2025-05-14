import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from './socket.gateway';
export declare class ResourceService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedResource(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        codeId: string | null;
        url: string | null;
        fileType: string | null;
        category: string | null;
        group: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
    }>;
    findBy(param: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            codeId: string | null;
            url: string | null;
            fileType: string | null;
            category: string | null;
            group: string | null;
            metaData: import(".prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            codeId: string | null;
            url: string | null;
            fileType: string | null;
            category: string | null;
            group: string | null;
            metaData: import(".prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        codeId: string | null;
        url: string | null;
        fileType: string | null;
        category: string | null;
        group: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        codeId: string | null;
        url: string | null;
        fileType: string | null;
        category: string | null;
        group: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
    }>;
    reorderResources(resourceIds: string[]): Promise<{
        status: string;
    }>;
}
