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
exports.HoadonchitietService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let HoadonchitietService = class HoadonchitietService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedhoadonChitiet() {
        try {
            const lastUpdated = await this.prisma.hoadonChitiet.aggregate({
                _max: { updatedAt: true },
            });
            return {
                updatedAt: lastUpdated._max.updatedAt
                    ? new Date(lastUpdated._max.updatedAt).getTime()
                    : 0
            };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedhoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.hoadonChitiet.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const prefix = 'DONHANG';
                const match = latest.codeId.match(new RegExp(prefix + '(\d+)'));
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            const newPrefix = 'DONHANG';
            return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generatehoadonChitietCodeId', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.hoadonChitiet.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const { id, idhoadon, ...rest } = data;
            console.log('Creating hoadonChitiet with idhoadon:', idhoadon);
            const hoadonExists = await this.prisma.hoadon.findFirst({ where: { id: idhoadon } });
            if (!hoadonExists) {
                throw new common_1.HttpException('Referenced Hoadon not found', common_1.HttpStatus.BAD_REQUEST);
            }
            const created = await this.prisma.hoadonChitiet.create({
                data: {
                    ...rest,
                    order: newOrder,
                    codeId: codeId,
                    idhoadon: idhoadon,
                },
            });
            this._SocketGateway.sendUpdate('hoadonchitiet');
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createhoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.hoadonChitiet.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.hoadonChitiet.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.hoadonChitiet.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByhoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.hoadonChitiet.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.hoadonChitiet.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllhoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.hoadonChitiet.findUnique({ where: { id } });
            if (!item)
                throw new common_1.HttpException('hoadonChitiet not found', common_1.HttpStatus.NOT_FOUND);
            return item;
        }
        catch (error) {
            this._ErrorlogService.logError('findOnehoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.hoadonChitiet.update({ where: { id }, data: rest });
                updated = await this.prisma.hoadonChitiet.update({ where: { id }, data: { order } });
            }
            else {
                updated = await this.prisma.hoadonChitiet.update({ where: { id }, data });
            }
            this._SocketGateway.sendUpdate('hoadonchitiet');
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updatehoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.hoadonChitiet.delete({ where: { id } });
            this._SocketGateway.sendUpdate('hoadonchitiet');
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removehoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async reorderhoadonChitiets(hoadonChitietIds) {
        try {
            for (let i = 0; i < hoadonChitietIds.length; i++) {
                await this.prisma.hoadonChitiet.update({
                    where: { id: hoadonChitietIds[i] },
                    data: { order: i + 1 }
                });
            }
            this._SocketGateway.sendUpdate('hoadonchitiet');
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderhoadonChitiets', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.HoadonchitietService = HoadonchitietService;
exports.HoadonchitietService = HoadonchitietService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], HoadonchitietService);
//# sourceMappingURL=hoadonchitiet.service.js.map