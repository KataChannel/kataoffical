import { UniversalService } from './universal.service';
export declare class UniversalResolver {
    private readonly universalService;
    constructor(universalService: UniversalService);
    findMany(modelName: string, where?: any, orderBy?: any, skip?: number, take?: number, include?: any, select?: any): Promise<{
        data: any;
        total: any;
        page: number;
        pageSize: any;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
    findUnique(modelName: string, where: any, include?: any, select?: any): Promise<any>;
    createRecord(modelName: string, data: any): Promise<any>;
    updateRecord(modelName: string, where: any, data: any): Promise<any>;
    deleteRecord(modelName: string, where: any): Promise<any>;
    upsertRecord(modelName: string, where: any, create: any, update: any): Promise<any>;
    aggregateRecords(modelName: string, args: any): Promise<any>;
    groupByRecords(modelName: string, args: any): Promise<any>;
    getAvailableModels(): Promise<string[]>;
    getModelInfo(modelName: string): Promise<{
        modelName: string;
        availableOperations: string[];
    }>;
}
