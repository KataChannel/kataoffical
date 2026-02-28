export declare class PaginationInfo {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export declare class PaginationInput {
    page: number;
    pageSize: number;
}
export declare class SortInput {
    field: string;
    direction: 'asc' | 'desc';
}
export declare class FilterInput {
    search?: string;
    startDate?: Date;
    endDate?: Date;
    ids?: string[];
    isActive?: boolean;
}
