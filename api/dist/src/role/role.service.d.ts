import { PrismaService } from 'prisma/prisma.service';
export declare class RoleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
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
    update(id: string, data: {
        name?: string;
        permissionIds?: string[];
    }): Promise<{
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
}
