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
const errorlogs_service_1 = require("../errorlogs/errorlogs.service");
const socket_gateway_1 = require("../socket.gateway");
let SanphamService = class SanphamService {
    constructor(prisma, _SocketGateway, _ErrorlogsService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogsService = _ErrorlogsService;
    }
    async getLastUpdatedSanpham() {
        const lastUpdated = await this.prisma.sanpham.aggregate({
            _max: {
                updatedAt: true,
            },
        });
        return { updatedAt: lastUpdated._max.updatedAt || 0 };
    }
    async generateMaSP() {
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
    async create(data) {
        data.masp = data.masp ? data.masp : await this.generateMaSP();
        const existingSanpham = await this.prisma.sanpham.findUnique({
            where: { masp: data.masp },
        });
        if (existingSanpham) {
            return existingSanpham;
        }
        let newOrder;
        const maxOrder = await this.prisma.sanpham.aggregate({
            _max: { order: true },
        });
        newOrder = (maxOrder._max?.order || 0) + 1;
        this._SocketGateway.sendSanphamUpdate();
        return this.prisma.sanpham.create({
            data: {
                ...data,
                order: newOrder,
            },
        });
    }
    async reorderSanphams(sanphamIds) {
        for (let i = 0; i < sanphamIds.length; i++) {
            await this.prisma.sanpham.update({
                where: { id: sanphamIds[i] },
                data: { order: i + 1 },
            });
        }
    }
    async findAll() {
        try {
            return await this.prisma.sanpham.findMany();
        }
        catch (error) {
            this._ErrorlogsService.logError('Lỗi lấy tất cả sản phẩm', {
                error: error.message,
            });
            throw error;
        }
    }
    async findOne(id) {
        const sanpham = await this.prisma.sanpham.findUnique({
            where: { id },
            include: {
                Nhacungcap: true,
                Donhangsanpham: {
                    include: {
                        donhang: true,
                    },
                },
                Dathangsanpham: {
                    include: {
                        dathang: true,
                    },
                },
            },
        });
        if (!sanpham)
            throw new common_1.NotFoundException('Sanpham not found');
        return {
            ...sanpham,
            Donhangsanpham: sanpham.Donhangsanpham.map((item) => ({
                createdAt: item.donhang.createdAt || null,
                madonhang: item.donhang.madonhang,
                sldat: item.sldat || 0,
                slgiao: item.slgiao || 0,
                slnhan: item.slnhan || 0,
            })),
            Dathangsanpham: sanpham.Dathangsanpham.map((item) => ({
                createdAt: item.dathang.createdAt || null,
                madncc: item.dathang.madncc,
                sldat: item.sldat || 0,
                slgiao: item.slgiao || 0,
                slnhan: item.slnhan || 0,
            })),
        };
    }
    async finby(id) {
        const sanpham = await this.prisma.sanpham.findUnique({
            where: { id },
            include: {
                Donhangsanpham: {
                    include: {
                        donhang: true,
                    },
                },
                Dathangsanpham: {
                    include: {
                        dathang: true,
                    },
                },
            },
        });
        if (!sanpham)
            throw new common_1.NotFoundException('Sanpham not found');
        return {
            ...sanpham,
            Donhangsanpham: sanpham.Donhangsanpham.map((item) => ({
                createdAt: item.donhang.createdAt || null,
                madonhang: item.donhang.madonhang,
                sldat: item.sldat || 0,
                slgiao: item.slgiao || 0,
                slnhan: item.slnhan || 0,
            })),
            Dathangsanpham: sanpham.Dathangsanpham.map((item) => ({
                createdAt: item.dathang.createdAt || null,
                madncc: item.dathang.madncc,
                sldat: item.sldat || 0,
                slgiao: item.slgiao || 0,
                slnhan: item.slnhan || 0,
            })),
        };
    }
    async update(id, data) {
        const { Donhangsanpham, Dathangsanpham, Nhacungcap, ...rest } = data;
        const updatedSanpham = await this.prisma.sanpham.update({
            where: { id },
            data: {
                ...rest,
                Nhacungcap: {
                    set: Nhacungcap.map((nc) => ({ id: nc.id })),
                },
            },
        });
        this._SocketGateway.sendSanphamUpdate();
        return updatedSanpham;
    }
    async remove(id) {
        return this.prisma.sanpham.delete({ where: { id } });
    }
};
exports.SanphamService = SanphamService;
exports.SanphamService = SanphamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlogs_service_1.ErrorlogsService])
], SanphamService);
//# sourceMappingURL=sanpham.service.js.map