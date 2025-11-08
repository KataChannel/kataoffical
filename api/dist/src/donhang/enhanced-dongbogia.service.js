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
exports.EnhancedDongbogiaService = void 0;
const common_1 = require("@nestjs/common");
const server_stability_service_1 = require("../common/server-stability.service");
const DEFAUL_BANGGIA_ID = '84a62698-5784-4ac3-b506-5e662d1511cb';
let EnhancedDongbogiaService = class EnhancedDongbogiaService {
    constructor(serverStability) {
        this.serverStability = serverStability;
    }
    async dongbogiaEnhanced(listdonhang) {
        console.log('🔄 Enhanced price sync for orders:', listdonhang.length);
        let totalUpdatedCount = 0;
        let totalErrorCount = 0;
        const batchSize = 3;
        const maxRetries = 2;
        const circuitBreakerKey = 'dongbogia_operation';
        if (!Array.isArray(listdonhang) || listdonhang.length === 0) {
            throw new common_1.BadRequestException('Invalid order list provided');
        }
        console.log(`📊 Processing ${listdonhang.length} orders in batches of ${batchSize}`);
        for (let i = 0; i < listdonhang.length; i += batchSize) {
            const batch = listdonhang.slice(i, i + batchSize);
            const batchNumber = Math.floor(i / batchSize) + 1;
            const totalBatches = Math.ceil(listdonhang.length / batchSize);
            console.log(`⚡ Processing batch ${batchNumber}/${totalBatches} (${batch.length} orders)`);
            let retryCount = 0;
            let batchSuccess = false;
            while (!batchSuccess && retryCount <= maxRetries) {
                try {
                    const batchResult = await this.serverStability.safeTransaction(async (prisma) => {
                        let updatedCount = 0;
                        let errorCount = 0;
                        for (const donhangId of batch) {
                            try {
                                if (!donhangId || typeof donhangId !== 'string') {
                                    console.warn(`❌ Invalid order ID: ${donhangId}`);
                                    errorCount++;
                                    continue;
                                }
                                const donhang = await Promise.race([
                                    prisma.donhang.findUnique({
                                        where: { id: donhangId },
                                        include: {
                                            banggia: {
                                                include: {
                                                    sanpham: {
                                                        include: { sanpham: true }
                                                    },
                                                },
                                            },
                                            khachhang: true,
                                            sanpham: {
                                                include: { sanpham: true }
                                            },
                                        },
                                    }),
                                    new Promise((_, reject) => setTimeout(() => reject(new Error('Order query timeout')), 5000))
                                ]);
                                if (!donhang) {
                                    console.warn(`❌ Order not found: ${donhangId}`);
                                    errorCount++;
                                    continue;
                                }
                                if (!donhang.banggia || !donhang.sanpham || donhang.sanpham.length === 0) {
                                    console.warn(`⚠️ Order ${donhang.madonhang} missing price list or products`);
                                    errorCount++;
                                    continue;
                                }
                                const banggiaDefault = await prisma.banggia.findUnique({
                                    where: { id: DEFAUL_BANGGIA_ID },
                                    include: {
                                        sanpham: { include: { sanpham: true } }
                                    },
                                });
                                console.log(`🔄 Updating prices for order ${donhang.madonhang} (${donhang.sanpham.length} products)`);
                                let tongchua = 0;
                                let hasUpdates = false;
                                const productUpdates = [];
                                for (const donhangSanpham of donhang.sanpham) {
                                    try {
                                        const giaSanpham = donhang.banggia.sanpham.find((bgsp) => bgsp.sanphamId === donhangSanpham.idSP);
                                        const giaSanphamDefault = banggiaDefault?.sanpham.find((bgsp) => bgsp.sanphamId === donhangSanpham.idSP);
                                        let giaban = 0;
                                        let giaSource = 'none';
                                        if (giaSanpham && Number(giaSanpham.giaban) > 0) {
                                            giaban = Number(giaSanpham.giaban);
                                            giaSource = `price list ${donhang.banggia.mabanggia}`;
                                        }
                                        else if (giaSanphamDefault && Number(giaSanphamDefault.giaban) > 0) {
                                            giaban = Number(giaSanphamDefault.giaban);
                                            giaSource = 'default price list';
                                        }
                                        else {
                                            console.warn(`⚠️ No valid price found for product ${donhangSanpham.sanpham?.title || donhangSanpham.idSP}`);
                                            continue;
                                        }
                                        const sldat = Number(donhangSanpham.sldat) || 0;
                                        const slgiao = Number(donhangSanpham.slgiao) || 0;
                                        const slnhan = Number(donhangSanpham.slnhan) || 0;
                                        const vat = Number(donhangSanpham.vat) || 0;
                                        const ttdat = giaban * sldat;
                                        const ttgiao = giaban * slgiao;
                                        const ttnhan = giaban * slnhan;
                                        const ttsauvat = ttnhan * (1 + vat);
                                        productUpdates.push({
                                            id: donhangSanpham.id,
                                            giaban,
                                            ttdat,
                                            ttgiao,
                                            ttnhan,
                                            ttsauvat
                                        });
                                        tongchua += ttnhan;
                                        hasUpdates = true;
                                        console.log(`✅ Updated product ${donhangSanpham.sanpham?.title} - Price: ${giaban} (from ${giaSource})`);
                                    }
                                    catch (productError) {
                                        console.error(`❌ Error updating product ${donhangSanpham.idSP}:`, productError.message);
                                    }
                                }
                                if (hasUpdates && productUpdates.length > 0) {
                                    const subBatchSize = 10;
                                    for (let pi = 0; pi < productUpdates.length; pi += subBatchSize) {
                                        const productBatch = productUpdates.slice(pi, pi + subBatchSize);
                                        await Promise.all(productBatch.map(update => prisma.donhangsanpham.update({
                                            where: { id: update.id },
                                            data: {
                                                giaban: update.giaban,
                                                ttdat: update.ttdat,
                                                ttgiao: update.ttgiao,
                                                ttnhan: update.ttnhan,
                                                ttsauvat: update.ttsauvat,
                                            },
                                        })));
                                    }
                                    const vatRate = Number(donhang.vat) || 0;
                                    const tongvat = tongchua * vatRate;
                                    const tongtien = tongchua + tongvat;
                                    await prisma.donhang.update({
                                        where: { id: donhangId },
                                        data: {
                                            tongvat,
                                            tongtien,
                                            updatedAt: new Date()
                                        },
                                    });
                                    console.log(`✅ Order ${donhang.madonhang}: Updated totals - Base: ${tongchua}, VAT: ${tongvat}, Total: ${tongtien}`);
                                }
                                updatedCount++;
                            }
                            catch (orderError) {
                                console.error(`❌ Error processing order ${donhangId}:`, orderError.message);
                                errorCount++;
                                continue;
                            }
                        }
                        return { updatedCount, errorCount };
                    }, {
                        timeout: 20000,
                        maxWait: 25000,
                        circuitBreakerKey,
                        retryCount
                    });
                    totalUpdatedCount += batchResult.updatedCount;
                    totalErrorCount += batchResult.errorCount;
                    batchSuccess = true;
                    console.log(`✅ Batch ${batchNumber} completed: ${batchResult.updatedCount} success, ${batchResult.errorCount} errors`);
                }
                catch (batchError) {
                    retryCount++;
                    console.error(`❌ Batch ${batchNumber} failed (attempt ${retryCount}):`, batchError.message);
                    if (retryCount <= maxRetries) {
                        console.log(`⏳ Retrying batch ${batchNumber} in ${retryCount * 2} seconds...`);
                        await new Promise(resolve => setTimeout(resolve, retryCount * 2000));
                    }
                    else {
                        console.error(`💀 Batch ${batchNumber} failed after ${maxRetries} retries, skipping`);
                        totalErrorCount += batch.length;
                    }
                }
                if (batchSuccess && i + batchSize < listdonhang.length) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            }
        }
        const successRate = Math.round((totalUpdatedCount / listdonhang.length) * 100);
        console.log(`🎯 Price sync completed: ${totalUpdatedCount}/${listdonhang.length} orders (${successRate}%)`);
        return {
            status: 'completed',
            message: `Price sync completed: ${totalUpdatedCount} successful, ${totalErrorCount} failed`,
            stats: {
                totalOrders: listdonhang.length,
                successful: totalUpdatedCount,
                failed: totalErrorCount,
                successRate: successRate
            }
        };
    }
};
exports.EnhancedDongbogiaService = EnhancedDongbogiaService;
exports.EnhancedDongbogiaService = EnhancedDongbogiaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [server_stability_service_1.ServerStabilityService])
], EnhancedDongbogiaService);
//# sourceMappingURL=enhanced-dongbogia.service.js.map