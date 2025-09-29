import { PrismaService } from '../../../prisma/prisma.service';
import { BulkOperationResult } from '../types/bulk-operation-result.type';
export declare class UniversalResolver {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllUniversal(modelName: string, where?: string, orderBy?: string, skip?: number, take?: number): Promise<string>;
    findOneUniversal(modelName: string, where: string): Promise<string | null>;
    countUniversal(modelName: string, where?: string): Promise<number>;
    createOneUniversal(modelName: string, data: string): Promise<string>;
    createBulkUniversal(modelName: string, data: string): Promise<BulkOperationResult>;
    updateOneUniversal(modelName: string, where: string, data: string): Promise<string>;
    updateBulkUniversal(modelName: string, where: string, data: string): Promise<BulkOperationResult>;
    deleteOneUniversal(modelName: string, where: string): Promise<string>;
    deleteBulkUniversal(modelName: string, where?: string): Promise<BulkOperationResult>;
    getModelConfig(modelName: string): Promise<string>;
    getAvailableModels(): Promise<string[]>;
}
