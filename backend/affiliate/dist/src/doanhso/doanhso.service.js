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
exports.DoanhsoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let DoanhsoService = class DoanhsoService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedDoanhso() {
        try {
            const lastUpdated = await this.prisma.doanhso.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedDoanhso', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.doanhso.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const prefix = 'DS';
                const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            const newPrefix = 'DS';
            return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generateDoanhsoCodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.doanhso.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = data.codeId || await this.generateCodeId();
            const created = await this.prisma.doanhso.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId
                },
            });
            this._SocketGateway.sendUpdate('doanhso');
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createDoanhso', error);
            throw error;
        }
    }
    async syncsdoanhso(param) {
        if (!param || !Array.isArray(param) || param.length === 0) {
            throw new common_1.NotFoundException('Invalid parameters for syncsdoanhso');
        }
        const concurrencyLimit = 50;
        let successCount = 0;
        let failureCount = 0;
        const tasks = param.map((item) => async () => {
            try {
                const existing = await this.prisma.doanhso.findFirst({
                    where: { codeId: item.source_id },
                });
                const user = await this.prisma.user.findFirst({
                    where: { phone: item.phone },
                });
                if (!user) {
                    throw new common_1.NotFoundException(`User not found for phone: ${item.phone}`);
                }
                const dichvu = await this.prisma.dichvu.findFirst({
                    where: { serviceCode: item.serviceCode },
                });
                if (!dichvu) {
                    throw new common_1.NotFoundException(`Dichvu not found for serviceCode: ${item.serviceCode}`);
                }
                if (!existing) {
                    if (item.priceDiscounted > 0) {
                        const data = {
                            codeId: item.source_id,
                            userId: user.id || null,
                            dichvuId: dichvu.id || null,
                            originalAmount: item.priceRoot || 0,
                            discountAmount: item.discount || 0,
                            actualAmount: item.priceDiscounted || 0,
                        };
                        console.log(data);
                        await this.create(data);
                    }
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
                const result = await this.prisma.doanhso.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.doanhso.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.doanhso.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByDoanhso', error);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.doanhso.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.doanhso.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllDoanhso', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.doanhso.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Doanhso not found');
            return item;
        }
        catch (error) {
            this._ErrorlogService.logError('findOneDoanhso', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.doanhso.update({ where: { id }, data: rest });
                updated = await this.prisma.doanhso.update({ where: { id }, data: { order } });
            }
            else {
                updated = await this.prisma.doanhso.update({ where: { id }, data });
            }
            this._SocketGateway.sendUpdate('doanhso');
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updateDoanhso', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.doanhso.delete({ where: { id } });
            this._SocketGateway.sendUpdate('doanhso');
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removeDoanhso', error);
            throw error;
        }
    }
    async reorderDoanhsos(doanhsoIds) {
        try {
            for (let i = 0; i < doanhsoIds.length; i++) {
                await this.prisma.doanhso.update({
                    where: { id: doanhsoIds[i] },
                    data: { order: i + 1 }
                });
            }
            this._SocketGateway.sendUpdate('doanhso');
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderDoanhsos', error);
            throw error;
        }
    }
};
exports.DoanhsoService = DoanhsoService;
exports.DoanhsoService = DoanhsoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], DoanhsoService);
//# sourceMappingURL=doanhso.service.js.map