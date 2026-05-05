export declare enum TimeRangePreset {
    TODAY = "today",
    WEEK = "week",
    MONTH = "month",
    YEAR = "year"
}
export declare class SummaryQueryDto {
    preset?: TimeRangePreset;
    startDate?: string;
    endDate?: string;
}
