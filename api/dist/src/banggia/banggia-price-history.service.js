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
                if (userId) {
                    await tx.auditLog.create({
                        data: {
                            entityName: 'Banggiasanpham',
                            entityId: newBgsp.id,
                            action: 'CREATE',
                            userId,
                            newValues: { giaban: newPrice },
                            metadata: {
                                banggiaId,
                                banggiaCode: newBgsp.banggia.mabanggia,
                                banggiaTitle: newBgsp.banggia.title,
                                sanphamId,
                                sanphamCode: newBgsp.sanpham.masp,
                                sanphamTitle: newBgsp.sanpham.title,
                                reason: reason || 'Tạo giá mới',
                                timestamp: new Date().toISOString()
                            }
                        }
                    });
                }
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
            if (userId) {
                await tx.auditLog.create({
                    data: {
                        entityName: 'Banggiasanpham',
                        entityId: currentBgsp.id,
                        action: 'UPDATE',
                        userId,
                        oldValues: { giaban: oldPrice },
                        newValues: { giaban: newPrice },
                        changedFields: ['giaban'],
                        metadata: {
                            banggiaId,
                            banggiaCode: currentBgsp.banggia.mabanggia,
                            banggiaTitle: currentBgsp.banggia.title,
                            sanphamId,
                            sanphamCode: currentBgsp.sanpham.masp,
                            sanphamTitle: currentBgsp.sanpham.title,
                            priceChange: {
                                oldPrice,
                                newPrice,
                                difference: newPrice - oldPrice,
                                percentChange: priceChange * 100
                            },
                            reason: reason || `Cập nhật giá: ${oldPrice.toLocaleString()} → ${newPrice.toLocaleString()}`,
                            timestamp: new Date().toISOString()
                        }
                    }
                });
            }
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
        if (!bgsp) {
            return [];
        }
        const where = {
            entityName: 'Banggiasanpham',
            entityId: bgsp.id,
            action: { in: ['CREATE', 'UPDATE'] }
        };
        if (options?.from || options?.to) {
            where.createdAt = {};
            if (options.from)
                where.createdAt.gte = options.from;
            if (options.to)
                where.createdAt.lte = options.to;
        }
        const logs = await this.prisma.auditLog.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: options?.limit || 100,
            select: {
                id: true,
                action: true,
                oldValues: true,
                newValues: true,
                metadata: true,
                createdAt: true,
                userId: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true
                    }
                }
            }
        });
        return logs.map(log => ({
            id: log.id,
            action: log.action,
            oldPrice: log.oldValues?.['giaban'] || null,
            newPrice: log.newValues?.['giaban'] || null,
            reason: log.metadata?.['reason'] || null,
            priceChange: log.metadata?.['priceChange'] || null,
            changedAt: log.createdAt,
            changedBy: log.user ? {
                id: log.user.id,
                email: log.user.email,
                name: log.user.name
            } : null,
            banggia: {
                id: banggiaId,
                code: bgsp.banggia.mabanggia,
                title: bgsp.banggia.title
            },
            sanpham: {
                id: sanphamId,
                code: bgsp.sanpham.masp,
                title: bgsp.sanpham.title
            }
        }));
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