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
exports.CancelOrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const ioredis_1 = require("ioredis");
let CancelOrderService = class CancelOrderService {
    constructor(prisma) {
        this.prisma = prisma;
        this.redis = new ioredis_1.default({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
        });
    }
    async invalidateDonhangCache(orderId) {
        try {
            const patterns = [
                `*donhang*${orderId}*`,
                `*donhang*`,
                `*tonkho*`,
                `*phieukho*`
            ];
            for (const pattern of patterns) {
                const keys = await this.redis.keys(pattern);
                if (keys && keys.length > 0) {
                    await this.redis.del(...keys);
                    console.log(`[CACHE] Invalidated ${keys.length} keys for pattern: ${pattern}`);
                }
            }
        }
        catch (error) {
            console.error('[CACHE] Error invalidating donhang cache:', error);
        }
    }
    async invalidateDathangCache(orderId) {
        try {
            const patterns = [
                `*dathang*${orderId}*`,
                `*dathang*`,
                `*tonkho*`,
                `*phieukho*`
            ];
            for (const pattern of patterns) {
                const keys = await this.redis.keys(pattern);
                if (keys && keys.length > 0) {
                    await this.redis.del(...keys);
                    console.log(`[CACHE] Invalidated ${keys.length} keys for pattern: ${pattern}`);
                }
            }
        }
        catch (error) {
            console.error('[CACHE] Error invalidating dathang cache:', error);
        }
    }
    async cancelDonhang(dto) {
        const { orderId, lydohuy, userId } = dto;
        if (!lydohuy || lydohuy.trim().length === 0) {
            throw new common_1.BadRequestException('Lý do hủy đơn hàng là bắt buộc');
        }
        if (lydohuy.trim().length < 10) {
            throw new common_1.BadRequestException('Lý do hủy phải có ít nhất 10 ký tự');
        }
        const donhang = await this.prisma.donhang.findUnique({
            where: { id: orderId },
            include: {
                sanpham: {
                    include: {
                        sanpham: true
                    }
                },
                PhieuKho: true
            }
        });
        if (!donhang) {
            throw new common_1.NotFoundException('Không tìm thấy đơn hàng');
        }
        if (donhang.status === 'huy') {
            throw new common_1.BadRequestException('Đơn hàng đã được hủy trước đó');
        }
        const hasPhieuXuatKho = donhang.PhieuKho && donhang.PhieuKho.length > 0;
        const oldStatus = donhang.status;
        const restoredItems = [];
        const result = await this.prisma.$transaction(async (tx) => {
            if (hasPhieuXuatKho && donhang.sanpham && donhang.sanpham.length > 0) {
                console.log(`[CancelOrder] Hoàn trả tồn kho cho đơn hàng ${donhang.madonhang}`);
                for (const item of donhang.sanpham) {
                    const slgiao = Number(item.slgiao || 0);
                    if (item.sanpham && slgiao > 0) {
                        const sanphamId = item.sanpham.id;
                        await tx.tonKho.upsert({
                            where: { sanphamId },
                            create: {
                                sanphamId,
                                slton: slgiao,
                                sltontt: slgiao,
                                slchogiao: 0,
                                slchonhap: 0,
                            },
                            update: {
                                slton: {
                                    increment: slgiao
                                },
                                sltontt: {
                                    increment: slgiao
                                }
                            }
                        });
                        restoredItems.push({
                            masp: item.sanpham.masp,
                            tensanpham: item.sanpham.title,
                            soluong: slgiao
                        });
                        console.log(`[CancelOrder] Hoàn trả ${slgiao} ${item.sanpham.masp} vào kho`);
                    }
                }
                await tx.phieuKho.deleteMany({
                    where: {
                        donhang: {
                            id: orderId
                        }
                    }
                });
                console.log(`[CancelOrder] Đã xóa ${donhang.PhieuKho.length} phiếu xuất kho`);
            }
            const updatedDonhang = await tx.donhang.update({
                where: { id: orderId },
                data: {
                    status: 'huy',
                    lydohuy: lydohuy.trim(),
                    updatedAt: new Date()
                },
                include: {
                    sanpham: {
                        include: {
                            sanpham: true
                        }
                    },
                    khachhang: true
                }
            });
            if (userId) {
                await tx.auditLog.create({
                    data: {
                        userId: userId,
                        action: 'UPDATE',
                        entityName: 'Donhang',
                        entityId: orderId,
                        oldValues: { status: oldStatus },
                        newValues: { status: 'huy', lydohuy: lydohuy.trim() },
                        metadata: {
                            actionType: 'CANCEL',
                            inventoryRestored: hasPhieuXuatKho,
                            restoredItems
                        }
                    }
                });
            }
            return {
                success: true,
                message: hasPhieuXuatKho
                    ? 'Đơn hàng đã được hủy và tồn kho đã được hoàn trả'
                    : 'Đơn hàng đã được hủy',
                data: updatedDonhang,
                restoredInventory: hasPhieuXuatKho,
                oldStatus
            };
        });
        await this.invalidateDonhangCache(orderId);
        console.log(`[CancelOrder] Cache invalidated for donhang: ${orderId}`);
        return result;
    }
    async cancelDathang(dto) {
        const { orderId, lydohuy, userId } = dto;
        if (!lydohuy || lydohuy.trim().length === 0) {
            throw new common_1.BadRequestException('Lý do hủy đơn đặt hàng là bắt buộc');
        }
        if (lydohuy.trim().length < 10) {
            throw new common_1.BadRequestException('Lý do hủy phải có ít nhất 10 ký tự');
        }
        const dathang = await this.prisma.dathang.findUnique({
            where: { id: orderId },
            include: {
                sanpham: {
                    include: {
                        sanpham: true
                    }
                },
                PhieuKho: true
            }
        });
        if (!dathang) {
            throw new common_1.NotFoundException('Không tìm thấy đơn đặt hàng');
        }
        if (dathang.status === 'huy') {
            throw new common_1.BadRequestException('Đơn đặt hàng đã được hủy trước đó');
        }
        const hasPhieuNhapKho = dathang.PhieuKho && dathang.PhieuKho.length > 0;
        const oldStatus = dathang.status;
        const restoredItems = [];
        const result = await this.prisma.$transaction(async (tx) => {
            if (hasPhieuNhapKho && dathang.sanpham && dathang.sanpham.length > 0) {
                console.log(`[CancelOrder] Trừ tồn kho cho đơn đặt hàng ${dathang.madncc}`);
                for (const item of dathang.sanpham) {
                    const slnhan = Number(item.slnhan || 0);
                    if (item.sanpham && slnhan > 0) {
                        const sanphamId = item.sanpham.id;
                        const currentTonKho = await tx.tonKho.findUnique({
                            where: { sanphamId }
                        });
                        if (currentTonKho) {
                            const newSlton = Math.max(0, Number(currentTonKho.slton) - slnhan);
                            const newSltontt = Math.max(0, Number(currentTonKho.sltontt) - slnhan);
                            await tx.tonKho.update({
                                where: { sanphamId },
                                data: {
                                    slton: newSlton,
                                    sltontt: newSltontt
                                }
                            });
                            restoredItems.push({
                                masp: item.sanpham.masp,
                                tensanpham: item.sanpham.title,
                                soluong: slnhan,
                                oldTonkho: Number(currentTonKho.slton),
                                newTonkho: newSlton
                            });
                            console.log(`[CancelOrder] Trừ ${slnhan} ${item.sanpham.masp} khỏi kho (Tồn kho: ${currentTonKho.slton} → ${newSlton})`);
                        }
                    }
                }
                await tx.phieuKho.deleteMany({
                    where: {
                        dathang: {
                            id: orderId
                        }
                    }
                });
                console.log(`[CancelOrder] Đã xóa ${dathang.PhieuKho.length} phiếu nhập kho`);
            }
            const updatedDathang = await tx.dathang.update({
                where: { id: orderId },
                data: {
                    status: 'huy',
                    lydohuy: lydohuy.trim(),
                    updatedAt: new Date()
                },
                include: {
                    sanpham: {
                        include: {
                            sanpham: true
                        }
                    },
                    nhacungcap: true
                }
            });
            if (userId) {
                await tx.auditLog.create({
                    data: {
                        userId: userId,
                        action: 'UPDATE',
                        entityName: 'Dathang',
                        entityId: orderId,
                        oldValues: { status: oldStatus },
                        newValues: { status: 'huy', lydohuy: lydohuy.trim() },
                        metadata: {
                            actionType: 'CANCEL',
                            inventoryRestored: hasPhieuNhapKho,
                            restoredItems
                        }
                    }
                });
            }
            return {
                success: true,
                message: hasPhieuNhapKho
                    ? 'Đơn đặt hàng đã được hủy và tồn kho đã được điều chỉnh'
                    : 'Đơn đặt hàng đã được hủy',
                data: updatedDathang,
                restoredInventory: hasPhieuNhapKho,
                oldStatus
            };
        });
        await this.invalidateDathangCache(orderId);
        console.log(`[CancelOrder] Cache invalidated for dathang: ${orderId}`);
        return result;
    }
    async getCanceledOrders(type, options) {
        const where = {
            status: 'huy'
        };
        if (options?.startDate || options?.endDate) {
            where.updatedAt = {};
            if (options.startDate) {
                where.updatedAt.gte = options.startDate;
            }
            if (options.endDate) {
                where.updatedAt.lte = options.endDate;
            }
        }
        if (type === 'donhang') {
            return await this.prisma.donhang.findMany({
                where,
                include: {
                    khachhang: true,
                    sanpham: {
                        include: {
                            sanpham: true
                        }
                    }
                },
                orderBy: {
                    updatedAt: 'desc'
                },
                skip: options?.skip || 0,
                take: options?.take || 50
            });
        }
        else {
            return await this.prisma.dathang.findMany({
                where,
                include: {
                    nhacungcap: true,
                    sanpham: {
                        include: {
                            sanpham: true
                        }
                    }
                },
                orderBy: {
                    updatedAt: 'desc'
                },
                skip: options?.skip || 0,
                take: options?.take || 50
            });
        }
    }
};
exports.CancelOrderService = CancelOrderService;
exports.CancelOrderService = CancelOrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CancelOrderService);
//# sourceMappingURL=cancel-order.service.js.map