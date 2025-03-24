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
                _max: {
                    updatedAt: true,
                },
            });
            return { updatedAt: lastUpdated._max.updatedAt || 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedSanpham', error);
            throw error;
        }
    }
    async generateMaSP() {
        try {
            const latest = await this.prisma.sanpham.findFirst({
                orderBy: { masp: 'desc' },
            });
            let nextNumber = 1;
            if (latest) {
                const match = latest.masp.match(/I1(\d+)/);
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `I1${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generateMaSP', error);
            throw error;
        }
    }
    async create(data) {
        try {
            let newOrder;
            const maxOrder = await this.prisma.sanpham.aggregate({
                _max: { order: true },
            });
            newOrder = (maxOrder._max?.order || 0) + 1;
            this._SocketGateway.sendSanphamUpdate();
            const masp = await this.generateMaSP();
            return this.prisma.sanpham.create({
                data: {
                    ...data,
                    order: newOrder,
                    masp: masp,
                },
            });
        }
        catch (error) {
            this._ErrorlogService.logError('createSanpham', error);
            throw error;
        }
    }
    async reorderSanphams(sanphamIds) {
        try {
            for (let i = 0; i < sanphamIds.length; i++) {
                await this.prisma.sanpham.update({
                    where: { id: sanphamIds[i] },
                    data: { order: i + 1 },
                });
            }
        }
        catch (error) {
            this._ErrorlogService.logError('reorderSanphams', error);
            throw error;
        }
    }
    async findAll() {
        try {
            return this.prisma.sanpham.findMany();
        }
        catch (error) {
            this._ErrorlogService.logError('findAll', error);
            throw error;
        }
    }
    async findby(param) {
        try {
            const sanpham = await this.prisma.sanpham.findUnique({ where: param });
            if (!sanpham)
                throw new common_1.NotFoundException('Sanpham not found');
            return sanpham;
        }
        catch (error) {
            this._ErrorlogService.logError('findby', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const sanpham = await this.prisma.sanpham.findUnique({ where: { id } });
            if (!sanpham)
                throw new common_1.NotFoundException('Sanpham not found');
            return sanpham;
        }
        catch (error) {
            this._ErrorlogService.logError('findOne', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.sanpham.update({ where: { id }, data: rest });
                await this.prisma.sanpham.update({ where: { id }, data: { order } });
            }
            this._SocketGateway.sendSanphamUpdate();
            return this.prisma.sanpham.update({ where: { id }, data });
        }
        catch (error) {
            this._ErrorlogService.logError('updateSanpham', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            this._SocketGateway.sendSanphamUpdate();
            return this.prisma.sanpham.delete({ where: { id } });
        }
        catch (error) {
            this._ErrorlogService.logError('removeSanpham', error);
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