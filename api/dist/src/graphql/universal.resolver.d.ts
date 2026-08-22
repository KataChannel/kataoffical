import { UniversalService } from './universal.service';
export declare class UniversalResolver {
    private readonly universalService;
    constructor(universalService: UniversalService);
    findMany(modelName: string, where?: any, orderBy?: any, skip?: number, take?: number, include?: any, select?: any): Promise<{
        data: any;
        total: any;
        page: number;
        pageSize: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
    findUnique(modelName: string, where: any, include?: any, select?: any): Promise<any>;
    testSelectQuery(modelName: string): Promise<{
        testResults: {
            withSelect: {
                dataCount: any;
                firstItemFields: string[];
                expectedFields: string[];
            };
            withoutSelect: {
                dataCount: any;
                firstItemFields: string[];
                expectedFields: string[];
            };
            selectFunctionality: string;
        };
    }>;
    createRecord(modelName: string, data: any): Promise<any>;
    updateRecord(modelName: string, where: any, data: any, include?: any, select?: any): Promise<any>;
    deleteRecord(modelName: string, where: any): Promise<boolean>;
    getAvailableModels(): string[];
}
