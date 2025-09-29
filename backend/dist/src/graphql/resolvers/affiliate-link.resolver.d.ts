import { AffiliateLink } from '../types/affiliate-link.type';
import { PrismaService } from '../../../prisma/prisma.service';
declare const BaseAffiliateLinkResolver: abstract new (prisma: PrismaService) => {
    readonly prisma: PrismaService;
    readonly model: import("../base/base.resolver").IPrismaDelegate;
    findAll(where?: any, orderBy?: any, skip?: number, take?: number): Promise<AffiliateLink[]>;
    findOne(where: any): Promise<AffiliateLink | null>;
    count(where?: any): Promise<number>;
    createOne(data: any): Promise<AffiliateLink>;
    createBulk(data: any[]): Promise<import("../types/bulk-operation-result.type").BulkOperationResult>;
    updateOne(where: any, data: any): Promise<AffiliateLink>;
    updateBulk(where: any, data: any): Promise<import("../types/bulk-operation-result.type").BulkOperationResult>;
    deleteOne(where: any): Promise<AffiliateLink>;
    deleteBulk(where: any): Promise<import("../types/bulk-operation-result.type").BulkOperationResult>;
};
export declare class AffiliateLinkResolver extends BaseAffiliateLinkResolver {
    constructor(prisma: PrismaService);
}
export {};
