export declare class CreateAffiliatelinkDto {
    title: string;
    content?: string;
}
export declare class UpdateAffiliatelinkDto {
    title?: string;
    content?: string;
    order?: number;
}
export declare class ReorderAffiliatelinkDto {
    affiliatelinkIds: string[];
}
export declare class FindByDto {
    [key: string]: any;
}
