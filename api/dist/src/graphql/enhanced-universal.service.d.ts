import { PrismaService } from '../../prisma/prisma.service';
import { DataLoaderService } from './dataloader.service';
import { FieldSelectionService } from './field-selection.service';
import { RedisService } from '../redis/redis.service';
import { GraphQLResolveInfo } from 'graphql';
export declare class EnhancedUniversalService {
    private readonly prisma;
    private readonly dataLoader;
    private readonly fieldSelection;
    private readonly redisService;
    constructor(prisma: PrismaService, dataLoader: DataLoaderService, fieldSelection: FieldSelectionService, redisService: RedisService);
    private synchronizeDateField;
    private toUTC;
    private validateAndConvertToUTC;
    findMany(modelName: string, args: {
        where?: any;
        orderBy?: any;
        skip?: number;
        take?: number;
        include?: any;
        select?: any;
    }, info?: GraphQLResolveInfo): Promise<any>;
    findUnique(modelName: string, args: {
        where: any;
        include?: any;
        select?: any;
    }, info?: GraphQLResolveInfo): Promise<any>;
    create(modelName: string, args: {
        data: any;
        include?: any;
        select?: any;
    }, info?: GraphQLResolveInfo): Promise<any>;
    update(modelName: string, args: {
        where: any;
        data: any;
        include?: any;
        select?: any;
    }, info?: GraphQLResolveInfo): Promise<any>;
    delete(modelName: string, args: {
        where: any;
    }): Promise<any>;
    private buildOptimizedQuery;
    private postProcessWithDataLoader;
    private hasRelationFields;
    private readonly modelMapping;
    private getModel;
    getModelMetadata(modelName: string): Promise<any>;
    getAvailableModels(): string[];
    batchOperation(modelName: string, operation: 'create' | 'update' | 'delete', items: any[]): Promise<any>;
    private normalizeDateFieldsForModel;
    private normalizeDateFilters;
    aggregate(modelName: string, aggregations: any, where?: any): Promise<any>;
    private generateCacheKey;
    private isWriteOperation;
    private getCacheTTL;
    invalidateCache(modelName: string): Promise<void>;
    private normalizeRelationFieldsForModel;
}
