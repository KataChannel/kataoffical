import { UserPermissionService } from './user-permission.service';
export declare class UserPermissionController {
    private readonly userPermissionService;
    constructor(userPermissionService: UserPermissionService);
    assignPermissionToUser(data: {
        userId: string;
        permissionId: string;
        isGranted: boolean;
        grantedBy: string;
        reason?: string;
        expiresAt?: string;
    }): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string | null;
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
    findMany(userId?: string, permissionId?: string, isGranted?: string, isExpired?: string, page?: string, limit?: string): Promise<{
        data: ({
            user: {
                id: string;
                name: string | null;
                email: string | null;
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
        expiresAt?: string;
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
