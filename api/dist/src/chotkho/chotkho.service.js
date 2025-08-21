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
exports.ChotkhoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const phieukho_service_1 = require("../phieukho/phieukho.service");
let ChotkhoService = class ChotkhoService {
    constructor(prisma, phieukhoService) {
        this.prisma = prisma;
        this.phieukhoService = phieukhoService;
    }
    convertDateFilters(filters) {
        const result = {};
        if (filters.fromDate) {
            result.fromDate = new Date(filters.fromDate);
        }
        if (filters.toDate) {
            result.toDate = new Date(filters.toDate);
        }
        return result;
    }
    getStartOfDay(date) {
        const d = new Date(date);
        d.setUTCHours(0, 0, 0, 0);
        return d;
    }
    getEndOfDay(date) {
        const d = new Date(date);
        d.setUTCHours(23, 59, 59, 999);
        return d;
    }
    async getLastUpdatedChotkho() {
        try {
            const item = await this.prisma.chotkho.findFirst({
                orderBy: { updatedAt: 'desc' },
            });
            return { updatedAt: item ? item.updatedAt.getTime() : 0 };
        }
        catch (error) {
            console.log('Error getting last updated chotkho:', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
            const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
            return `CK-${timestamp}-${randomPart}`;
        }
        catch (error) {
            console.log('Error generating codeId:', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const codeId = await this.generateCodeId();
            return await this.prisma.$transaction(async (prisma) => {
                const chotkho = await prisma.chotkho.create({
                    data: {
                        codeId,
                        title: data.title || `Chốt kho ${new Date().toLocaleDateString('vi-VN')}`,
                        ghichu: data.ghichu || '',
                        ngay: data.ngay ? new Date(data.ngay) : new Date(),
                        khoId: data.khoId,
                        isActive: true
                    }
                });
                return {
                    success: true,
                    data: chotkho,
                    message: 'Tạo chốt kho thành công'
                };
            });
        }
        catch (error) {
            console.error('Error creating chotkho:', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const chotkho = await this.prisma.chotkho.findUnique({
                where: { id },
                include: {
                    details: {
                        include: {
                            sanpham: {
                                select: {
                                    id: true,
                                    title: true,
                                    masp: true
                                }
                            },
                            phieukho: true
                        },
                        orderBy: { order: 'asc' }
                    },
                    kho: true
                }
            });
            if (!chotkho) {
                throw new common_1.NotFoundException('Không tìm thấy chốt kho');
            }
            return chotkho;
        }
        catch (error) {
            console.error('Error finding chotkho:', error);
            throw error;
        }
    }
    async findAll(query) {
        try {
            const { page = 1, limit = 20, khoId, fromDate, toDate } = query;
            const skip = (page - 1) * limit;
            const where = {};
            if (khoId) {
                where.khoId = khoId;
            }
            if (fromDate || toDate) {
                where.ngay = {};
                if (fromDate) {
                    where.ngay.gte = this.getStartOfDay(fromDate);
                }
                if (toDate) {
                    where.ngay.lte = this.getEndOfDay(toDate);
                }
            }
            const [data, total] = await Promise.all([
                this.prisma.chotkho.findMany({
                    where,
                    include: {
                        kho: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        details: {
                            select: {
                                id: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    skip,
                    take: limit
                }),
                this.prisma.chotkho.count({ where })
            ]);
            return {
                data: data.map(item => ({
                    ...item,
                    detailCount: item.details.length
                })),
                total,
                page,
                limit,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            console.error('Error finding all chotkho:', error);
            throw error;
        }
    }
    async getTonkhoWithPendingQuantities(khoId) {
        try {
            const where = {};
            if (khoId) {
                where.khoId = khoId;
            }
            const tonkhos = await this.prisma.tonKho.findMany({
                where,
                include: {
                    sanpham: {
                        select: {
                            id: true,
                            title: true,
                            masp: true
                        }
                    }
                }
            });
            const result = await Promise.all(tonkhos.map(async (tonkho) => {
                const pendingDeliveryCount = await this.prisma.donhang.count({
                    where: {
                        status: { in: ['dadat', 'dagiao'] },
                        sanpham: {
                            some: {
                                idSP: tonkho.sanphamId,
                                slgiao: { gt: 0 }
                            }
                        }
                    }
                });
                const pendingReceiptCount = await this.prisma.dathang.count({
                    where: {
                        status: { in: ['dadat', 'dagiao'] },
                        sanpham: {
                            some: {
                                idSP: tonkho.sanphamId,
                                slgiao: { gt: 0 }
                            }
                        }
                    }
                });
                return {
                    ...tonkho,
                    pendingDeliveries: pendingDeliveryCount,
                    pendingReceipts: pendingReceiptCount,
                    hasPendingOrders: pendingDeliveryCount > 0 || pendingReceiptCount > 0
                };
            }));
            return result;
        }
        catch (error) {
            console.error('Error getting tonkho with pending quantities:', error);
            throw error;
        }
    }
    async createChotkhoDetails(chotkhoId, excelData) {
        try {
            return await this.prisma.$transaction(async (prisma) => {
                let createdCount = 0;
                for (const item of excelData) {
                    const sanpham = await prisma.sanpham.findFirst({
                        where: { masp: item.masp }
                    });
                    if (!sanpham) {
                        console.warn(`Không tìm thấy sản phẩm với mã: ${item.masp}`);
                        continue;
                    }
                    const tonkho = await prisma.tonKho.findUnique({
                        where: { sanphamId: sanpham.id }
                    });
                    const slhethong = Number(tonkho?.slton || 0);
                    const slthucte = Number(item.soluong || 0);
                    const chenhlech = slthucte - slhethong;
                    await prisma.chotkhoDetail.create({
                        data: {
                            chotkhoId,
                            sanphamId: sanpham.id,
                            tonkhoId: tonkho?.id,
                            slthucte,
                            slhethong,
                            chenhlech,
                            ghichu: item.ghichu || '',
                            order: createdCount + 1
                        }
                    });
                    createdCount++;
                }
                return {
                    success: true,
                    count: createdCount,
                    message: `Đã tạo ${createdCount} chi tiết chốt kho`
                };
            });
        }
        catch (error) {
            console.error('Error creating chotkho details:', error);
            return {
                success: false,
                count: 0,
                message: error.message || 'Lỗi tạo chi tiết chốt kho'
            };
        }
    }
    async updateTonkhoAfterClose(chotkhoId) {
        try {
            return await this.prisma.$transaction(async (prisma) => {
                const details = await prisma.chotkhoDetail.findMany({
                    where: { chotkhoId },
                    include: {
                        sanpham: true,
                        chotkho: true
                    }
                });
                if (details.length === 0) {
                    return {
                        success: false,
                        message: 'Không tìm thấy chi tiết chốt kho'
                    };
                }
                const positiveDiscrepancies = details.filter(d => {
                    const chenhlech = Number(d.chenhlech || 0);
                    return chenhlech > 0;
                });
                const negativeDiscrepancies = details.filter(d => {
                    const chenhlech = Number(d.chenhlech || 0);
                    return chenhlech < 0;
                });
                if (positiveDiscrepancies.length > 0) {
                    console.log(`Creating adjustment phieu xuat for ${positiveDiscrepancies.length} positive discrepancies`);
                    for (const detail of positiveDiscrepancies) {
                        if (detail.sanphamId && detail.chenhlech) {
                            const result = await this.phieukhoService.createAdjustmentPhieuKho({
                                type: 'xuat',
                                sanphamId: detail.sanphamId,
                                soluong: Math.abs(Number(detail.chenhlech)),
                                ghichu: `Điều chỉnh thừa: ${detail.sanpham?.masp || 'N/A'} - Chốt kho ${details[0].chotkho.codeId}`,
                                khoId: details[0].chotkho.khoId || '4cc01811-61f5-4bdc-83de-a493764e9258',
                                chothkhoId: chotkhoId
                            });
                            if (!result.success) {
                                console.error(`Failed to create phieu xuat for ${detail.sanphamId}:`, result.message);
                            }
                            else {
                                console.log(`✅ Created phieu xuat: ${result.phieukho?.maphieu}`);
                            }
                        }
                    }
                }
                if (negativeDiscrepancies.length > 0) {
                    console.log(`Creating adjustment phieu nhap for ${negativeDiscrepancies.length} negative discrepancies`);
                    for (const detail of negativeDiscrepancies) {
                        if (detail.sanphamId && detail.chenhlech) {
                            const result = await this.phieukhoService.createAdjustmentPhieuKho({
                                type: 'nhap',
                                sanphamId: detail.sanphamId,
                                soluong: Math.abs(Number(detail.chenhlech)),
                                ghichu: `Điều chỉnh thiếu: ${detail.sanpham?.masp || 'N/A'} - Chốt kho ${details[0].chotkho.codeId}`,
                                khoId: details[0].chotkho.khoId || '4cc01811-61f5-4bdc-83de-a493764e9258',
                                chothkhoId: chotkhoId
                            });
                            if (!result.success) {
                                console.error(`Failed to create phieu nhap for ${detail.sanphamId}:`, result.message);
                            }
                            else {
                                console.log(`✅ Created phieu nhap: ${result.phieukho?.maphieu}`);
                            }
                        }
                    }
                }
                for (const detail of details) {
                    if (detail.sanphamId) {
                        await prisma.tonKho.upsert({
                            where: { sanphamId: detail.sanphamId },
                            update: {
                                slton: detail.slthucte,
                                slchogiao: 0,
                                slchonhap: 0
                            },
                            create: {
                                sanphamId: detail.sanphamId,
                                slton: detail.slthucte,
                                slchogiao: 0,
                                slchonhap: 0
                            }
                        });
                    }
                }
                await prisma.chotkho.update({
                    where: { id: chotkhoId },
                    data: {
                        updatedAt: new Date()
                    }
                });
                const summary = {
                    totalDetails: details.length,
                    positiveDiscrepancies: positiveDiscrepancies.length,
                    negativeDiscrepancies: negativeDiscrepancies.length,
                    phieuXuatCreated: positiveDiscrepancies.length > 0,
                    phieuNhapCreated: negativeDiscrepancies.length > 0
                };
                return {
                    success: true,
                    message: `Chốt kho hoàn tất: ${details.length} TonKho, ${positiveDiscrepancies.length} phiếu xuất, ${negativeDiscrepancies.length} phiếu nhập`,
                    summary
                };
            });
        }
        catch (error) {
            console.error('Error updating tonkho after close:', error);
            return {
                success: false,
                message: error.message || 'Lỗi cập nhật TonKho'
            };
        }
    }
    async generateNextOrderCode(type) {
        try {
            const prefix = type === 'nhap' ? 'PN' : 'PX';
            const today = new Date();
            const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
            const lastPhieu = await this.prisma.phieuKho.findFirst({
                where: {
                    maphieu: {
                        startsWith: `${prefix}-${dateStr}`
                    }
                },
                orderBy: {
                    maphieu: 'desc'
                }
            });
            let nextNumber = 1;
            if (lastPhieu && lastPhieu.maphieu) {
                const lastNumber = parseInt(lastPhieu.maphieu.split('-').pop() || '0');
                nextNumber = lastNumber + 1;
            }
            return `${prefix}-${dateStr}-${nextNumber.toString().padStart(3, '0')}`;
        }
        catch (error) {
            console.error('Error generating order code:', error);
            return `${type === 'nhap' ? 'PN' : 'PX'}-${Date.now()}`;
        }
    }
};
exports.ChotkhoService = ChotkhoService;
exports.ChotkhoService = ChotkhoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        phieukho_service_1.PhieukhoService])
], ChotkhoService);
//# sourceMappingURL=chotkho.service.js.map