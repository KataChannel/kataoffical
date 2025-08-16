import { GraphQLResolveInfo } from 'graphql';
import { EnhancedUniversalService } from './enhanced-universal.service';
import { DataLoaderService } from './dataloader.service';
export declare class EnhancedUniversalResolver {
    private readonly enhancedService;
    private readonly dataLoader;
    constructor(enhancedService: EnhancedUniversalService, dataLoader: DataLoaderService);
    findMany(modelName: string, info: GraphQLResolveInfo, where?: any, orderBy?: any, skip?: number, take?: number, include?: any, select?: any): Promise<any[]>;
    findUnique(modelName: string, where: any, info: GraphQLResolveInfo, include?: any, select?: any): Promise<any>;
    createOne(modelName: string, data: any, info: GraphQLResolveInfo, include?: any, select?: any): Promise<any>;
    updateOne(modelName: string, where: any, data: any, info: GraphQLResolveInfo, include?: any, select?: any): Promise<any>;
    deleteOne(modelName: string, where: any): Promise<any>;
    batchCreate(modelName: string, data: any[]): Promise<any>;
    batchDelete(modelName: string, ids: string[]): Promise<any>;
    modelMetadata(modelName: string): Promise<any>;
    aggregate(modelName: string, aggregations: any, where?: any): Promise<any>;
    clearDataLoaderCache(modelName?: string): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
    }>;
    private sanitizeQueryArgs;
    private sanitizeWhereConditions;
}
