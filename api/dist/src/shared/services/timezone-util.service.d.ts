export declare class TimezoneUtilService {
    toUTC(date: Date | string | number): string;
    fromUTC(utcDate: string | Date, timezone?: string): Date;
    nowUTC(): string;
    normalizeDateFields(data: any, dateFields?: string[]): any;
    synchronizeDateField(fieldName: string, value: any): Date | null;
    convertDateFilters(filters: any): any;
    formatDateForFilename(): string;
    formatDateUnderscored(): string;
    getStartOfDay(date: Date | string): string;
    getEndOfDay(date: Date | string): string;
    validateAndConvertToUTC(date: any): string | null;
    private isDateField;
}
