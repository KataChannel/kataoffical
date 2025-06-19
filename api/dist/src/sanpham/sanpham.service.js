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
exports.SanphamService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment-timezone");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlogs_service_1 = require("../errorlogs/errorlogs.service");
const importdata_service_1 = require("../importdata/importdata.service");
const socket_gateway_1 = require("../socket.gateway");
let SanphamService = class SanphamService {
    constructor(prisma, _SocketGateway, _ErrorlogsService, _ImportdataService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogsService = _ErrorlogsService;
        this._ImportdataService = _ImportdataService;
    }
    async getLastUpdated() {
        try {
            const lastUpdated = await this.prisma.sanpham.aggregate({
                _max: { updatedAt: true },
            });
            return {
                updatedAt: lastUpdated._max.updatedAt
                    ? new Date(lastUpdated._max.updatedAt).getTime()
                    : 0,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async generateMaSP() {
        const latest = await this.prisma.sanpham.findFirst({
            orderBy: { masp: 'desc' },
        });
        let nextNumber = 1;
        if (latest) {
            const match = latest.masp.match(/I1(\d+)/);
            if (match) {
                nextNumber = parseInt(match[1]) + 1;
            }
        }
        return `I1${nextNumber.toString().padStart(5, '0')}`;
    }
    async create(data) {
        data.masp = data.masp ? data.masp : await this.generateMaSP();
        const existingSanpham = await this.prisma.sanpham.findUnique({
            where: { masp: data.masp },
        });
        if (existingSanpham) {
            return existingSanpham;
        }
        let newOrder;
        const maxOrder = await this.prisma.sanpham.aggregate({
            _max: { order: true },
        });
        newOrder = (maxOrder._max?.order || 0) + 1;
        this._SocketGateway.sendSanphamUpdate();
        return this.prisma.sanpham.create({
            data: {
                ...data,
                order: newOrder,
            },
        });
    }
    async import(data) {
        const importResults = [];
        for (const sanpham of data) {
            try {
                let action = '';
                if (!sanpham.masp) {
                    await this.create(sanpham);
                    action = 'created';
                }
                else {
                    const existingSanpham = await this.prisma.sanpham.findUnique({
                        where: { masp: sanpham.masp },
                        select: { id: true },
                    });
                    if (existingSanpham) {
                        await this.prisma.sanpham.update({
                            where: { id: existingSanpham.id },
                            data: { ...sanpham },
                        });
                        action = 'updated';
                    }
                    else {
                        await this.create(sanpham);
                        action = 'created';
                    }
                }
                importResults.push({
                    masp: sanpham.masp || 'generated',
                    status: 'success',
                    action,
                });
            }
            catch (error) {
                const importData = {
                    caseDetail: {
                        errorMessage: error.message,
                        errorStack: error.stack,
                        additionalInfo: 'Error during product import process',
                    },
                    order: 1,
                    createdBy: 'system',
                    title: `Import Sản Phẩm ${moment().format('HH:mm:ss DD/MM/YYYY')} `,
                    type: 'sanpham',
                };
                this._ImportdataService.create(importData);
                importResults.push({
                    masp: sanpham.masp || 'unknown',
                    status: 'failed',
                    error: error.message,
                });
            }
        }
        const importData = {
            caseDetail: {
                additionalInfo: JSON.stringify(importResults),
            },
            order: 0,
            createdBy: 'system',
            title: `Import ${moment().format('HH:mm:ss DD/MM/YYYY')}`,
            type: 'sanpham',
        };
        this._ImportdataService.create(importData);
        return { message: 'Import completed', results: importResults };
    }
    async banggiamacdinh(item) {
        try {
            const banggia = await this.prisma.banggia.findUnique({
                where: { id: item.banggiaid },
                include: { sanpham: true },
            });
            if (!banggia) {
                return {
                    message: 'Bảng giá không tồn tại',
                    status: 'error',
                };
            }
            const updateOperations = banggia.sanpham.map((sp) => this.prisma.sanpham.update({
                where: { id: sp.sanphamId },
                data: { giaban: sp.giaban },
            }));
            await this.prisma.$transaction(updateOperations);
            this._SocketGateway.sendSanphamUpdate();
            return {
                message: `Đã cập nhật giá bán cho ${banggia.sanpham.length} sản phẩm từ bảng giá mặc định`,
                status: 'success',
                updatedCount: banggia.sanpham.length,
            };
        }
        catch (error) {
            this._ErrorlogsService.logError('Lỗi cập nhật bảng giá mặc định', {
                error: error.message,
                banggiaid: item.banggiaid,
            });
            throw error;
        }
    }
    async reorderSanphams(sanphamIds) {
        for (let i = 0; i < sanphamIds.length; i++) {
            await this.prisma.sanpham.update({
                where: { id: sanphamIds[i] },
                data: { order: i + 1 },
            });
        }
    }
    async findAll(query) {
        console.log('findAllSanpham query:', query);
        try {
            const { page, pageSize, sortBy, sortOrder, search, subtitle, priceMin, priceMax, category, } = query;
            const numericPage = Number(page || 1);
            const numericPageSize = Number(pageSize || 50);
            const skip = (numericPage - 1) * numericPageSize;
            const take = numericPageSize;
            const where = {};
            console.log(subtitle);
            if (subtitle) {
                where.subtitle = { contains: subtitle, mode: 'insensitive' };
            }
            if (category) {
                where.category = { equals: category, mode: 'insensitive' };
            }
            if (priceMin || priceMax) {
                where.price = {};
                if (priceMin) {
                    where.price.gte = priceMin;
                }
                if (priceMax) {
                    where.price.lte = priceMax;
                }
            }
            const orderBy = {};
            if (sortBy && sortOrder) {
                orderBy[sortBy] = sortOrder;
            }
            else {
                orderBy.createdAt = 'desc';
            }
            const [sanphams, total] = await this.prisma.$transaction([
                this.prisma.sanpham.findMany({
                    where,
                    skip,
                    take,
                    orderBy,
                }),
                this.prisma.sanpham.count({ where }),
            ]);
            return {
                data: sanphams,
                total: Number(total),
                page: numericPage,
                pageSize: numericPageSize,
                totalPages: Math.ceil(Number(total) / numericPageSize),
            };
        }
        catch (error) {
            console.log('Error in findAllSanpham:', error);
            throw error;
        }
    }
    async nhucaudathang() {
        try {
            const sanphams = await this.prisma.sanpham.findMany();
            const tonkhos = await this.prisma.tonKho.findMany();
            const result = tonkhos.filter((tonkho) => {
                const sanpham = sanphams.find((sp) => sp.id === tonkho.sanphamId);
                if (sanpham) {
                    const goiy = (Number(tonkho.slton) -
                        Number(tonkho.slchogiao) +
                        Number(tonkho.slchonhap)) *
                        (1 + Number(sanpham.haohut) / 100);
                    goiy < 0;
                    tonkho.goiy = goiy;
                    return goiy < 0;
                }
                return false;
            });
            const combined = result.map((tonkho) => {
                const product = sanphams.find((sp) => sp.id === tonkho.sanphamId);
                return {
                    ...product,
                    slton: Number(tonkho.slton),
                    slchogiao: Number(tonkho.slchogiao),
                    slchonhap: Number(tonkho.slchonhap),
                    goiy: Math.abs(Number(tonkho.goiy)),
                };
            });
            return combined;
        }
        catch (error) {
            this._ErrorlogsService.logError('Lỗi lấy tất cả sản phẩm', {
                error: error.message,
            });
            throw error;
        }
    }
    async findby(param) {
        const { page = 1, pageSize = 50, isOne, ...where } = param;
        const whereClause = {};
        if (where.id) {
            whereClause.id = where.id;
        }
        if (where.subtitle || where.name || where.title) {
            whereClause.OR = [];
            if (where.subtitle) {
                whereClause.OR.push({
                    subtitle: { contains: where.subtitle, mode: 'insensitive' },
                });
            }
            if (where.name) {
                whereClause.OR.push({
                    name: { contains: where.name, mode: 'insensitive' },
                });
            }
            if (where.title) {
                whereClause.OR.push({
                    title: { contains: where.title, mode: 'insensitive' },
                });
            }
        }
        if (where.startDate || where.endDate) {
            whereClause.createdAt = {};
            if (where.startDate)
                whereClause.createdAt.gte = where.startDate;
            if (where.endDate)
                whereClause.createdAt.lte = where.endDate;
        }
        if (isOne) {
            const oneResult = await this.prisma.sanpham.findFirst({
                where: whereClause,
                include: { banggia: true },
                orderBy: { createdAt: 'desc' },
            });
            return oneResult;
        }
        else {
            const skip = (page - 1) * pageSize;
            const [sanphams, total] = await Promise.all([
                this.prisma.sanpham.findMany({
                    where: whereClause,
                    include: { banggia: true },
                    skip,
                    take: pageSize,
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.sanpham.count({ where: whereClause }),
            ]);
            return {
                data: sanphams,
                page,
                pageSize,
                total,
                pageCount: Math.ceil(total / pageSize),
            };
        }
    }
    async findOne(id) {
        const sanpham = await this.prisma.sanpham.findUnique({
            where: { id },
            include: {
                Nhacungcap: true,
                Donhangsanpham: {
                    include: {
                        donhang: true,
                    },
                },
                Dathangsanpham: {
                    include: {
                        dathang: true,
                    },
                },
            },
        });
        if (!sanpham)
            throw new common_1.NotFoundException('Sanpham not found');
        return {
            ...sanpham,
            Donhangsanpham: sanpham.Donhangsanpham.map((item) => ({
                createdAt: item.donhang.createdAt || null,
                madonhang: item.donhang.madonhang,
                sldat: item.sldat || 0,
                slgiao: item.slgiao || 0,
                slnhan: item.slnhan || 0,
            })),
            Dathangsanpham: sanpham.Dathangsanpham.map((item) => ({
                createdAt: item.dathang.createdAt || null,
                madncc: item.dathang.madncc,
                sldat: item.sldat || 0,
                slgiao: item.slgiao || 0,
                slnhan: item.slnhan || 0,
            })),
        };
    }
    async finby(id) {
        const sanpham = await this.prisma.sanpham.findUnique({
            where: { id },
            include: {
                Donhangsanpham: {
                    include: {
                        donhang: true,
                    },
                },
                Dathangsanpham: {
                    include: {
                        dathang: true,
                    },
                },
            },
        });
        if (!sanpham)
            throw new common_1.NotFoundException('Sanpham not found');
        return {
            ...sanpham,
            Donhangsanpham: sanpham.Donhangsanpham.map((item) => ({
                createdAt: item.donhang.createdAt || null,
                madonhang: item.donhang.madonhang,
                sldat: item.sldat || 0,
                slgiao: item.slgiao || 0,
                slnhan: item.slnhan || 0,
            })),
            Dathangsanpham: sanpham.Dathangsanpham.map((item) => ({
                createdAt: item.dathang.createdAt || null,
                madncc: item.dathang.madncc,
                sldat: item.sldat || 0,
                slgiao: item.slgiao || 0,
                slnhan: item.slnhan || 0,
            })),
        };
    }
    async update(id, data) {
        const { Donhangsanpham, Dathangsanpham, Nhacungcap, ...rest } = data;
        const updatedSanpham = await this.prisma.sanpham.update({
            where: { id },
            data: {
                ...rest,
                Nhacungcap: {
                    set: Nhacungcap.map((nc) => ({ id: nc.id })),
                },
            },
        });
        this._SocketGateway.sendSanphamUpdate();
        return updatedSanpham;
    }
    async remove(id) {
        return this.prisma.$transaction(async (tx) => {
            await tx.sanpham.update({
                where: { id },
                data: { Nhacungcap: { set: [] } },
            });
            await tx.donhangsanpham.deleteMany({
                where: { sanpham: { id } },
            });
            await tx.dathangsanpham.deleteMany({
                where: { sanpham: { id } },
            });
            await tx.banggiasanpham.deleteMany({
                where: { sanphamId: id },
            });
            const deletedSanpham = await tx.sanpham.delete({ where: { id } });
            this._SocketGateway.sendSanphamUpdate();
            return deletedSanpham;
        });
    }
};
exports.SanphamService = SanphamService;
exports.SanphamService = SanphamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlogs_service_1.ErrorlogsService,
        importdata_service_1.ImportdataService])
], SanphamService);
//# sourceMappingURL=sanpham.service.js.map