export declare class CreateTrackingDto {
    title: string;
    content?: string;
}
export declare class UpdateTrackingDto {
    title?: string;
    content?: string;
    order?: number;
}
export declare class ReorderTrackingDto {
    trackingIds: string[];
}
export declare class FindByDto {
    [key: string]: any;
}
