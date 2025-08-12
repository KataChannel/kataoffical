import { fileManagerService } from './filemanager.service';
export declare class FilemanagerController {
    private readonly filemanagerService;
    constructor(filemanagerService: fileManagerService);
    create(data: any): Promise<{
        url: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        title: string | null;
        category: string | null;
        fileType: string | null;
        fileSize: number | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        group: string | null;
    }>;
    findby(param: any): Promise<{
        url: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        title: string | null;
        category: string | null;
        fileType: string | null;
        fileSize: number | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        group: string | null;
    } | {
        data: {
            url: string | null;
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            order: number | null;
            title: string | null;
            category: string | null;
            fileType: string | null;
            fileSize: number | null;
            metaData: import(".prisma/client/runtime/library").JsonValue | null;
            group: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: {
            url: string | null;
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            order: number | null;
            title: string | null;
            category: string | null;
            fileType: string | null;
            fileSize: number | null;
            metaData: import(".prisma/client/runtime/library").JsonValue | null;
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
        url: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        title: string | null;
        category: string | null;
        fileType: string | null;
        fileSize: number | null;
        metaData: import(".prisma/client/runtime/library").JsonValue | null;
        group: string | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<true>;
    reorder(body: {
        filemanagerIds: string[];
    }): Promise<{
        status: string;
    }>;
}
