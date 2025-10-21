export declare class UpdateProductPriceDto {
    donhangId: string;
    donhangsanphamId: string;
    sanphamId: string;
    newPrice: number;
    changeReason: string;
    changedBy?: string;
    changedByEmail?: string;
    ipAddress?: string;
    userAgent?: string;
}
export declare class BulkUpdatePriceDto {
    banggiaId: string;
    percentage: number;
    changeReason: string;
    changedBy?: string;
}
export declare class GetPriceHistoryDto {
    banggiaId?: string;
    sanphamId?: string;
    limit?: number;
}
export declare class GetDonhangPriceAuditDto {
    donhangId?: string;
    sanphamId?: string;
    limit?: number;
}
