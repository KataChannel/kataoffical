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
exports.BanggiaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let BanggiaService = class BanggiaService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedBanggia() {
        try {
            const lastUpdated = await this.prisma.banggia.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedBanggia', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.banggia.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const prefix = 'BG';
                const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `BG${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generatebanggiaCodeId', error);
            throw error;
        }
    }
    async validateDateRange(batdau, ketthuc, status, excludeId) {
        if (status !== 'dangban')
            return;
        const start = batdau ? new Date(batdau) : new Date();
        const end = ketthuc ? new Date(ketthuc) : null;
        if (end && start > end) {
            throw new common_1.BadRequestException('Ngày bắt đầu phải trước ngày kết thúc');
        }
        const overlapping = await this.prisma.banggia.findMany({
            where: {
                status: 'dangban',
                id: { not: excludeId },
                OR: [
                    {
                        AND: [
                            { batdau: { lte: end || new Date('9999-12-31') } },
                            { ketthuc: { gte: start } },
                        ],
                    },
                    {
                        AND: [
                            { batdau: { lte: end || new Date('9999-12-31') } },
                            { ketthuc: null },
                        ],
                    },
                    {
                        AND: [
                            { batdau: { gte: start } },
                            { ketthuc: { lte: end || new Date('9999-12-31') } },
                        ],
                    },
                ],
            },
        });
        if (overlapping.length > 0) {
            throw new common_1.ConflictException('Đã tồn tại bảng giá đang bán có thời gian áp dụng trùng lặp');
        }
    }
    async create(payload) {
        try {
            console.log('Creating banggia with payload:', payload);
            const { title, giaban, status, batdau, ketthuc, order, sanphamIds, khachhangIds } = payload;
            const codeId = payload.codeId || await this.generateCodeId();
            console.log('Generated codeId:', codeId);
            const existingPrice = await this.prisma.banggia.findUnique({ where: { codeId } });
            if (existingPrice) {
                throw new common_1.ConflictException('Mã bảng giá đã tồn tại');
            }
            if (sanphamIds?.length) {
                for (const id of sanphamIds) {
                    const sanpham = await this.prisma.sanpham.findUnique({ where: { id } });
                    if (!sanpham) {
                        throw new common_1.NotFoundException(`Sản phẩm với ID ${id} không tồn tại`);
                    }
                }
            }
            if (khachhangIds?.length) {
                for (const id of khachhangIds) {
                    const khachhang = await this.prisma.khachhang.findUnique({ where: { id } });
                    if (!khachhang) {
                        throw new common_1.NotFoundException(`Khách hàng với ID ${id} không tồn tại`);
                    }
                }
            }
            await this.validateDateRange(batdau, ketthuc, status || 'baogia');
            const maxOrder = await this.prisma.banggia.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            console.log('New order number:', newOrder);
            const created = await this.prisma.banggia.create({
                data: {
                    codeId,
                    title,
                    status: status || 'baogia',
                    batdau: batdau ? new Date(batdau) : new Date(),
                    ketthuc: ketthuc ? new Date(ketthuc) : null,
                    order: order || newOrder,
                    sanpham: sanphamIds?.length
                        ? {
                            create: sanphamIds.map((sanphamId) => ({
                                sanphamId,
                            })),
                        }
                        : undefined,
                    khachhang: khachhangIds?.length
                        ? {
                            create: khachhangIds.map((khachhangId) => ({
                                khachhangId,
                            })),
                        }
                        : undefined,
                },
                include: {
                    sanpham: { include: { sanpham: true } },
                    khachhang: { include: { khachhang: true } },
                },
            });
            this._SocketGateway.sendUpdate('banggia');
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createbanggia', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.banggia.findFirst({
                    where,
                    include: {
                        sanpham: { include: { sanpham: true } },
                        khachhang: { include: { khachhang: true } },
                    },
                    orderBy: { order: 'asc' },
                });
                if (!result)
                    throw new common_1.NotFoundException('Bảng giá không tồn tại');
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.banggia.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                    include: {
                        sanpham: { include: { sanpham: true } },
                        khachhang: { include: { khachhang: true } },
                    },
                }),
                this.prisma.banggia.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findBybanggia', error);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.banggia.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                    include: {
                        sanpham: { include: { sanpham: true } },
                        khachhang: { include: { khachhang: true } },
                    },
                }),
                this.prisma.banggia.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllbanggia', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.banggia.findUnique({
                where: { id },
                include: {
                    sanpham: { include: { sanpham: true } },
                    khachhang: { include: { khachhang: true } },
                },
            });
            if (!item)
                throw new common_1.NotFoundException('Bảng giá không tồn tại');
            return item;
        }
        catch (error) {
            this._ErrorlogService.logError('findOnebanggia', error);
            throw error;
        }
    }
    async approve(id) {
        try {
            const banggia = await this.prisma.banggia.findUnique({
                where: { id },
                include: {
                    sanpham: { include: { sanpham: true } },
                    khachhang: { include: { khachhang: true } },
                },
            });
            if (!banggia) {
                throw new common_1.NotFoundException('Bảng giá không tồn tại');
            }
            if (banggia.status === 'dangban') {
                throw new common_1.ConflictException('Bảng giá đã ở trạng thái đang bán');
            }
            await this.validateDateRange(banggia.batdau, banggia.ketthuc, 'dangban', id);
            const updated = await this.prisma.banggia.update({
                where: { id },
                data: { status: 'dangban' },
                include: {
                    sanpham: { include: { sanpham: true } },
                    khachhang: { include: { khachhang: true } },
                },
            });
            this._SocketGateway.sendUpdate('banggia');
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('approvebanggia', error);
            throw error;
        }
    }
    async update(id, payload) {
        try {
            const { codeId, title, status, batdau, ketthuc, order, sanphamIds, khachhangIds } = payload;
            const banggia = await this.prisma.banggia.findUnique({ where: { id } });
            if (!banggia) {
                throw new common_1.NotFoundException('Bảng giá không tồn tại');
            }
            if (codeId && codeId !== banggia.codeId) {
                const existingPrice = await this.prisma.banggia.findUnique({ where: { codeId } });
                if (existingPrice) {
                    throw new common_1.ConflictException('Mã bảng giá đã tồn tại');
                }
            }
            if (sanphamIds?.length) {
                for (const id of sanphamIds) {
                    const sanpham = await this.prisma.sanpham.findUnique({ where: { id } });
                    if (!sanpham) {
                        throw new common_1.NotFoundException(`Sản phẩm với ID ${id} không tồn tại`);
                    }
                }
            }
            if (khachhangIds?.length) {
                for (const id of khachhangIds) {
                    const khachhang = await this.prisma.khachhang.findUnique({ where: { id } });
                    if (!khachhang) {
                        throw new common_1.NotFoundException(`Khách hàng với ID ${id} không tồn tại`);
                    }
                }
            }
            await this.validateDateRange(batdau || banggia.batdau, ketthuc || banggia.ketthuc, status || banggia.status, id);
            const updated = await this.prisma.banggia.update({
                where: { id },
                data: {
                    codeId: codeId || banggia.codeId,
                    title: title || banggia.title,
                    status: status || banggia.status,
                    batdau: batdau ? new Date(batdau) : banggia.batdau,
                    ketthuc: ketthuc ? new Date(ketthuc) : banggia.ketthuc,
                    order: order || banggia.order,
                    sanpham: sanphamIds?.length
                        ? {
                            deleteMany: {},
                            create: sanphamIds.map((sanphamId) => ({
                                sanphamId,
                            })),
                        }
                        : undefined,
                    khachhang: khachhangIds?.length
                        ? {
                            deleteMany: {},
                            create: khachhangIds.map((khachhangId) => ({
                                khachhangId,
                            })),
                        }
                        : undefined,
                },
                include: {
                    sanpham: { include: { sanpham: true } },
                    khachhang: { include: { khachhang: true } },
                },
            });
            this._SocketGateway.sendUpdate('banggia');
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updatebanggia', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const banggia = await this.prisma.banggia.findUnique({ where: { id } });
            if (!banggia) {
                throw new common_1.NotFoundException('Bảng giá không tồn tại');
            }
            const deleted = await this.prisma.banggia.delete({ where: { id } });
            this._SocketGateway.sendUpdate('banggia');
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removebanggia', error);
            throw error;
        }
    }
    async reorderBanggias(banggiaIds) {
        try {
            for (let i = 0; i < banggiaIds.length; i++) {
                await this.prisma.banggia.update({
                    where: { id: banggiaIds[i] },
                    data: { order: i + 1 },
                });
            }
            this._SocketGateway.sendUpdate('banggia');
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderBanggias', error);
            throw error;
        }
    }
};
exports.BanggiaService = BanggiaService;
exports.BanggiaService = BanggiaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], BanggiaService);
//# sourceMappingURL=banggia.service.js.map