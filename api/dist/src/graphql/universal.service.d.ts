import { PrismaService } from 'prisma/prisma.service';
export declare class UniversalService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMany(modelName: string, args?: any): Promise<{
        data: any;
        total: any;
        page: number;
        pageSize: any;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
    findUnique(modelName: string, args: any): Promise<any>;
    create(modelName: string, data: any): Promise<any>;
    update(modelName: string, where: any, data: any): Promise<any>;
    delete(modelName: string, where: any): Promise<any>;
    upsert(modelName: string, where: any, create: any, update: any): Promise<any>;
    aggregate(modelName: string, args: any): Promise<any>;
    groupBy(modelName: string, args: any): Promise<any>;
    private getModel;
    private normalizeModelName;
    getAvailableModels(): string[];
    getModelInfo(modelName: string): Promise<{
        modelName: string;
        availableOperations: string[];
    }>;
}
