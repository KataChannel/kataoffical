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
var PhieuGiaoHangOptimizedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhieuGiaoHangOptimizedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PhieuGiaoHangOptimizedService = PhieuGiaoHangOptimizedService_1 = class PhieuGiaoHangOptimizedService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(PhieuGiaoHangOptimizedService_1.name);
        this.BATCH_SIZE = 10;
        this.TRANSACTION_TIMEOUT = 30000;
    }
    async updatePhieugiaoOptimized(id, data) {
        const startTime = performance.now();
        try {
            return await this.prisma.$transaction(async (prisma) => {
                const currentOrder = await prisma.donhang.findUnique({
                    where: { id },
                    include: { sanpham: true }
                });
                if (!currentOrder) {
                    throw new Error('Order not found');
                }
                if (data.sanpham && data.sanpham.length > 0) {
                    const currentSanphamIds = currentOrder.sanpham.map(sp => sp.idSP);
                    const newSanphamIds = data.sanpham.map((sp) => sp.id);
                    const sanphamToDelete = currentSanphamIds.filter(spId => !newSanphamIds.includes(spId));
                    if (sanphamToDelete.length > 0) {
                        await prisma.donhangsanpham.deleteMany({
                            where: {
                                donhangId: id,
                                idSP: { in: sanphamToDelete }
                            }
                        });
                    }
                    const updatePromises = data.sanpham.map((sp) => prisma.donhangsanpham.updateMany({
                        where: {
                            donhangId: id,
                            idSP: sp.id
                        },
                        data: {
                            ghichu: sp.ghichu,
                            sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                            slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                            ttdat: parseFloat((sp.ttdat ?? 0).toFixed(3)),
                            ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
                            ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(3)),
                            vat: parseFloat((sp.vat ?? 0).toFixed(3)),
                            ttsauvat: parseFloat((sp.ttsauvat ?? 0).toFixed(3)),
                        },
                    }));
                    await Promise.all(updatePromises);
                }
                const updatedOrder = await prisma.donhang.update({
                    where: { id },
                    data: {
                        status: data.status,
                        ghichu: data.ghichu,
                        ngaygiao: data.ngaygiao ? new Date(data.ngaygiao) : undefined,
                    },
                    include: {
                        sanpham: {
                            include: { sanpham: true }
                        },
                        khachhang: true
                    }
                });
                return updatedOrder;
            }, {
                timeout: this.TRANSACTION_TIMEOUT,
                maxWait: 5000
            });
        }
        catch (error) {
            const duration = performance.now() - startTime;
            this.logger.error(`updatePhieugiao failed after ${duration}ms for order ${id}:`, error);
            throw error;
        }
        finally {
            const duration = performance.now() - startTime;
            if (duration > 5000) {
                this.logger.warn(`SLOW OPERATION: updatePhieugiao took ${duration}ms for order ${id}`);
            }
        }
    }
    async updateBulkOptimized(ids, status) {
        const startTime = performance.now();
        let totalSuccess = 0;
        let totalFail = 0;
        this.logger.log(`Starting bulk update for ${ids.length} orders with status: ${status}`);
        for (let i = 0; i < ids.length; i += this.BATCH_SIZE) {
            const batch = ids.slice(i, i + this.BATCH_SIZE);
            const batchStartTime = performance.now();
            try {
                const { success, fail } = await this.processBatch(batch, status);
                totalSuccess += success;
                totalFail += fail;
                const batchDuration = performance.now() - batchStartTime;
                this.logger.log(`Batch ${Math.floor(i / this.BATCH_SIZE) + 1} completed: ${success}/${batch.length} successful in ${batchDuration}ms`);
                if (i + this.BATCH_SIZE < ids.length) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            catch (error) {
                this.logger.error(`Batch ${Math.floor(i / this.BATCH_SIZE) + 1} failed:`, error);
                totalFail += batch.length;
            }
        }
        const totalDuration = performance.now() - startTime;
        this.logger.log(`Bulk update completed: ${totalSuccess}/${ids.length} successful in ${totalDuration}ms`);
        return { success: totalSuccess, fail: totalFail };
    }
    async processBatch(batchIds, status) {
        return await this.prisma.$transaction(async (prisma) => {
            let success = 0;
            let fail = 0;
            const batchPromises = batchIds.map(async (id) => {
                try {
                    const oldDonhang = await prisma.donhang.findUnique({
                        where: { id },
                        include: { sanpham: true }
                    });
                    if (!oldDonhang) {
                        return { success: 0, fail: 1 };
                    }
                    if (oldDonhang.status === 'dadat' && status === 'danhan') {
                        const inventoryUpdates = oldDonhang.sanpham.map(sp => {
                            const decValue = parseFloat((sp.sldat ?? 0).toFixed(3));
                            return prisma.tonKho.update({
                                where: { sanphamId: sp.idSP },
                                data: {
                                    slchogiao: { decrement: decValue },
                                    slton: { decrement: decValue },
                                },
                            });
                        });
                        await Promise.all(inventoryUpdates);
                        await prisma.donhang.update({
                            where: { id },
                            data: {
                                status: 'danhan',
                                sanpham: {
                                    updateMany: oldDonhang.sanpham.map((sp) => ({
                                        where: { idSP: sp.idSP },
                                        data: {
                                            slgiao: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                            slnhan: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                        },
                                    })),
                                },
                            },
                        });
                    }
                    return { success: 1, fail: 0 };
                }
                catch (error) {
                    this.logger.error(`Error processing order ${id}:`, error);
                    return { success: 0, fail: 1 };
                }
            });
            const results = await Promise.all(batchPromises);
            results.forEach(result => {
                success += result.success;
                fail += result.fail;
            });
            return { success, fail };
        }, {
            timeout: this.TRANSACTION_TIMEOUT,
            maxWait: 5000
        });
    }
    async healthCheck() {
        const startTime = performance.now();
        try {
            const count = await this.prisma.donhang.count({
                where: { status: 'dadat' }
            });
            const duration = performance.now() - startTime;
            return {
                status: 'healthy',
                duration,
                pendingOrders: count,
                timestamp: new Date().toISOString()
            };
        }
        catch (error) {
            const duration = performance.now() - startTime;
            return {
                status: 'unhealthy',
                duration,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }
};
exports.PhieuGiaoHangOptimizedService = PhieuGiaoHangOptimizedService;
exports.PhieuGiaoHangOptimizedService = PhieuGiaoHangOptimizedService = PhieuGiaoHangOptimizedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PhieuGiaoHangOptimizedService);
//# sourceMappingURL=phieugiaohang-optimized.service.js.map