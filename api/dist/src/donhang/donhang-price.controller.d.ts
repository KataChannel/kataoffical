import { DonhangService } from './donhang.service';
import { PriceHistoryService } from './price-history.service';
import { UpdateProductPriceDto, GetPriceHistoryDto } from './dto/price-management.dto';
export declare class DonhangPriceController {
    private readonly donhangService;
    private readonly priceHistoryService;
    constructor(donhangService: DonhangService, priceHistoryService: PriceHistoryService);
    updateProductPrice(dto: UpdateProductPriceDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            donhangsanphamId: string;
            sanpham: string;
            oldPrice: number;
            newPrice: number;
            changePercent: string;
            newTotals: {
                tongtien: number;
                tongvat: number;
                tongcong: number;
            };
        };
    }>;
    getDonhangPriceAudit(donhangId: string): Promise<unknown>;
    verifyOrderPrices(donhangId: string): Promise<any>;
    getProductPriceAudit(sanphamId: string, limit?: number): Promise<unknown>;
    getBanggiaPriceHistory(banggiaId: string, dto: GetPriceHistoryDto): Promise<unknown>;
    getPriceComparison(banggiaId: string, sanphamId: string): Promise<any>;
    getPriceStatistics(sanphamId: string, days?: number): Promise<any>;
}
