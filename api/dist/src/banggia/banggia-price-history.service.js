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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanggiaPriceHistoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BanggiaPriceHistoryService = class BanggiaPriceHistoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updatePrice(params) {
        const { banggiaId, sanphamId, newPrice, userId, reason } = params;
        if (newPrice < 0) {
            throw new common_1.BadRequestException('Giá không thể âm');
        }
        return await this.prisma.$transaction(async (tx) => {
            const currentBgsp = await tx.banggiasanpham.findFirst({
                where: { banggiaId, sanphamId },
                include: {
                    banggia: { select: { id: true, mabanggia: true, title: true } },
                    sanpham: { select: { id: true, masp: true, title: true } }
                }
            });
            if (!currentBgsp) {
                const newBgsp = await tx.banggiasanpham.create({
                    data: {
                        banggiaId,
                        sanphamId,
                        giaban: newPrice,
                        isActive: true
                    },
                    include: {
                        banggia: { select: { mabanggia: true, title: true } },
                        sanpham: { select: { masp: true, title: true } }
                    }
                });
                let userEmail = 'system';
                if (userId && userId !== 'system') {
                    const user = await tx.user.findUnique({
                        where: { id: userId },
                        select: { email: true, name: true }
                    });
                    userEmail = user?.email || user?.name || userId;
                }
                await tx.banggiasanphamHistory.create({
                    data: {
                        banggiasanphamId: newBgsp.id,
                        banggiaId,
                        sanphamId,
                        oldPrice: 0,
                        newPrice: newPrice,
                        changePercent: 0,
                        changeReason: reason || 'Tạo giá mới',
                        changedBy: userEmail,
                        sourceType: 'MANUAL',
                        metadata: {
                            userId: userId,
                            banggiaCode: newBgsp.banggia.mabanggia,
                            banggiaTitle: newBgsp.banggia.title,
                            sanphamCode: newBgsp.sanpham.masp,
                            sanphamTitle: newBgsp.sanpham.title,
                            action: 'CREATE'
                        }
                    }
                });
                return {
                    action: 'CREATED',
                    data: newBgsp,
                    oldPrice: null,
                    newPrice
                };
            }
            const oldPrice = Number(currentBgsp.giaban);
            if (oldPrice === newPrice) {
                return {
                    action: 'NO_CHANGE',
                    message: 'Giá không thay đổi',
                    currentPrice: oldPrice
                };
            }
            const priceChange = Math.abs((newPrice - oldPrice) / oldPrice);
            const hasValidReason = reason && reason.trim().length > 0;
            if (priceChange > 0.2) {
                if (hasValidReason) {
                    console.log(`⚠️  [PRICE-UPDATE] Large price change with reason:`, {
                        oldPrice,
                        newPrice,
                        priceChange: (priceChange * 100).toFixed(1) + '%',
                        reason
                    });
                }
                else {
                    console.warn(`⚠️  [PRICE-UPDATE] Large price change WITHOUT reason:`, {
                        oldPrice,
                        newPrice,
                        priceChange: (priceChange * 100).toFixed(1) + '%',
                        note: 'Consider adding reason for audit purposes'
                    });
                }
            }
            const updated = await tx.banggiasanpham.update({
                where: { id: currentBgsp.id },
                data: { giaban: newPrice },
                include: {
                    banggia: { select: { mabanggia: true, title: true } },
                    sanpham: { select: { masp: true, title: true } }
                }
            });
            const percentChange = oldPrice > 0 ? ((newPrice - oldPrice) / oldPrice) * 100 : 0;
            let userEmail = 'system';
            let userName = 'system';
            if (userId && userId !== 'system') {
                const user = await tx.user.findUnique({
                    where: { id: userId },
                    select: { email: true, name: true }
                });
                userEmail = user?.email || user?.name || userId;
                userName = user?.name || user?.email || userId;
            }
            await tx.banggiasanphamHistory.create({
                data: {
                    banggiasanphamId: currentBgsp.id,
                    banggiaId,
                    sanphamId,
                    oldPrice: oldPrice,
                    newPrice: newPrice,
                    changePercent: percentChange,
                    changeReason: reason || `Cập nhật giá: ${oldPrice.toLocaleString()} → ${newPrice.toLocaleString()}`,
                    changedBy: userEmail,
                    sourceType: 'MANUAL',
                    metadata: {
                        userId: userId,
                        userName: userName,
                        banggiaCode: currentBgsp.banggia.mabanggia,
                        banggiaTitle: currentBgsp.banggia.title,
                        sanphamCode: currentBgsp.sanpham.masp,
                        sanphamTitle: currentBgsp.sanpham.title,
                        difference: newPrice - oldPrice,
                        action: 'UPDATE'
                    }
                }
            });
            console.log(`📝 Price history logged for ${currentBgsp.sanpham.masp}`);
            console.log(`   Old: ${oldPrice} → New: ${newPrice} (${percentChange.toFixed(2)}%)`);
            console.log(`   Changed by: ${userEmail} (${userName})`);
            console.log(`   Reason: ${reason || 'No reason provided'}`);
            console.log(`✅ Updated price: ${currentBgsp.sanpham.masp} in ${currentBgsp.banggia.mabanggia}: ${oldPrice} → ${newPrice}`);
            return {
                action: 'UPDATED',
                data: updated,
                oldPrice,
                newPrice,
                changePercent: priceChange * 100
            };
        });
    }
    async getPriceHistory(banggiaId, sanphamId, options) {
        const bgsp = await this.prisma.banggiasanpham.findFirst({
            where: { banggiaId, sanphamId },
            include: {
                banggia: { select: { mabanggia: true, title: true } },
                sanpham: { select: { masp: true, title: true } }
            }
        });
        console.log('[PRICE-HISTORY] Query for:', { banggiaId, sanphamId });
        console.log('[PRICE-HISTORY] Found bgsp:', bgsp ? bgsp.id : 'NOT FOUND');
        if (!bgsp) {
            console.warn('[PRICE-HISTORY] No banggiasanpham found');
            return [];
        }
        const where = {
            banggiasanphamId: bgsp.id
        };
        if (options?.from || options?.to) {
            where.changedAt = {};
            if (options.from)
                where.changedAt.gte = options.from;
            if (options.to)
                where.changedAt.lte = options.to;
        }
        const history = await this.prisma.banggiasanphamHistory.findMany({
            where,
            orderBy: { changedAt: 'desc' },
            take: options?.limit || 100,
            select: {
                id: true,
                oldPrice: true,
                newPrice: true,
                changePercent: true,
                changeReason: true,
                changedBy: true,
                changedAt: true,
                sourceType: true,
                batchId: true,
                metadata: true
            }
        });
        console.log(`[PRICE-HISTORY] Found ${history.length} records`);
        return history.map(record => {
            const difference = Number(record.newPrice) - Number(record.oldPrice);
            const percentChange = Number(record.changePercent);
            const userName = record.metadata?.['userName'] || record.changedBy;
            const userId = record.metadata?.['userId'] || null;
            return {
                id: record.id,
                oldPrice: Number(record.oldPrice),
                newPrice: Number(record.newPrice),
                difference,
                percentChange,
                reason: record.changeReason,
                changedAt: record.changedAt,
                changedBy: record.changedBy,
                changedByName: userName,
                changedByUserId: userId,
                sourceType: record.sourceType,
                batchId: record.batchId,
                banggia: {
                    id: banggiaId,
                    code: bgsp.banggia.mabanggia,
                    title: bgsp.banggia.title
                },
                sanpham: {
                    id: sanphamId,
                    code: bgsp.sanpham.masp,
                    title: bgsp.sanpham.title
                },
                metadata: record.metadata
            };
        });
    }
    async getCurrentPrice(banggiaId, sanphamId) {
        const bgsp = await this.prisma.banggiasanpham.findFirst({
            where: { banggiaId, sanphamId }
        });
        return bgsp ? Number(bgsp.giaban) : null;
    }
    async bulkUpdatePrices(updates, userId, reason) {
        const results = [];
        for (const update of updates) {
            try {
                const result = await this.updatePrice({
                    ...update,
                    userId,
                    reason
                });
                results.push({ success: true, ...update, result });
            }
            catch (error) {
                results.push({
                    success: false,
                    ...update,
                    error: error.message
                });
            }
        }
        const summary = {
            total: updates.length,
            successful: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length,
            results
        };
        console.log(`📊 Bulk price update: ${summary.successful}/${summary.total} successful`);
        return summary;
    }
};
exports.BanggiaPriceHistoryService = BanggiaPriceHistoryService;
exports.BanggiaPriceHistoryService = BanggiaPriceHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BanggiaPriceHistoryService);
//# sourceMappingURL=banggia-price-history.service.js.map