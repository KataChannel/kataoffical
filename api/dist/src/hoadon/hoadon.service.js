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
exports.HoadonService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("./socket.gateway");
let HoadonService = class HoadonService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedHoadon() {
        try {
            const lastUpdated = await this.prisma.hoadon.aggregate({
                _max: { updatedAt: true },
            });
            return { updatedAt: lastUpdated._max.updatedAt || 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedHoadon', error);
            throw error;
        }
    }
    async generateCodeId() {
    }
    async create(data) {
        try {
            const created = await this.prisma.hoadon.create({ data });
            this._SocketGateway.sendHoadonUpdate();
            return created;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.BadRequestException('Hóa đơn đã tồn tại.');
            }
            this._ErrorlogService.logError('createHoadon', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { page = 1, limit = 20, ...where } = param;
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.hoadon.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { updatedAt: 'desc' },
                }),
                this.prisma.hoadon.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findBy hoadon', error);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.hoadon.findMany({
                    skip,
                    take: limit,
                    orderBy: { updatedAt: 'desc' },
                }),
                this.prisma.hoadon.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAll hoadon', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const hoadon = await this.prisma.hoadon.findUnique({ where: { id } });
            if (!hoadon)
                throw new common_1.NotFoundException('Hoadon not found');
            return hoadon;
        }
        catch (error) {
            this._ErrorlogService.logError('findOne hoadon', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            let updated;
            updated = await this.prisma.hoadon.update({ where: { id }, data });
            this._SocketGateway.sendHoadonUpdate();
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updateHoadon', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.hoadon.delete({ where: { id } });
            this._SocketGateway.sendHoadonUpdate();
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removeHoadon', error);
            throw error;
        }
    }
    async reorderHoadons(hoadonIds) {
    }
};
exports.HoadonService = HoadonService;
exports.HoadonService = HoadonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], HoadonService);
//# sourceMappingURL=hoadon.service.js.map