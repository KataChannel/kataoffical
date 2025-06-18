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
exports.KhoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let KhoService = class KhoService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedKho() {
        try {
            const lastUpdated = await this.prisma.kho.aggregate({
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
            const latest = await this.prisma.kho.findFirst({
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
            this._ErrorlogService.logError('generateKhoCodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.kho.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const created = await this.prisma.kho.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId,
                },
            });
            this._SocketGateway.sendUpdate('kho');
            return created;
        }
        catch (error) {
            console.log('Error creating kho:', error);
            this._ErrorlogService.logError('createKho', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.kho.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.kho.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.kho.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByKho', error);
            throw error;
        }
    }
    async findAll(query) {
        console.log('findAllKho query:', query);
        try {
            const { page, pageSize, sortBy, sortOrder, search, priceMin, priceMax, category } = query;
            const numericPage = Number(page);
            const numericPageSize = Number(pageSize);
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
            const [khos, total] = await this.prisma.$transaction([
                this.prisma.kho.findMany({
                    where,
                    skip,
                    take,
                    orderBy,
                }),
                this.prisma.kho.count({ where }),
            ]);
            return {
                data: khos,
                total: Number(total),
                page: numericPage,
                pageSize: numericPageSize,
                totalPages: Math.ceil(Number(total) / numericPageSize),
            };
        }
        catch (error) {
            console.log('Error in findAllKho:', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.kho.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Kho not found');
            return item;
        }
        catch (error) {
            console.log('Error finding kho:', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const { title, danhmucId, bienthe, donvitinh, price, status, order, ...restData } = data;
            const updated = await this.prisma.kho.update({
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
            this._SocketGateway.sendUpdate('kho');
            return updated;
        }
        catch (error) {
            console.log('Error updating kho:', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.kho.delete({ where: { id } });
            this._SocketGateway.sendUpdate('kho');
            return deleted;
        }
        catch (error) {
            console.log('Error removing kho:', error);
            throw error;
        }
    }
    async reorderKhos(khoIds) {
        try {
            for (let i = 0; i < khoIds.length; i++) {
                await this.prisma.kho.update({
                    where: { id: khoIds[i] },
                    data: { order: i + 1 }
                });
            }
            this._SocketGateway.sendUpdate('kho');
            return { status: 'success' };
        }
        catch (error) {
            console.log('Error reordering kho:', error);
            throw error;
        }
    }
};
exports.KhoService = KhoService;
exports.KhoService = KhoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], KhoService);
//# sourceMappingURL=kho.service.js.map