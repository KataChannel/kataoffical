"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PriceHistoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceHistoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PriceHistoryService = PriceHistoryService_1 = class PriceHistoryService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(PriceHistoryService_1.name);
    }
    async trackBanggiaPriceChange(data) {
        try {
            const changePercent = data.oldPrice !== 0
                ? ((data.newPrice - data.oldPrice) / data.oldPrice) * 100
                : 0;
            const history = await this.prisma.$executeRawUnsafe(`
        INSERT INTO "BanggiasanphamHistory" (
          "id", "banggiasanphamId", "banggiaId", "sanphamId",
          "oldPrice", "newPrice", "changePercent", "changeReason",
          "changedBy", "changedAt", "sourceType", "batchId", "metadata"
        ) VALUES (
          gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9, $10, $11
        )
        RETURNING *
      `, data.banggiasanphamId, data.banggiaId, data.sanphamId, data.oldPrice, data.newPrice, changePercent, data.changeReason || 'Price update', data.changedBy || 'system', data.sourceType || 'MANUAL', data.batchId || null, data.metadata ? JSON.stringify(data.metadata) : null);
            this.logger.log(`Price history tracked: ${data.sanphamId} - ${data.oldPrice} → ${data.newPrice}`);
            return history;
        }
        catch (error) {
            this.logger.error('Failed to track price change:', error);
            throw error;
        }
    }
    async trackDonhangPriceChange(dto, oldPrice) {
        try {
            const changePercent = oldPrice !== 0 ? ((dto.newPrice - oldPrice) / oldPrice) * 100 : 0;
            const audit = await this.prisma.$executeRawUnsafe(`
        INSERT INTO "DonhangPriceAudit" (
          "id", "donhangId", "donhangsanphamId", "sanphamId",
          "oldPrice", "newPrice", "changePercent", "changeReason",
          "changedBy", "changedByEmail", "ipAddress", "userAgent",
          "createdAt", "metadata"
        ) VALUES (
          gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), $12
        )
        RETURNING *
      `, dto.donhangId, dto.donhangsanphamId, dto.sanphamId, oldPrice, dto.newPrice, changePercent, dto.changeReason, dto.changedBy || 'system', dto.changedByEmail || null, dto.ipAddress || null, dto.userAgent || null, null);
            this.logger.log(`Donhang price audit: ${dto.donhangId} - ${oldPrice} → ${dto.newPrice}`);
            return audit;
        }
        catch (error) {
            this.logger.error('Failed to track donhang price change:', error);
            throw error;
        }
    }
    async getBanggiaPriceHistory(dto) {
        try {
            let whereClause = '';
            const params = [];
            let paramIndex = 1;
            if (dto.banggiaId) {
                whereClause += `"banggiaId" = $${paramIndex}`;
                params.push(dto.banggiaId);
                paramIndex++;
            }
            if (dto.sanphamId) {
                if (whereClause)
                    whereClause += ' AND ';
                whereClause += `"sanphamId" = $${paramIndex}`;
                params.push(dto.sanphamId);
                paramIndex++;
            }
            const limit = dto.limit || 50;
            params.push(limit);
            const query = `
        SELECT * FROM "BanggiasanphamHistory"
        ${whereClause ? `WHERE ${whereClause}` : ''}
        ORDER BY "changedAt" DESC
        LIMIT $${paramIndex}
      `;
            const history = await this.prisma.$queryRawUnsafe(query, ...params);
            return history;
        }
        catch (error) {
            this.logger.error('Failed to get price history:', error);
            throw error;
        }
    }
    async getDonhangPriceAudit(dto) {
        try {
            let whereClause = '';
            const params = [];
            let paramIndex = 1;
            if (dto.donhangId) {
                whereClause += `"donhangId" = $${paramIndex}`;
                params.push(dto.donhangId);
                paramIndex++;
            }
            if (dto.sanphamId) {
                if (whereClause)
                    whereClause += ' AND ';
                whereClause += `"sanphamId" = $${paramIndex}`;
                params.push(dto.sanphamId);
                paramIndex++;
            }
            const limit = dto.limit || 50;
            params.push(limit);
            const query = `
        SELECT 
          dpa.*,
          s."masp",
          s."name" as "sanphamName"
        FROM "DonhangPriceAudit" dpa
        LEFT JOIN "Sanpham" s ON dpa."sanphamId" = s."id"
        ${whereClause ? `WHERE ${whereClause}` : ''}
        ORDER BY dpa."createdAt" DESC
        LIMIT $${paramIndex}
      `;
            const audit = await this.prisma.$queryRawUnsafe(query, ...params);
            return audit;
        }
        catch (error) {
            this.logger.error('Failed to get donhang price audit:', error);
            throw error;
        }
    }
    async getPriceComparison(sanphamId, banggiaId) {
        try {
            const query = `
        WITH CurrentPrice AS (
          SELECT 
            bg."mabanggia",
            bg."title" as "banggiaTitle",
            bgs."giaban" as "currentPrice",
            bgs."id" as "banggiasanphamId"
          FROM "Banggiasanpham" bgs
          JOIN "Banggia" bg ON bgs."banggiaId" = bg."id"
          WHERE bgs."sanphamId" = $1
            ${banggiaId ? `AND bg."id" = $2` : ''}
            AND bgs."isActive" = true
          LIMIT 1
        ),
        PriceHistory AS (
          SELECT 
            "oldPrice",
            "newPrice",
            "changePercent",
            "changeReason",
            "changedBy",
            "changedAt",
            "sourceType"
          FROM "BanggiasanphamHistory"
          WHERE "sanphamId" = $1
            ${banggiaId ? `AND "banggiaId" = $2` : ''}
          ORDER BY "changedAt" DESC
          LIMIT 10
        )
        SELECT 
          (SELECT row_to_json(cp) FROM CurrentPrice cp) as "currentPrice",
          (SELECT json_agg(ph) FROM PriceHistory ph) as "priceHistory"
      `;
            const params = banggiaId ? [sanphamId, banggiaId] : [sanphamId];
            const result = await this.prisma.$queryRawUnsafe(query, ...params);
            return result[0] || { currentPrice: null, priceHistory: [] };
        }
        catch (error) {
            this.logger.error('Failed to get price comparison:', error);
            throw error;
        }
    }
    async getPriceStatistics(sanphamId, days = 30) {
        try {
            const query = `
        SELECT 
          COUNT(*) as "totalChanges",
          AVG("changePercent") as "avgChangePercent",
          MIN("newPrice") as "minPrice",
          MAX("newPrice") as "maxPrice",
          AVG("newPrice") as "avgPrice"
        FROM "BanggiasanphamHistory"
        WHERE "sanphamId" = $1
          AND "changedAt" >= NOW() - INTERVAL '${days} days'
      `;
            const stats = await this.prisma.$queryRawUnsafe(query, sanphamId);
            return stats[0] || null;
        }
        catch (error) {
            this.logger.error('Failed to get price statistics:', error);
            throw error;
        }
    }
};
exports.PriceHistoryService = PriceHistoryService;
exports.PriceHistoryService = PriceHistoryService = PriceHistoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PriceHistoryService);
//# sourceMappingURL=price-history.service.js.map