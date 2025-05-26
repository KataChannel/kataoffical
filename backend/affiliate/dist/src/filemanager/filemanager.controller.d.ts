import { fileManagerService } from './filemanager.service';
export declare class FilemanagerController {
    private readonly filemanagerService;
    constructor(filemanagerService: fileManagerService);
    create(data: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        url: string | null;
        fileType: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        category: string | null;
        group: string | null;
    }>;
    findby(param: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        url: string | null;
        fileType: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        category: string | null;
        group: string | null;
    } | {
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            url: string | null;
            fileType: string | null;
            metaData: import(".prisma/client/runtime/library").JsonValue | null;
            category: string | null;
            group: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            url: string | null;
            fileType: string | null;
            metaData: import(".prisma/client/runtime/library").JsonValue | null;
            category: string | null;
            group: string | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedFilemanager(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        url: string | null;
        fileType: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        category: string | null;
        group: string | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        url: string | null;
        fileType: string | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        category: string | null;
        group: string | null;
    }>;
    reorder(body: {
        filemanagerIds: string[];
    }): Promise<{
        status: string;
    }>;
}
