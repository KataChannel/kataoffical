export declare class TimezoneUtilService {
    toUTC(date: any): string;
    fromUTC(utcDate: any, format?: string): string;
    nowUTC(): string;
    validateAndConvertToUTC(dateInput: any): string | null;
    normalizeeDateRange(startDate?: any, endDate?: any): {
        startUTC?: string;
        endUTC?: string;
    };
    normalizeDateFields(data: any, dateFields: string[]): any;
    createDateRangeWhere(fieldName: string, startDate?: any, endDate?: any): any;
    formatForResponse(utcDate: any, format?: string): string;
    isSameDay(date1: any, date2: any): boolean;
    getDayBounds(date: any): {
        startOfDay: string;
        endOfDay: string;
    };
}
