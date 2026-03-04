import { Decimal } from '@prisma/client/runtime/library';
export declare function calculateDonhangTotals(donhangId: string): Promise<{
    tong: Decimal;
    tongvat: Decimal;
    tongtien: Decimal;
    vatRate: Decimal;
}>;
export declare function updateSpecificDonhangs(donhangIds: string[]): Promise<{
    processedCount: number;
    errorCount: number;
}>;
export declare function convertData(data1: any[]): {
    banggiaId: string;
    khachhangIds: any[];
}[];
export declare function removeVietnameseAccents(text: any): any;
export declare function DonhangcodeToNumber(code: any): number;
export declare function DonhangnumberToCode(number: any): string;
