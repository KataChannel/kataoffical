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
let DonhangService = class DonhangService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateOrderCode() {
        const lastOrder = await this.prisma.donhang.findFirst({
            orderBy: { madonhang: 'desc' },
            select: { madonhang: true },
        });
        let newCode = 'DH0000001';
        if (lastOrder?.madonhang) {
            const lastNumber = parseInt(lastOrder.madonhang.replace('DH', ''), 10);
            if (lastNumber < 9999999) {
                newCode = `DH${(lastNumber + 1).toString().padStart(7, '0')}`;
            }
            else {
                throw new Error('Đã đạt giới hạn số lượng mã đơn hàng!');
            }
        }
        return newCode;
    }
    async reorderDonHangs(donhangIds) {
        for (let i = 0; i < donhangIds.length; i++) {
            await this.prisma.donhang.update({
                where: { id: donhangIds[i] },
                data: { order: i + 1 },
            });
        }
    }
    async search(params) {
        const { Batdau, Ketthuc, Type, pageSize, pageNumber } = params;
        console.log(params);
        return this.prisma.donhang.findMany({
            where: {
                ngaygiao: {
                    gte: new Date(Batdau) || new Date(),
                    lte: new Date(Ketthuc) || new Date(),
                },
                type: Type,
            },
            take: pageSize,
            skip: pageNumber * pageSize,
            orderBy: { ngaygiao: 'desc' },
        });
    }
    async findAll() {
        const donhangs = await this.prisma.donhang.findMany({
            include: {
                sanpham: {
                    include: {
                        sanpham: true,
                    },
                },
                khachhang: true,
            },
        });
        return donhangs.map((donhang) => ({
            ...donhang,
            sanpham: donhang.sanpham.map((item) => ({
                ...item.sanpham,
                idSP: item.idSP,
                sldat: item.sldat,
                slgiao: item.slgiao,
                slnhan: item.slnhan,
                ttdat: item.ttdat,
                ttgiao: item.ttgiao,
                ttnhan: item.ttnhan,
                ghichu: item.ghichu,
            })),
        }));
    }
    async findOne(id) {
        const donhang = await this.prisma.donhang.findUnique({
            where: { id },
            include: {
                sanpham: {
                    include: {
                        sanpham: true,
                    },
                },
                khachhang: true,
            },
        });
        if (!donhang)
            throw new common_1.NotFoundException('DonHang not found');
        return {
            ...donhang,
            sanpham: donhang.sanpham.map((item) => ({
                ...item.sanpham,
                idSP: item.idSP,
                sldat: item.sldat,
                slgiao: item.slgiao,
                slnhan: item.slnhan,
                ttdat: item.ttdat,
                ttgiao: item.ttgiao,
                ttnhan: item.ttnhan,
                ghichu: item.ghichu,
            })),
        };
    }
    async create(dto) {
        const madonhang = await this.generateOrderCode();
        return this.prisma.$transaction(async (prisma) => {
            const newDonhang = await prisma.donhang.create({
                data: {
                    title: dto.title,
                    type: dto.type,
                    madonhang: madonhang,
                    ngaygiao: new Date(dto.ngaygiao),
                    khachhangId: dto.khachhangId,
                    isActive: dto.isActive,
                    order: dto.order,
                    ghichu: dto.ghichu,
                    sanpham: {
                        create: dto?.sanpham?.map((sp) => ({
                            idSP: sp.id,
                            ghichu: sp.ghichu,
                            sldat: sp.sldat ?? 0,
                            slgiao: sp.slgiao ?? 0,
                            slnhan: sp.slnhan ?? 0,
                            ttdat: sp.ttdat ?? 0,
                            ttgiao: sp.ttgiao ?? 0,
                            ttnhan: sp.ttnhan ?? 0,
                        })),
                    },
                },
                include: {
                    sanpham: true,
                },
            });
            for (const sp of dto.sanpham) {
                await prisma.sanpham.update({
                    where: { id: sp.id },
                    data: {
                        soluong: {
                            decrement: sp.sldat ?? 0,
                        },
                    },
                });
            }
            return newDonhang;
        });
    }
    async update(id, data) {
        return this.prisma.$transaction(async (prisma) => {
            const oldDonhang = await prisma.donhang.findUnique({
                where: { id },
                include: { sanpham: true },
            });
            if (!oldDonhang)
                throw new Error('Đơn hàng không tồn tại');
            for (const oldSP of oldDonhang.sanpham) {
                await prisma.sanpham.update({
                    where: { id: oldSP.idSP },
                    data: {
                        soluong: {
                            increment: oldSP.sldat ?? 0,
                        },
                    },
                });
            }
            const updatedDonhang = await prisma.donhang.update({
                where: { id },
                data: {
                    title: data.title,
                    type: data.type,
                    madonhang: data.madonhang,
                    ngaygiao: new Date(data.ngaygiao),
                    khachhangId: data.khachhangId,
                    isActive: data.isActive,
                    order: data.order,
                    ghichu: data.ghichu,
                    sanpham: {
                        deleteMany: {},
                        create: data?.sanpham?.map((sp) => ({
                            idSP: sp.id,
                            ghichu: sp.ghichu,
                            sldat: sp.sldat ?? 0,
                            slgiao: sp.slgiao ?? 0,
                            slnhan: sp.slnhan ?? 0,
                            ttdat: sp.ttdat ?? 0,
                            ttgiao: sp.ttgiao ?? 0,
                            ttnhan: sp.ttnhan ?? 0,
                        })),
                    },
                },
                include: {
                    sanpham: true,
                },
            });
            for (const newSP of data.sanpham) {
                await prisma.sanpham.update({
                    where: { id: newSP.id },
                    data: {
                        soluong: {
                            decrement: newSP.sldat ?? 0,
                        },
                    },
                });
            }
            return updatedDonhang;
        });
    }
    async remove(id) {
        return this.prisma.donhang.delete({ where: { id } });
    }
};
exports.DonhangService = DonhangService;
exports.DonhangService = DonhangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DonhangService);
//# sourceMappingURL=donhang.service.js.map