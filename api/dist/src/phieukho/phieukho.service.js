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
exports.PhieukhoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let PhieukhoService = class PhieukhoService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedPhieukho() {
        try {
            const lastUpdated = await this.prisma.phieukho.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedPhieukho', error);
            throw error;
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.phieukho.findFirst({
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
            this._ErrorlogService.logError('generatePhieukhoCodeId', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.phieukho.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const created = await this.prisma.phieukho.create({
                data: {
                    ...data,
                    order: newOrder,
                    codeId: codeId
                },
            });
            this._SocketGateway.sendUpdate('phieukho');
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createPhieukho', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.phieukho.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.phieukho.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.phieukho.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByPhieukho', error);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.phieukho.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.phieukho.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit)
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllPhieukho', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.phieukho.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Phieukho not found');
            return item;
        }
        catch (error) {
            this._ErrorlogService.logError('findOnePhieukho', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.phieukho.update({ where: { id }, data: rest });
                updated = await this.prisma.phieukho.update({ where: { id }, data: { order } });
            }
            else {
                updated = await this.prisma.phieukho.update({ where: { id }, data });
            }
            this._SocketGateway.sendUpdate('phieukho');
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updatePhieukho', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.phieukho.delete({ where: { id } });
            this._SocketGateway.sendUpdate('phieukho');
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removePhieukho', error);
            throw error;
        }
    }
    async reorderPhieukhos(phieukhoIds) {
        try {
            for (let i = 0; i < phieukhoIds.length; i++) {
                await this.prisma.phieukho.update({
                    where: { id: phieukhoIds[i] },
                    data: { order: i + 1 }
                });
            }
            this._SocketGateway.sendUpdate('phieukho');
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderPhieukhos', error);
            throw error;
        }
    }
};
exports.PhieukhoService = PhieukhoService;
exports.PhieukhoService = PhieukhoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], PhieukhoService);
//# sourceMappingURL=phieukho.service.js.map