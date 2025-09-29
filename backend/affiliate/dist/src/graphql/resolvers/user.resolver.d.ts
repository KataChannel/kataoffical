import { User } from '../types/user.type';
import { PrismaService } from '../../../prisma/prisma.service';
declare const BaseUserResolver: abstract new (prisma: PrismaService) => {
    readonly prisma: PrismaService;
    readonly model: import("../base/base.resolver").IPrismaDelegate;
    findAll(where?: any, orderBy?: any, skip?: number, take?: number): Promise<User[]>;
    findOne(where: any): Promise<User | null>;
    count(where?: any): Promise<number>;
    createOne(data: any): Promise<User>;
    createBulk(data: any[]): Promise<import("../types/bulk-operation-result.type").BulkOperationResult>;
    updateOne(where: any, data: any): Promise<User>;
    updateBulk(where: any, data: any): Promise<import("../types/bulk-operation-result.type").BulkOperationResult>;
    deleteOne(where: any): Promise<User>;
    deleteBulk(where: any): Promise<import("../types/bulk-operation-result.type").BulkOperationResult>;
};
export declare class UserResolver extends BaseUserResolver {
    constructor(prisma: PrismaService);
}
export {};
