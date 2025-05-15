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
            this._ErrorlogService.logError('getLastUpdatedSanpham', error);
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
                const match = latest.codeId.match(/I1(\d+)/);
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `I1${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generateCodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.sanpham.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const created = await this.prisma.sanpham.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId
                },
            });
            this._SocketGateway.sendUpdate('sanpham');
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createSanpham', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.sanpham.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.sanpham.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.sanpham.count({ where }),
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
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.sanpham.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.sanpham.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllSanpham', error);
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
            this._ErrorlogService.logError('findOneSanpham', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.sanpham.update({ where: { id }, data: rest });
                updated = await this.prisma.sanpham.update({ where: { id }, data: { order } });
            }
            else {
                updated = await this.prisma.sanpham.update({ where: { id }, data });
            }
            this._SocketGateway.sendUpdate('sanpham');
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updateSanpham', error);
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
            this._ErrorlogService.logError('removeSanpham', error);
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
            this._ErrorlogService.logError('reorderSanphams', error);
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