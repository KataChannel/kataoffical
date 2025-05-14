import { PermissionService } from './permission.service';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(data: any): Promise<{
        id: string;
        codeId: string | null;
        name: string;
        group: string | null;
        description: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findby(param: any): Promise<{
        id: string;
        codeId: string | null;
        name: string;
        group: string | null;
        description: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
    } | {
        data: {
            id: string;
            codeId: string | null;
            name: string;
            group: string | null;
            description: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: {
            id: string;
            codeId: string | null;
            name: string;
            group: string | null;
            description: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
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
        codeId: string | null;
        name: string;
        group: string | null;
        description: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        codeId: string | null;
        name: string;
        group: string | null;
        description: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
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
