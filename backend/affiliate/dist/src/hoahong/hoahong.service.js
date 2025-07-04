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
exports.HoahongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let HoahongService = class HoahongService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedHoahong() {
        try {
            const lastUpdated = await this.prisma.hoaHong.aggregate({
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
    async generateCodeId() {
        try {
            const latest = await this.prisma.hoaHong.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const prefix = 'SP';
                const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            const newPrefix = 'SP';
            return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generateHoahongCodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.hoaHong.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const { title, danhmucId, bienthe, donvitinh, price, status, ...restData } = data;
            const created = await this.prisma.hoaHong.create({
                data: {
                    title,
                    bienthe,
                    donvitinh,
                    giagoc: price || 0,
                    status: status || 'draft',
                    ...restData,
                    order: newOrder,
                    codeId: codeId,
                    ...(danhmucId && { danhmuc: { connect: { id: danhmucId } } }),
                },
            });
            this._SocketGateway.sendUpdate('hoahong');
            return created;
        }
        catch (error) {
            console.log('Error creating hoahong:', error);
            this._ErrorlogService.logError('createHoahong', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, pageSize = 20, listphone, ...where } = param;
            if (listphone && Array.isArray(listphone)) {
                where.phone = { in: listphone };
            }
            if (isOne) {
                const result = await this.prisma.hoaHong.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * pageSize;
            const [data, total] = await Promise.all([
                this.prisma.hoaHong.findMany({
                    where,
                    skip,
                    take: pageSize,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.hoaHong.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / pageSize),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByHoahong', error);
            throw error;
        }
    }
    async findAll(query) {
        console.log('findAllHoahong query:', query);
        try {
            const { page, pageSize, sortBy, sortOrder, search, priceMin, priceMax, category, } = query;
            const numericPage = Number(page);
            const numericPageSize = Number(pageSize);
            const skip = (numericPage - 1) * numericPageSize;
            const take = numericPageSize;
            const where = {};
            if (search) {
                where.OR = [
                    { codeId: { contains: search, mode: 'insensitive' } },
                    { userId: { contains: search, mode: 'insensitive' } },
                ];
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
            const [hoahongs, total] = await this.prisma.$transaction([
                this.prisma.hoaHong.findMany({
                    where,
                    skip,
                    take,
                    orderBy,
                }),
                this.prisma.hoaHong.count({ where }),
            ]);
            return {
                data: hoahongs,
                total: Number(total),
                page: numericPage,
                pageSize: numericPageSize,
                totalPages: Math.ceil(Number(total) / numericPageSize),
            };
        }
        catch (error) {
            console.log('Error in findAllHoahong:', error);
            throw error;
        }
    }
    async getTotalHoahongByUserId(userId) {
        try {
            const result = await this.prisma.hoaHong.aggregate({
                _sum: { tienhoahong: true },
                where: { userId },
            });
            return { total: result._sum.tienhoahong || 0 };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.hoaHong.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Hoahong not found');
            return item;
        }
        catch (error) {
            console.log('Error finding hoahong:', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const { title, danhmucId, bienthe, donvitinh, price, status, order, ...restData } = data;
            const updated = await this.prisma.hoaHong.update({
                where: { id },
                data: {
                    title,
                    bienthe,
                    donvitinh,
                    giagoc: price || 0,
                    status: status || 'draft',
                    order: order || undefined,
                    ...restData,
                    ...(danhmucId && { danhmuc: { connect: { id: danhmucId } } }),
                    ...(data.danhmucId === null && { danhmuc: { disconnect: true } }),
                },
            });
            this._SocketGateway.sendUpdate('hoahong');
            return updated;
        }
        catch (error) {
            console.log('Error updating hoahong:', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.hoaHong.delete({ where: { id } });
            this._SocketGateway.sendUpdate('hoahong');
            return deleted;
        }
        catch (error) {
            console.log('Error removing hoahong:', error);
            throw error;
        }
    }
    async reorderHoahongs(hoahongIds) {
        try {
            for (let i = 0; i < hoahongIds.length; i++) {
                await this.prisma.hoaHong.update({
                    where: { id: hoahongIds[i] },
                    data: { order: i + 1 },
                });
            }
            this._SocketGateway.sendUpdate('hoahong');
            return { status: 'success' };
        }
        catch (error) {
            console.log('Error reordering hoahong:', error);
            throw error;
        }
    }
};
exports.HoahongService = HoahongService;
exports.HoahongService = HoahongService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], HoahongService);
//# sourceMappingURL=hoahong.service.js.map