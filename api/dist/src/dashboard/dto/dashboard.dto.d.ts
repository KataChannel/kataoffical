export declare class CreateDashboardDto {
    title: string;
    content?: string;
}
export declare class UpdateDashboardDto {
    title?: string;
    content?: string;
    order?: number;
}
export declare class ReorderDashboardDto {
    dashboardIds: string[];
}
export declare class FindByDto {
    [key: string]: any;
}
