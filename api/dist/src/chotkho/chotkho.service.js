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
const moment = require("moment-timezone");
let ChotkhoService = class ChotkhoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLastUpdatedChotkho() {
        try {
            const item = await this.prisma.chotkho.findFirst({
                orderBy: { updatedAt: 'desc' }
            });
            return { updatedAt: item ? item.updatedAt.getTime() : 0 };
        }
        catch (error) {
            console.log('Error getting last updated chotkho:', error);
            throw error;
        }
    }
    async generateCodeId() {
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2);
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const prefix = `CK${year}${month}${day}`;
        const lastItem = await this.prisma.chotkho.findFirst({
            where: {
                codeId: {
                    startsWith: prefix
                }
            },
            orderBy: {
                codeId: 'desc'
            }
        });
        let sequence = 1;
        if (lastItem && lastItem.codeId) {
            const lastSequence = parseInt(lastItem.codeId.slice(-3));
            sequence = lastSequence + 1;
        }
        return `${prefix}${sequence.toString().padStart(3, '0')}`;
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.chotkho.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const created = await this.prisma.chotkho.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            profile: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
            return created;
        }
        catch (error) {
            console.log('Error creating chotkho:', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.chotkho.findFirst({
                    where,
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                profile: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.chotkho.findMany({
                    where,
                    skip,
                    take: limit,
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                profile: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: { order: 'asc' },
                }),
                this.prisma.chotkho.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            console.log('Error finding chotkho by param:', error);
            throw error;
        }
    }
    async findAll(query) {
        try {
            const { page = 1, limit = 20, search = '', trangThai = '', tuNgay = '', denNgay = '', ...filters } = query;
            const pageNum = parseInt(page.toString(), 10);
            const limitNum = parseInt(limit.toString(), 10);
            const skip = (pageNum - 1) * limitNum;
            const where = { ...filters };
            if (search) {
                where.OR = [
                    { maChotKho: { contains: search, mode: 'insensitive' } },
                    { tenChotKho: { contains: search, mode: 'insensitive' } },
                    { ghichu: { contains: search, mode: 'insensitive' } },
                    { codeId: { contains: search, mode: 'insensitive' } }
                ];
            }
            if (trangThai) {
                where.trangThai = trangThai;
            }
            if (tuNgay || denNgay) {
                where.AND = where.AND || [];
                if (tuNgay) {
                    where.AND.push({
                        tuNgay: {
                            gte: moment(tuNgay).startOf('day').toDate()
                        }
                    });
                }
                if (denNgay) {
                    where.AND.push({
                        denNgay: {
                            lte: moment(denNgay).endOf('day').toDate()
                        }
                    });
                }
            }
            const [data, total] = await Promise.all([
                this.prisma.chotkho.findMany({
                    where,
                    skip,
                    take: limitNum,
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                profile: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.chotkho.count({ where }),
            ]);
            return {
                data,
                total,
                page: pageNum,
                limit: limitNum,
                pageCount: Math.ceil(total / limitNum),
            };
        }
        catch (error) {
            console.log('Error finding all chotkho:', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.chotkho.findUnique({
                where: { id },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            profile: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
            if (!item)
                throw new common_1.NotFoundException('Chotkho not found');
            return item;
        }
        catch (error) {
            console.log('Error finding chotkho:', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const updated = await this.prisma.chotkho.update({
                where: { id },
                data: {
                    ...data,
                    updatedAt: new Date(),
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            profile: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
            return updated;
        }
        catch (error) {
            console.log('Error updating chotkho:', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.chotkho.delete({ where: { id } });
            return deleted;
        }
        catch (error) {
            console.log('Error removing chotkho:', error);
            throw error;
        }
    }
    async findByDate(date, page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const startDate = moment(date).startOf('day').toDate();
            const endDate = moment(date).endOf('day').toDate();
            const where = {
                OR: [
                    {
                        tuNgay: { lte: endDate },
                        denNgay: { gte: startDate }
                    },
                    {
                        ngayChot: {
                            gte: startDate,
                            lte: endDate
                        }
                    },
                    {
                        createdAt: {
                            gte: startDate,
                            lte: endDate
                        }
                    }
                ]
            };
            const [data, total] = await Promise.all([
                this.prisma.chotkho.findMany({
                    where,
                    skip,
                    take: limit,
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                profile: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.chotkho.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                limit,
                pageCount: Math.ceil(total / limit),
                date,
                dateRange: {
                    start: startDate,
                    end: endDate
                }
            };
        }
        catch (error) {
            console.log('Error finding chotkho by date:', error);
            throw error;
        }
    }
    async generateReport(query) {
        try {
            const { startDate, endDate, format = 'json', khoId = '', sanphamId = '' } = query;
            const where = {};
            if (startDate || endDate) {
                where.ngay = {};
                if (startDate) {
                    where.ngay.gte = moment(startDate).startOf('day').toDate();
                }
                if (endDate) {
                    where.ngay.lte = moment(endDate).endOf('day').toDate();
                }
            }
            if (khoId) {
                where.khoId = khoId;
            }
            if (sanphamId) {
                where.sanphamId = sanphamId;
            }
            const chotkhoRecords = await this.prisma.chotkho.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            profile: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    kho: true,
                    sanpham: true,
                    tonkho: true,
                    phieukho: true
                },
                orderBy: { createdAt: 'desc' }
            });
            const summary = {
                totalRecords: chotkhoRecords.length,
                totalChenhLech: chotkhoRecords.reduce((sum, ck) => sum + Number(ck.chenhlech || 0), 0),
                totalSlThucTe: chotkhoRecords.reduce((sum, ck) => sum + Number(ck.slthucte || 0), 0),
                totalSlHeThong: chotkhoRecords.reduce((sum, ck) => sum + Number(ck.slhethong || 0), 0),
                dateRange: {
                    start: startDate,
                    end: endDate
                },
                filters: {
                    khoId,
                    sanphamId
                }
            };
            const khoStats = chotkhoRecords.reduce((acc, ck) => {
                const khoName = ck.kho?.name || 'Unknown';
                if (!acc[khoName]) {
                    acc[khoName] = {
                        count: 0,
                        totalChenhLech: 0,
                        totalSlThucTe: 0,
                        totalSlHeThong: 0
                    };
                }
                acc[khoName].count += 1;
                acc[khoName].totalChenhLech += Number(ck.chenhlech || 0);
                acc[khoName].totalSlThucTe += Number(ck.slthucte || 0);
                acc[khoName].totalSlHeThong += Number(ck.slhethong || 0);
                return acc;
            }, {});
            const reportData = {
                summary,
                khoStats,
                records: chotkhoRecords,
                generatedAt: new Date(),
                generatedBy: 'system'
            };
            if (format === 'excel') {
                return {
                    ...reportData,
                    format: 'excel',
                    downloadUrl: '/api/chotkho/report/download'
                };
            }
            return reportData;
        }
        catch (error) {
            console.log('Error generating report:', error);
            throw error;
        }
    }
    async reorderChotkhos(chotkhoIds) {
        try {
            for (let i = 0; i < chotkhoIds.length; i++) {
                await this.prisma.chotkho.update({
                    where: { id: chotkhoIds[i] },
                    data: { order: i + 1 }
                });
            }
            return { status: 'success', message: 'Chotkho records reordered successfully' };
        }
        catch (error) {
            console.log('Error reordering chotkho:', error);
            throw error;
        }
    }
    async getStatistics() {
        try {
            const [total, activeCount, inactiveCount] = await Promise.all([
                this.prisma.chotkho.count(),
                this.prisma.chotkho.count({ where: { isActive: true } }),
                this.prisma.chotkho.count({ where: { isActive: false } })
            ]);
            const avgChenhLech = await this.prisma.chotkho.aggregate({
                _avg: { chenhlech: true }
            });
            return {
                total,
                active: activeCount,
                inactive: inactiveCount,
                averageChenhLech: avgChenhLech._avg.chenhlech || 0
            };
        }
        catch (error) {
            console.log('Error getting statistics:', error);
            throw error;
        }
    }
    async bulkUpdateActive(ids, isActive) {
        try {
            const updated = await this.prisma.chotkho.updateMany({
                where: { id: { in: ids } },
                data: {
                    isActive,
                    updatedAt: new Date()
                }
            });
            return {
                status: 'success',
                message: `Updated ${updated.count} chotkho records`,
                count: updated.count
            };
        }
        catch (error) {
            console.log('Error bulk updating chotkho active status:', error);
            throw error;
        }
    }
    async findBySanpham(sanphamId, page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const where = { sanphamId };
            const [data, total] = await Promise.all([
                this.prisma.chotkho.findMany({
                    where,
                    skip,
                    take: limit,
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                profile: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        },
                        kho: true,
                        sanpham: true
                    },
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.chotkho.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                limit,
                pageCount: Math.ceil(total / limit),
                sanphamId
            };
        }
        catch (error) {
            console.log('Error finding chotkho by sanpham:', error);
            throw error;
        }
    }
    async findByKho(khoId, page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const where = { khoId };
            const [data, total] = await Promise.all([
                this.prisma.chotkho.findMany({
                    where,
                    skip,
                    take: limit,
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                profile: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        },
                        kho: true,
                        sanpham: true
                    },
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.chotkho.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                limit,
                pageCount: Math.ceil(total / limit),
                khoId
            };
        }
        catch (error) {
            console.log('Error finding chotkho by kho:', error);
            throw error;
        }
    }
};
exports.ChotkhoService = ChotkhoService;
exports.ChotkhoService = ChotkhoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChotkhoService);
//# sourceMappingURL=chotkho.service.js.map