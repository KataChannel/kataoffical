import { RoleService } from './role.service';
export declare class RoleController {
    private readonly rolesService;
    constructor(rolesService: RoleService);
    create(createRoleDto: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    assignPermissionToRole(data: any): Promise<{
        id: string;
        roleId: string;
        permissionId: string;
    }>;
    removePermissionFromRole(data: any): Promise<{
        id: string;
        roleId: string;
        permissionId: string;
    }>;
    findAll(): Promise<({
        permissions: {
            id: string;
            roleId: string;
            permissionId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<({
        permissions: {
            id: string;
            roleId: string;
            permissionId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    update(id: string, updateRoleDto: any): Promise<{
        permissions: ({
            permission: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
            };
        } & {
            id: string;
            roleId: string;
            permissionId: string;
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
