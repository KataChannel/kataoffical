import { PrismaService } from 'prisma/prisma.service';
import { PaginationInput, FilterInput, SortInput } from './types';
export declare class UniversalService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private mapModelName;
    private validateAndGetPrismaModel;
    findAll(model: string, pagination?: PaginationInput, filter?: FilterInput, sort?: SortInput, include?: any): Promise<{
        data: any;
        pagination: {
            total: any;
            page: number;
            pageSize: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    findMany(modelName: string, options?: {
        where?: any;
        orderBy?: any;
        skip?: number;
        take?: number;
        include?: any;
        select?: any;
    }): Promise<{
        data: any;
        total: any;
        page: number;
        pageSize: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
    findUnique(modelName: string, options: {
        where: any;
        include?: any;
        select?: any;
    }): Promise<any>;
    findById(model: string, id: string, include?: any): Promise<any>;
    create(model: string, data: any, include?: any): Promise<any>;
    update(model: string, where: any, data: any, include?: any, select?: any): Promise<any>;
    private validateAndCleanRelationData;
    private validateConnectArray;
    updateById(model: string, id: string, data: any, include?: any): Promise<any>;
    delete(model: string, id: string): Promise<boolean>;
    bulkCreate(model: string, data: any[]): Promise<any>;
    bulkUpdate(model: string, updates: {
        id: string;
        data: any;
    }[]): Promise<any[]>;
    bulkDelete(model: string, ids: string[]): Promise<any>;
    search(model: string, searchTerm: string, searchFields: string[], pagination?: PaginationInput, include?: any): Promise<{
        data: any;
        pagination: {
            total: any;
            page: number;
            pageSize: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    getStats(model: string): Promise<{
        total: any;
        active: any;
        inactive: number;
        createdToday: any;
        createdThisWeek: any;
    }>;
    getAvailableModels(): string[];
    private buildWhereClause;
}
