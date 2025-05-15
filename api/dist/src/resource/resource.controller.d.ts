import { ResourceService } from './resource.service';
export declare class ResourceController {
    private readonly resourceService;
    constructor(resourceService: ResourceService);
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
    findby(param: any): Promise<{
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
    findAll(): Promise<{
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
    getLastUpdatedResource(): Promise<{
        updatedAt: number;
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
    reorder(body: {
        resourceIds: string[];
    }): Promise<{
        status: string;
    }>;
}
