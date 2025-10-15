import { PrismaService } from 'prisma/prisma.service';
export interface UserPermissionData {
    id?: string;
    userId: string;
    permissionId: string;
    isGranted: boolean;
    grantedBy?: string;
    grantedAt?: Date;
    expiresAt?: Date;
    reason?: string;
}
export declare class UserPermissionService {
    private prisma;
    constructor(prisma: PrismaService);
    assignPermissionToUser(data: {
        userId: string;
        permissionId: string;
        isGranted: boolean;
        grantedBy: string;
        reason?: string;
        expiresAt?: Date;
    }): Promise<{
        user: {
            id: string;
            email: string | null;
            name: string | null;
        };
        permission: {
            id: string;
            name: string;
            codeId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        permissionId: string;
        isGranted: boolean;
        grantedBy: string | null;
        grantedAt: Date;
        expiresAt: Date | null;
        reason: string | null;
    }>;
    removeUserPermission(userId: string, permissionId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        permissionId: string;
        isGranted: boolean;
        grantedBy: string | null;
        grantedAt: Date;
        expiresAt: Date | null;
        reason: string | null;
    }>;
    getUserPermissions(userId: string): Promise<({
        permission: {
            id: string;
            name: string;
            codeId: string | null;
            group: string | null;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        permissionId: string;
        isGranted: boolean;
        grantedBy: string | null;
        grantedAt: Date;
        expiresAt: Date | null;
        reason: string | null;
    })[]>;
    getUserEffectivePermission(userId: string, permissionId: string): Promise<({
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        permissionId: string;
        isGranted: boolean;
        grantedBy: string | null;
        grantedAt: Date;
        expiresAt: Date | null;
        reason: string | null;
    }) | null>;
    getUserEffectivePermissionByName(userId: string, permissionName: string): Promise<({
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        permissionId: string;
        isGranted: boolean;
        grantedBy: string | null;
        grantedAt: Date;
        expiresAt: Date | null;
        reason: string | null;
    }) | null>;
    findMany(params: {
        userId?: string;
        permissionId?: string;
        isGranted?: boolean;
        isExpired?: boolean;
        page?: number;
        limit?: number;
    }): Promise<{
        data: ({
            user: {
                id: string;
                email: string | null;
                name: string | null;
            };
            permission: {
                id: string;
                name: string;
                codeId: string | null;
                description: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            permissionId: string;
            isGranted: boolean;
            grantedBy: string | null;
            grantedAt: Date;
            expiresAt: Date | null;
            reason: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    batchAssignPermissions(data: {
        userIds: string[];
        permissionIds: string[];
        isGranted: boolean;
        grantedBy: string;
        reason?: string;
        expiresAt?: Date;
    }): Promise<any[]>;
    cleanupExpiredPermissions(): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getPermissionStats(): Promise<{
        total: number;
        active: number;
        expired: number;
        granted: number;
        denied: number;
    }>;
}
