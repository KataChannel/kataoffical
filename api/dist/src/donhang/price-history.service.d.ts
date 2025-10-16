import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProductPriceDto, GetPriceHistoryDto, GetDonhangPriceAuditDto } from './dto/price-management.dto';
export declare class PriceHistoryService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    trackBanggiaPriceChange(data: {
        banggiasanphamId: string;
        banggiaId: string;
        sanphamId: string;
        oldPrice: number;
        newPrice: number;
        changeReason?: string;
        changedBy?: string;
        sourceType?: string;
        batchId?: string;
        metadata?: any;
    }): Promise<number>;
    trackDonhangPriceChange(dto: UpdateProductPriceDto, oldPrice: number): Promise<number>;
    getBanggiaPriceHistory(dto: GetPriceHistoryDto): Promise<unknown>;
    getDonhangPriceAudit(dto: GetDonhangPriceAuditDto): Promise<unknown>;
    getPriceComparison(sanphamId: string, banggiaId?: string): Promise<any>;
    getPriceStatistics(sanphamId: string, days?: number): Promise<any>;
}
