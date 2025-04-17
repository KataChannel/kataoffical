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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    })[]>;
    findOne(id: string): Promise<({
        permissions: {
            id: string;
            roleId: string;
            permissionId: string;
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
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            id: string;
            roleId: string;
            permissionId: string;
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
