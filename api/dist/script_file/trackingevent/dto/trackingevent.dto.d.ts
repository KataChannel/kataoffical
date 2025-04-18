export declare class CreateTrackingeventDto {
    title: string;
    content?: string;
}
export declare class UpdateTrackingeventDto {
    title?: string;
    content?: string;
    order?: number;
}
export declare class ReorderTrackingeventDto {
    trackingeventIds: string[];
}
export declare class FindByDto {
    [key: string]: any;
}
