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
exports.DichvuService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let DichvuService = class DichvuService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedDichvu() {
        try {
            const lastUpdated = await this.prisma.dichvu.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedDichvu', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.dichvu.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const prefix = 'DV';
                const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            const newPrefix = 'DV';
            return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generateDichvuCodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.dichvu.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = data.codeId || await this.generateCodeId();
            const created = await this.prisma.dichvu.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId
                },
            });
            this._SocketGateway.sendUpdate('dichvu');
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createDichvu', error);
            throw error;
        }
    }
    async syncsdichvu(param) {
        if (!param || !Array.isArray(param) || param.length === 0) {
            throw new common_1.NotFoundException('Invalid parameters for syncsdichvu');
        }
        const concurrencyLimit = 50;
        let successCount = 0;
        let failureCount = 0;
        const tasks = param.map((item) => async () => {
            try {
                const existing = await this.prisma.dichvu.findFirst({
                    where: { codeId: item.source_id },
                });
                if (!existing) {
                    const data = {
                        codeId: item.source_id,
                        tabCode: item.tabCode,
                        TabCardCode: item.TabCardCode,
                        TabMedicineCode: item.TabMedicineCode,
                        serviceCode: item.serviceCode,
                        serviceName: item.serviceName,
                        description: item.description,
                        price: item.priceRoot,
                    };
                    await this.create(data);
                }
                else {
                    const data = {
                        codeId: item.source_id,
                        tabCode: item.tabCode,
                        TabCardCode: item.TabCardCode,
                        TabMedicineCode: item.TabMedicineCode,
                        serviceCode: item.serviceCode,
                        serviceName: item.serviceName,
                        description: item.description,
                        price: item.priceRoot,
                    };
                    await this.update(existing.id, data);
                }
            }
            catch (error) {
                throw error;
            }
        });
        for (let i = 0; i < tasks.length; i += concurrencyLimit) {
            const chunk = tasks.slice(i, i + concurrencyLimit);
            const results = await Promise.allSettled(chunk.map((task) => task()));
            results.forEach((result) => {
                if (result.status === 'fulfilled') {
                    successCount++;
                }
                else {
                    failureCount++;
                }
            });
        }
        return { success: successCount, failure: failureCount };
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.dichvu.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.dichvu.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.dichvu.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByDichvu', error);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.dichvu.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.dichvu.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllDichvu', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.dichvu.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Dichvu not found');
            return item;
        }
        catch (error) {
            this._ErrorlogService.logError('findOneDichvu', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.dichvu.update({ where: { id }, data: rest });
                updated = await this.prisma.dichvu.update({ where: { id }, data: { order } });
            }
            else {
                updated = await this.prisma.dichvu.update({ where: { id }, data });
            }
            this._SocketGateway.sendUpdate('dichvu');
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updateDichvu', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.dichvu.delete({ where: { id } });
            this._SocketGateway.sendUpdate('dichvu');
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removeDichvu', error);
            throw error;
        }
    }
    async reorderDichvus(dichvuIds) {
        try {
            for (let i = 0; i < dichvuIds.length; i++) {
                await this.prisma.dichvu.update({
                    where: { id: dichvuIds[i] },
                    data: { order: i + 1 }
                });
            }
            this._SocketGateway.sendUpdate('dichvu');
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderDichvus', error);
            throw error;
        }
    }
};
exports.DichvuService = DichvuService;
exports.DichvuService = DichvuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], DichvuService);
//# sourceMappingURL=dichvu.service.js.map