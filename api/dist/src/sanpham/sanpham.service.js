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
const moment_1 = require("moment");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let SanphamService = class SanphamService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedSanpham() {
        try {
            const lastUpdated = await this.prisma.sanpham.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.sanpham.findFirst({
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
            this._ErrorlogService.logError('generateSanphamCodeId', error);
            throw error;
        }
    }
    async import(data) {
        const importResults = [];
        for (const sanpham of data) {
            try {
                let action = '';
                if (!sanpham.codeId) {
                    await this.create(sanpham);
                    action = 'created';
                }
                else {
                    const existingSanpham = await this.prisma.sanpham.findUnique({
                        where: { codeId: sanpham.codeId },
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
                importResults.push({ codeId: sanpham.codeId || 'generated', status: 'success', action });
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
                    title: `Import Sản Phẩm ${(0, moment_1.default)().format('HH:mm:ss DD/MM/YYYY')} `,
                    type: 'sanpham',
                };
                importResults.push({ codeId: sanpham.codeId || 'unknown', status: 'failed', error: error.message });
            }
        }
        return { message: 'Import completed', results: importResults };
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.sanpham.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const { title, danhmucId, bienthe, donvitinh, price, status, ...restData } = data;
            const created = await this.prisma.sanpham.create({
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
            this._SocketGateway.sendUpdate('sanpham');
            return created;
        }
        catch (error) {
            console.log('Error creating sanpham:', error);
            this._ErrorlogService.logError('createSanpham', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            const whereFilter = Object.entries(where).reduce((acc, [field, value]) => {
                if (value !== undefined && value !== null) {
                    acc[field] = typeof value === 'string'
                        ? { contains: value, mode: 'insensitive' }
                        : value;
                }
                return acc;
            }, {});
            if (isOne) {
                const result = await this.prisma.sanpham.findFirst({
                    where: whereFilter,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.sanpham.findMany({
                    where: whereFilter,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.sanpham.count({ where: whereFilter }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findBySanpham', error);
            throw error;
        }
    }
    async findAll(query) {
        try {
            const { page, pageSize, sortBy, sortOrder, search, priceMin, priceMax, category, isOne } = query;
            const numericPage = Number(page || 1);
            const numericPageSize = Number(pageSize || 50);
            const skip = (numericPage - 1) * numericPageSize;
            const take = numericPageSize;
            const where = {};
            if (search) {
                where.OR = [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
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
            if (isOne) {
                const result = await this.prisma.sanpham.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
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
    async findOne(id) {
        try {
            const item = await this.prisma.sanpham.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Sanpham not found');
            return item;
        }
        catch (error) {
            console.log('Error finding sanpham:', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const { title, danhmucId, bienthe, donvitinh, price, status, order, ...restData } = data;
            const updated = await this.prisma.sanpham.update({
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
            this._SocketGateway.sendUpdate('sanpham');
            return updated;
        }
        catch (error) {
            console.log('Error updating sanpham:', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.sanpham.delete({ where: { id } });
            this._SocketGateway.sendUpdate('sanpham');
            return deleted;
        }
        catch (error) {
            console.log('Error removing sanpham:', error);
            throw error;
        }
    }
    async reorderSanphams(sanphamIds) {
        try {
            for (let i = 0; i < sanphamIds.length; i++) {
                await this.prisma.sanpham.update({
                    where: { id: sanphamIds[i] },
                    data: { order: i + 1 }
                });
            }
            this._SocketGateway.sendUpdate('sanpham');
            return { status: 'success' };
        }
        catch (error) {
            console.log('Error reordering sanpham:', error);
            throw error;
        }
    }
};
exports.SanphamService = SanphamService;
exports.SanphamService = SanphamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], SanphamService);
//# sourceMappingURL=sanpham.service.js.map