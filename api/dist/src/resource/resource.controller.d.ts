import { ResourceService } from './resource.service';
export declare class ResourceController {
    private readonly resourceService;
    constructor(resourceService: ResourceService);
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
    findby(param: any): Promise<{
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
    findAll(): Promise<{
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
    getLastUpdatedResource(): Promise<{
        updatedAt: number;
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
    reorder(body: {
        resourceIds: string[];
    }): Promise<{
        status: string;
    }>;
}
