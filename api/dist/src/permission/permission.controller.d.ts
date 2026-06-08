import { PermissionService } from './permission.service';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(data: any): Promise<{
        id: string;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        codeId: string | null;
        group: string | null;
        description: string | null;
    }>;
    findby(param: any): Promise<{
        id: string;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        codeId: string | null;
        group: string | null;
        description: string | null;
    } | {
        data: {
            id: string;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            codeId: string | null;
            group: string | null;
            description: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: {
            id: string;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            codeId: string | null;
            group: string | null;
            description: string | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedPermission(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        codeId: string | null;
        group: string | null;
        description: string | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        codeId: string | null;
        group: string | null;
        description: string | null;
    }>;
    reorder(body: {
        permissionIds: string[];
    }): Promise<{
        status: string;
    }>;
    updateCodeIds(): Promise<{
        status: string;
    }>;
}
