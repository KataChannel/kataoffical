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
exports.KhoahocService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let KhoahocService = class KhoahocService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedKhoahoc() {
        try {
            const lastUpdated = await this.prisma.khoahoc.aggregate({
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
            const latest = await this.prisma.khoahoc.findFirst({
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
            this._ErrorlogService.logError('generateKhoahocCodeId', error);
            throw error;
        }
    }
    async getTotalKhoahocByUserId(userId) {
        try {
            const result = await this.prisma.khoahoc.count({
                where: { phone: userId },
            });
            return { total: result || 0 };
        }
        catch (error) {
            throw error;
        }
    }
    async syncskhoahoc(items) {
        if (!Array.isArray(items) || items.length === 0) {
            return { success: 0, failure: 0, error: 'Invalid parameters for syncskhoahoc' };
        }
        const concurrencyLimit = 50;
        let success = 0;
        let failure = 0;
        const processBatch = async (batch) => {
            try {
                const upsertOps = batch.map((item) => {
                    item.codeId = item.codeId?.toString();
                    item.timeIndex = Number(item.timeIndex);
                    item.branchId = item.branchId.toString();
                    item.state = item.state.toString();
                    return this.prisma.khoahoc.upsert({
                        where: { codeId: item.codeId },
                        update: item,
                        create: item,
                    });
                });
                const results = await Promise.allSettled(upsertOps);
                console.log(results);
                results.forEach((result) => {
                    if (result.status === 'fulfilled') {
                        success++;
                    }
                    else {
                        failure++;
                    }
                });
            }
            catch (error) {
                console.log('Error in syncskhoahoc:', error);
                failure += batch.length;
            }
        };
        for (let i = 0; i < items.length; i += concurrencyLimit) {
            const batch = items.slice(i, i + concurrencyLimit);
            await processBatch(batch);
        }
        this._SocketGateway.sendUpdate('khoahoc');
        return { success, failure };
    }
    async create(data) {
        try {
            const created = await this.prisma.khoahoc.create({ data });
            this._SocketGateway.sendUpdate('khoahoc');
            return created;
        }
        catch (error) {
            console.log('Error creating khoahoc:', error);
            this._ErrorlogService.logError('createKhoahoc', error);
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
                const result = await this.prisma.khoahoc.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * pageSize;
            const [data, total] = await Promise.all([
                this.prisma.khoahoc.findMany({
                    where,
                    skip,
                    take: pageSize,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.khoahoc.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / pageSize)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByKhoahoc', error);
            throw error;
        }
    }
    async findAll(query) {
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
            const [khoahocs, total] = await this.prisma.$transaction([
                this.prisma.khoahoc.findMany({
                    where,
                    skip,
                    take,
                    orderBy,
                }),
                this.prisma.khoahoc.count({ where }),
            ]);
            return {
                data: khoahocs,
                total: Number(total),
                page: numericPage,
                pageSize: numericPageSize,
                totalPages: Math.ceil(Number(total) / numericPageSize),
            };
        }
        catch (error) {
            console.log('Error in findAllKhoahoc:', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.khoahoc.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Khoahoc not found');
            return item;
        }
        catch (error) {
            console.log('Error finding khoahoc:', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const updated = await this.prisma.khoahoc.update({
                where: { id },
                data: data,
            });
            this._SocketGateway.sendUpdate('khoahoc');
            return updated;
        }
        catch (error) {
            console.log('Error updating khoahoc:', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.khoahoc.delete({ where: { id } });
            this._SocketGateway.sendUpdate('khoahoc');
            return deleted;
        }
        catch (error) {
            console.log('Error removing khoahoc:', error);
            throw error;
        }
    }
    async reorderKhoahocs(khoahocIds) {
        try {
            for (let i = 0; i < khoahocIds.length; i++) {
                await this.prisma.khoahoc.update({
                    where: { id: khoahocIds[i] },
                    data: { order: i + 1 }
                });
            }
            this._SocketGateway.sendUpdate('khoahoc');
            return { status: 'success' };
        }
        catch (error) {
            console.log('Error reordering khoahoc:', error);
            throw error;
        }
    }
};
exports.KhoahocService = KhoahocService;
exports.KhoahocService = KhoahocService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], KhoahocService);
//# sourceMappingURL=khoahoc.service.js.map