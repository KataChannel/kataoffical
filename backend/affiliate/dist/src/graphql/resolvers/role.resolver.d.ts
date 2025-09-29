import { Role, Permission } from '../types/role.type';
import { PrismaService } from '../../../prisma/prisma.service';
declare const BaseRoleResolver: abstract new (prisma: PrismaService) => {
    readonly prisma: PrismaService;
    readonly model: import("../base/base.resolver").IPrismaDelegate;
    findAll(where?: any, orderBy?: any, skip?: number, take?: number): Promise<Role[]>;
    findOne(where: any): Promise<Role | null>;
    count(where?: any): Promise<number>;
    createOne(data: any): Promise<Role>;
    createBulk(data: any[]): Promise<import("../types/bulk-operation-result.type").BulkOperationResult>;
    updateOne(where: any, data: any): Promise<Role>;
    updateBulk(where: any, data: any): Promise<import("../types/bulk-operation-result.type").BulkOperationResult>;
    deleteOne(where: any): Promise<Role>;
    deleteBulk(where: any): Promise<import("../types/bulk-operation-result.type").BulkOperationResult>;
};
export declare class RoleResolver extends BaseRoleResolver {
    constructor(prisma: PrismaService);
}
declare const BasePermissionResolver: abstract new (prisma: PrismaService) => {
    readonly prisma: PrismaService;
    readonly model: import("../base/base.resolver").IPrismaDelegate;
    findAll(where?: any, orderBy?: any, skip?: number, take?: number): Promise<Permission[]>;
    findOne(where: any): Promise<Permission | null>;
    count(where?: any): Promise<number>;
    createOne(data: any): Promise<Permission>;
    createBulk(data: any[]): Promise<import("../types/bulk-operation-result.type").BulkOperationResult>;
    updateOne(where: any, data: any): Promise<Permission>;
    updateBulk(where: any, data: any): Promise<import("../types/bulk-operation-result.type").BulkOperationResult>;
    deleteOne(where: any): Promise<Permission>;
    deleteBulk(where: any): Promise<import("../types/bulk-operation-result.type").BulkOperationResult>;
};
export declare class PermissionResolver extends BasePermissionResolver {
    constructor(prisma: PrismaService);
}
export {};
