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
exports.DathangService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const socket_gateway_1 = require("../socket.gateway");
let DathangService = class DathangService {
    constructor(prisma, _SocketGateway) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
    }
    async getLastUpdatedDathang() {
        try {
            const lastUpdated = await this.prisma.dathang.aggregate({
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
            const latest = await this.prisma.dathang.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const prefix = 'DATH';
                const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `DATH${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            throw error;
        }
    }
    async create(payload) {
        try {
            const { nhacungcapId, total, status, order, dathangsanpham } = payload;
            const codeId = payload.codeId || await this.generateCodeId();
            const existingOrder = await this.prisma.dathang.findUnique({ where: { codeId } });
            if (existingOrder) {
                throw new common_1.ConflictException('Mã đơn hàng đã tồn tại');
            }
            const nhacungcap = await this.prisma.nhacungcap.findUnique({ where: { id: nhacungcapId } });
            if (!nhacungcap) {
                throw new common_1.NotFoundException('Khách hàng không tồn tại');
            }
            for (const item of dathangsanpham) {
                const sanpham = await this.prisma.sanpham.findUnique({ where: { id: item.sanphamId } });
                if (!sanpham) {
                    throw new common_1.NotFoundException(`Sản phẩm với ID ${item.sanphamId} không tồn tại`);
                }
            }
            const maxOrder = await this.prisma.dathang.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const created = await this.prisma.dathang.create({
                data: {
                    codeId,
                    nhacungcapId,
                    total,
                    status: status || 'pending',
                    order: order || newOrder,
                    dathangsanpham: {
                        create: dathangsanpham.map(item => ({
                            sanphamId: item.sanphamId,
                            sldat: item.sldat,
                            slgiao: item.slgiao || 0,
                            slnhan: item.slnhan || 0,
                            slhuy: item.slhuy || 0,
                            giaban: item.giaban,
                        })),
                    },
                },
                include: { dathangsanpham: true, nhacungcap: true },
            });
            this._SocketGateway.sendUpdate('dathang');
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
                const result = await this.prisma.dathang.findFirst({
                    where,
                    include: {
                        dathangsanpham: { include: { sanpham: true } },
                        nhacungcap: true,
                    },
                    orderBy: { order: 'asc' },
                });
                if (!result)
                    throw new common_1.NotFoundException('Đơn hàng không tồn tại');
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.dathang.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                    include: {
                        dathangsanpham: { include: { sanpham: true } },
                        nhacungcap: true,
                    },
                }),
                this.prisma.dathang.count({ where }),
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
                this.prisma.dathang.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                    include: {
                        dathangsanpham: { include: { sanpham: true } },
                        nhacungcap: true,
                    },
                }),
                this.prisma.dathang.count(),
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
            const item = await this.prisma.dathang.findUnique({
                where: { id },
                include: {
                    dathangsanpham: { include: { sanpham: true } },
                    nhacungcap: true,
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
            const { codeId, nhacungcapId, dathangsanpham, nhacungcap, ...data } = payload;
            const order = await this.prisma.dathang.findUnique({ where: { id } });
            if (!order) {
                throw new common_1.NotFoundException('Đơn hàng không tồn tại');
            }
            if (codeId && codeId !== order.codeId) {
                const existingOrder = await this.prisma.dathang.findUnique({ where: { codeId } });
                if (existingOrder) {
                    throw new common_1.ConflictException('Mã đơn hàng đã tồn tại');
                }
            }
            if (nhacungcapId) {
                const nhacungcap = await this.prisma.nhacungcap.findUnique({ where: { id: nhacungcapId } });
                if (!nhacungcap) {
                    throw new common_1.NotFoundException('Khách hàng không tồn tại');
                }
            }
            if (dathangsanpham) {
                for (const item of dathangsanpham) {
                    const sanpham = await this.prisma.sanpham.findUnique({ where: { id: item.sanphamId } });
                    if (!sanpham) {
                        throw new common_1.NotFoundException(`Sản phẩm với ID ${item.sanphamId} không tồn tại`);
                    }
                }
            }
            const updated = await this.prisma.dathang.update({
                where: { id },
                data: {
                    ...data,
                    codeId: codeId || order.codeId,
                    nhacungcapId: nhacungcapId || order.nhacungcapId,
                    ...(dathangsanpham && {
                        dathangsanpham: {
                            deleteMany: {},
                            create: dathangsanpham.map((item) => ({
                                sanphamId: item.sanphamId,
                                sldat: item.sldat,
                                slgiao: item.slgiao || 0,
                                slnhan: item.slnhan || 0,
                                slhuy: item.slhuy || 0,
                                giaban: item.giaban,
                            })),
                        },
                    }),
                },
                include: { dathangsanpham: true, nhacungcap: true },
            });
            this._SocketGateway.sendUpdate('dathang');
            return updated;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const order = await this.prisma.dathang.findUnique({ where: { id } });
            if (!order) {
                throw new common_1.NotFoundException('Đơn hàng không tồn tại');
            }
            const deleted = await this.prisma.dathang.delete({ where: { id } });
            this._SocketGateway.sendUpdate('dathang');
            return deleted;
        }
        catch (error) {
            throw error;
        }
    }
    async reorderDathangs(dathangIds) {
        try {
            for (let i = 0; i < dathangIds.length; i++) {
                await this.prisma.dathang.update({
                    where: { id: dathangIds[i] },
                    data: { order: i + 1 },
                });
            }
            this._SocketGateway.sendUpdate('dathang');
            return { status: 'success' };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.DathangService = DathangService;
exports.DathangService = DathangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway])
], DathangService);
//# sourceMappingURL=dathang.service.js.map