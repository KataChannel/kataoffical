import { PrismaService } from '../../../prisma/prisma.service';
import { BulkOperationResult } from '../types/bulk-operation-result.type';
export interface ModelConfig {
    name: string;
    pluralName: string;
    fields: {
        [key: string]: string;
    };
    requiredFields: string[];
    uniqueFields: string[];
    relations?: {
        [key: string]: string;
    };
}
export declare function createDynamicWhereInput(modelName: string, fields: {
    [key: string]: string;
}): {
    [key: string]: any;
};
export declare function createDynamicCreateInput(modelName: string, fields: {
    [key: string]: string;
}, requiredFields: string[]): {
    [key: string]: any;
};
export declare function createDynamicResolver(config: ModelConfig): {
    new (prisma: PrismaService): {
        readonly prisma: PrismaService;
        readonly model: any;
        findAll(where?: any, orderBy?: any, skip?: number, take?: number): Promise<any[]>;
        findOne(where: any): Promise<any | null>;
        count(where?: any): Promise<number>;
        createOne(data: any): Promise<any>;
        createBulk(data: any[]): Promise<BulkOperationResult>;
        updateOne(where: any, data: any): Promise<any>;
        updateBulk(where: any, data: any): Promise<BulkOperationResult>;
        deleteOne(where: any): Promise<any>;
        deleteBulk(where: any): Promise<BulkOperationResult>;
    };
};
export declare class ModelRegistry {
    private static models;
    static register(config: ModelConfig): void;
    static get(modelName: string): ModelConfig | undefined;
    static getAll(): ModelConfig[];
}
export declare function GraphQLModel(config: Omit<ModelConfig, 'name'>): <T extends {
    new (...args: any[]): {};
}>(constructor: T) => T;
