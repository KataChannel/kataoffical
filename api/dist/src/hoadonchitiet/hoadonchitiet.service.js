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
exports.hoadonChitietService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("./socket.gateway");
let hoadonChitietService = class hoadonChitietService {
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
            return { updatedAt: lastUpdated._max.updatedAt || 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedhoadonChitiet', error);
            throw error;
        }
    }
    async create(data) {
        try {
            const { idhdon, ...payload } = data;
            if (idhdon) {
                const hoadon = await this.prisma.hoadon.findUnique({
                    where: { id: idhdon },
                });
                if (!hoadon) {
                    throw new common_1.NotFoundException('Hóa đơn không tồn tại');
                }
                payload.hoadon = { connect: { id: hoadon.id } };
            }
            const created = await this.prisma.hoadonChitiet.create({ data: payload });
            this._SocketGateway.sendHoadonchitietUpdate();
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createhoadonChitiet', error);
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { page = 1, limit = 20, ...where } = param;
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.hoadonChitiet.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { updatedAt: 'asc' },
                }),
                this.prisma.hoadonChitiet.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findBy hoadonChitiet', error);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.hoadonChitiet.findMany({
                    skip,
                    take: limit,
                    orderBy: { updatedAt: 'asc' },
                }),
                this.prisma.hoadonChitiet.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAll hoadonChitiet', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const hoadonChitiet = await this.prisma.hoadonChitiet.findUnique({ where: { id } });
            if (!hoadonChitiet)
                throw new common_1.NotFoundException('hoadonChitiet not found');
            return hoadonChitiet;
        }
        catch (error) {
            this._ErrorlogService.logError('findOne hoadonChitiet', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            let updated;
            updated = await this.prisma.hoadonChitiet.update({ where: { id }, data });
            this._SocketGateway.sendHoadonchitietUpdate();
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updatehoadonChitiet', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.hoadonChitiet.delete({ where: { id } });
            this._SocketGateway.sendHoadonchitietUpdate();
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removehoadonChitiet', error);
            throw error;
        }
    }
    async reorderhoadonChitiets(hoadonChitietIds) {
    }
};
exports.hoadonChitietService = hoadonChitietService;
exports.hoadonChitietService = hoadonChitietService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], hoadonChitietService);
//# sourceMappingURL=hoadonchitiet.service.js.map