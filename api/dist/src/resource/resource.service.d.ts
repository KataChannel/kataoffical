import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { MinioService } from 'src/minio/minio.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class ResourceService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    private _MinioService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService, _MinioService: MinioService);
    getLastUpdatedResource(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        codeId: string | null;
        title: string | null;
        url: string | null;
        description: string | null;
        fileType: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        category: string | null;
        group: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findBy(param: any): Promise<{
        id: string;
        codeId: string | null;
        title: string | null;
        url: string | null;
        description: string | null;
        fileType: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        category: string | null;
        group: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
    } | {
        data: {
            id: string;
            codeId: string | null;
            title: string | null;
            url: string | null;
            description: string | null;
            fileType: string | null;
            metaData: import(".prisma/client/runtime/library").JsonValue | null;
            category: string | null;
            group: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            codeId: string | null;
            title: string | null;
            url: string | null;
            description: string | null;
            fileType: string | null;
            metaData: import(".prisma/client/runtime/library").JsonValue | null;
            category: string | null;
            group: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        codeId: string | null;
        title: string | null;
        url: string | null;
        description: string | null;
        fileType: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        category: string | null;
        group: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<true>;
    reorderResources(resourceIds: string[]): Promise<{
        status: string;
    }>;
}
