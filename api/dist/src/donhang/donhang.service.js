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
exports.DonhangService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const socket_gateway_1 = require("../socket.gateway");
let DonhangService = class DonhangService {
    constructor(prisma, _SocketGateway) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
    }
    async getLastUpdatedDonhang() {
        try {
            const lastUpdated = await this.prisma.donhang.aggregate({
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
            const latest = await this.prisma.donhang.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const prefix = 'DON';
                const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `DON${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            throw error;
        }
    }
    async create(payload) {
        try {
            const { khachhangId, total, status, order, donhangsanpham } = payload;
            const codeId = payload.codeId || await this.generateCodeId();
            const existingOrder = await this.prisma.donhang.findUnique({ where: { codeId } });
            if (existingOrder) {
                throw new common_1.ConflictException('Mã đơn hàng đã tồn tại');
            }
            const khachhang = await this.prisma.khachhang.findUnique({ where: { id: khachhangId } });
            if (!khachhang) {
                throw new common_1.NotFoundException('Khách hàng không tồn tại');
            }
            for (const item of donhangsanpham) {
                const sanpham = await this.prisma.sanpham.findUnique({ where: { id: item.sanphamId } });
                if (!sanpham) {
                    throw new common_1.NotFoundException(`Sản phẩm với ID ${item.sanphamId} không tồn tại`);
                }
            }
            const maxOrder = await this.prisma.donhang.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const created = await this.prisma.donhang.create({
                data: {
                    codeId,
                    khachhangId,
                    total,
                    status: status || 'pending',
                    order: order || newOrder,
                    donhangsanpham: {
                        create: donhangsanpham.map(item => ({
                            sanphamId: item.sanphamId,
                            sldat: item.sldat,
                            slgiao: item.slgiao || 0,
                            slnhan: item.slnhan || 0,
                            slhuy: item.slhuy || 0,
                            gia: item.gia,
                        })),
                    },
                },
                include: { donhangsanpham: true, khachhang: true },
            });
            this._SocketGateway.sendUpdate('donhang');
            return created;
        }
        catch (error) {
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.donhang.findFirst({
                    where,
                    include: {
                        donhangsanpham: { include: { sanpham: true } },
                        khachhang: true,
                    },
                    orderBy: { order: 'asc' },
                });
                if (!result)
                    throw new common_1.NotFoundException('Đơn hàng không tồn tại');
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.donhang.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                    include: {
                        donhangsanpham: { include: { sanpham: true } },
                        khachhang: true,
                    },
                }),
                this.prisma.donhang.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.donhang.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                    include: {
                        donhangsanpham: { include: { sanpham: true } },
                        khachhang: true,
                    },
                }),
                this.prisma.donhang.count(),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.donhang.findUnique({
                where: { id },
                include: {
                    donhangsanpham: { include: { sanpham: true } },
                    khachhang: true,
                },
            });
            if (!item)
                throw new common_1.NotFoundException('Đơn hàng không tồn tại');
            return item;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, payload) {
        try {
            const { codeId, khachhangId, donhangsanpham, khachhang, ...data } = payload;
            const order = await this.prisma.donhang.findUnique({ where: { id } });
            if (!order) {
                throw new common_1.NotFoundException('Đơn hàng không tồn tại');
            }
            if (codeId && codeId !== order.codeId) {
                const existingOrder = await this.prisma.donhang.findUnique({ where: { codeId } });
                if (existingOrder) {
                    throw new common_1.ConflictException('Mã đơn hàng đã tồn tại');
                }
            }
            if (khachhangId) {
                const khachhang = await this.prisma.khachhang.findUnique({ where: { id: khachhangId } });
                if (!khachhang) {
                    throw new common_1.NotFoundException('Khách hàng không tồn tại');
                }
            }
            if (donhangsanpham) {
                for (const item of donhangsanpham) {
                    const sanpham = await this.prisma.sanpham.findUnique({ where: { id: item.sanphamId } });
                    if (!sanpham) {
                        throw new common_1.NotFoundException(`Sản phẩm với ID ${item.sanphamId} không tồn tại`);
                    }
                }
            }
            const updated = await this.prisma.donhang.update({
                where: { id },
                data: {
                    ...data,
                    codeId: codeId || order.codeId,
                    khachhangId: khachhangId || order.khachhangId,
                    ...(donhangsanpham && {
                        donhangsanpham: {
                            deleteMany: {},
                            create: donhangsanpham.map((item) => ({
                                sanphamId: item.sanphamId,
                                sldat: item.sldat,
                                slgiao: item.slgiao || 0,
                                slnhan: item.slnhan || 0,
                                slhuy: item.slhuy || 0,
                                gia: item.gia,
                            })),
                        },
                    }),
                },
                include: { donhangsanpham: true, khachhang: true },
            });
            this._SocketGateway.sendUpdate('donhang');
            return updated;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const order = await this.prisma.donhang.findUnique({ where: { id } });
            if (!order) {
                throw new common_1.NotFoundException('Đơn hàng không tồn tại');
            }
            const deleted = await this.prisma.donhang.delete({ where: { id } });
            this._SocketGateway.sendUpdate('donhang');
            return deleted;
        }
        catch (error) {
            throw error;
        }
    }
    async reorderDonhangs(donhangIds) {
        try {
            for (let i = 0; i < donhangIds.length; i++) {
                await this.prisma.donhang.update({
                    where: { id: donhangIds[i] },
                    data: { order: i + 1 },
                });
            }
            this._SocketGateway.sendUpdate('donhang');
            return { status: 'success' };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.DonhangService = DonhangService;
exports.DonhangService = DonhangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway])
], DonhangService);
//# sourceMappingURL=donhang.service.js.map