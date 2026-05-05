export declare class FilterDto {
    type: string;
    value: string | number;
}
export declare class RelationFilterDto {
    include?: boolean;
    filters?: Record<string, FilterDto>;
}
export declare class SearchDto {
    model: string;
    filters?: Record<string, FilterDto>;
    relations?: Record<string, RelationFilterDto>;
    orderBy?: {
        field: string;
        direction: 'asc' | 'desc';
    };
    skip?: number;
    take?: number;
}
