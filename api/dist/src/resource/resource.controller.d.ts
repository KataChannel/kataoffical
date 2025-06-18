import { ResourceService } from './resource.service';
export declare class ResourceController {
    private readonly resourceService;
    constructor(resourceService: ResourceService);
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
    findby(param: any): Promise<{
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
    findAll(): Promise<{
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
    getLastUpdatedResource(): Promise<{
        updatedAt: number;
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
    reorder(body: {
        resourceIds: string[];
    }): Promise<{
        status: string;
    }>;
}
