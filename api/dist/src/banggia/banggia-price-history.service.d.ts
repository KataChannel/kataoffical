import { PrismaService } from 'prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
export declare class BanggiaPriceHistoryService {
    private prisma;
    constructor(prisma: PrismaService);
    updatePrice(params: {
        banggiaId: string;
        sanphamId: string;
        newPrice: number;
        userId?: string;
        reason?: string;
    }): Promise<{
        action: string;
        data: {
            banggia: {
                title: string | null;
                mabanggia: string | null;
            };
            sanpham: {
                title: string;
                masp: string;
            };
        } & {
            id: string;
            order: number | null;
            isActive: boolean;
            giaban: Decimal;
            sanphamId: string;
            banggiaId: string;
        };
        oldPrice: null;
        newPrice: number;
        message?: undefined;
        currentPrice?: undefined;
        changePercent?: undefined;
    } | {
        action: string;
        message: string;
        currentPrice: number;
        data?: undefined;
        oldPrice?: undefined;
        newPrice?: undefined;
        changePercent?: undefined;
    } | {
        action: string;
        data: {
            banggia: {
                title: string | null;
                mabanggia: string | null;
            };
            sanpham: {
                title: string;
                masp: string;
            };
        } & {
            id: string;
            order: number | null;
            isActive: boolean;
            giaban: Decimal;
            sanphamId: string;
            banggiaId: string;
        };
        oldPrice: number;
        newPrice: number;
        changePercent: number;
        message?: undefined;
        currentPrice?: undefined;
    }>;
    getPriceHistory(banggiaId: string, sanphamId: string, options?: {
        from?: Date;
        to?: Date;
        limit?: number;
    }): Promise<{
        id: string;
        oldPrice: number;
        newPrice: number;
        difference: number;
        percentChange: number;
        reason: string | null;
        changedAt: Date;
        changedBy: string | null;
        changedByName: any;
        changedByUserId: any;
        sourceType: string | null;
        batchId: string | null;
        banggia: {
            id: string;
            code: string | null;
            title: string | null;
        };
        sanpham: {
            id: string;
            code: string;
            title: string;
        };
        metadata: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    getCurrentPrice(banggiaId: string, sanphamId: string): Promise<number | null>;
    bulkUpdatePrices(updates: Array<{
        banggiaId: string;
        sanphamId: string;
        newPrice: number;
    }>, userId?: string, reason?: string): Promise<{
        total: number;
        successful: number;
        failed: number;
        results: any[];
    }>;
}
