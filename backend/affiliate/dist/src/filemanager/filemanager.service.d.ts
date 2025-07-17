import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { MinioService } from 'src/minio/minio.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class fileManagerService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    private _MinioService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService, _MinioService: MinioService);
    getLastUpdatedfileManager(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        title: string | null;
        category: string | null;
        url: string | null;
        fileType: string | null;
        fileSize: number | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        group: string | null;
    }>;
    findBy(param: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        title: string | null;
        category: string | null;
        url: string | null;
        fileType: string | null;
        fileSize: number | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        group: string | null;
    } | {
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            order: number | null;
            title: string | null;
            category: string | null;
            url: string | null;
            fileType: string | null;
            fileSize: number | null;
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
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            order: number | null;
            title: string | null;
            category: string | null;
            url: string | null;
            fileType: string | null;
            fileSize: number | null;
            metaData: import(".prisma/client/runtime/library").JsonValue | null;
            group: string | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        title: string | null;
        category: string | null;
        url: string | null;
        fileType: string | null;
        fileSize: number | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        group: string | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<true>;
    reorderfileManagers(fileManagerIds: string[]): Promise<{
        status: string;
    }>;
}
