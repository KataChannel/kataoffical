import { RoleService } from './role.service';
export declare class RoleController {
    private readonly rolesService;
    constructor(rolesService: RoleService);
    create(createRoleDto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    assignPermissionToRole(data: any): Promise<{
        id: string;
        permissionId: string;
        roleId: string;
    }>;
    removePermissionFromRole(data: any): Promise<{
        id: string;
        permissionId: string;
        roleId: string;
    }>;
    findAll(): Promise<({
        permissions: {
            id: string;
            permissionId: string;
            roleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    })[]>;
    findOne(id: string): Promise<({
        permissions: {
            id: string;
            permissionId: string;
            roleId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }) | null>;
    update(id: string, updateRoleDto: any): Promise<{
        permissions: ({
            permission: {
                id: string;
                order: number | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                codeId: string | null;
                group: string | null;
                description: string | null;
            };
        } & {
            id: string;
            permissionId: string;
            roleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
}
