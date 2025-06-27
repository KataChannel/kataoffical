import { PrismaService } from 'prisma/prisma.service';
import { MinioService } from 'src/minio/minio.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class ResourceService {
    private readonly prisma;
    private _SocketGateway;
    private _MinioService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _MinioService: MinioService);
    getLastUpdatedResource(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        category: string | null;
        title: string | null;
        order: number | null;
        codeId: string | null;
        url: string | null;
        fileType: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        group: string | null;
    }>;
    findBy(param: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        category: string | null;
        title: string | null;
        order: number | null;
        codeId: string | null;
        url: string | null;
        fileType: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        group: string | null;
    } | {
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            category: string | null;
            title: string | null;
            order: number | null;
            codeId: string | null;
            url: string | null;
            fileType: string | null;
            metaData: import(".prisma/client/runtime/library").JsonValue | null;
            group: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            category: string | null;
            title: string | null;
            order: number | null;
            codeId: string | null;
            url: string | null;
            fileType: string | null;
            metaData: import(".prisma/client/runtime/library").JsonValue | null;
            group: string | null;
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
        category: string | null;
        title: string | null;
        order: number | null;
        codeId: string | null;
        url: string | null;
        fileType: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        group: string | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<true>;
    reorderResources(resourceIds: string[]): Promise<{
        status: string;
    }>;
}
