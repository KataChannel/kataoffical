import { PrismaService } from '../../../prisma/prisma.service';
import { PaginationInput, SortInput, FilterInput } from '../types/common.types';
export declare class UniversalGraphQLService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findById(model: string, id: string, include?: any): Promise<any>;
    create(model: string, data: any, include?: any): Promise<any>;
    update(model: string, id: string, data: any, include?: any): Promise<any>;
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
    private buildWhereClause;
}
