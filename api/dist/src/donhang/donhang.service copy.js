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
const moment = require("moment-timezone");
const DEFAUL_KHO_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
let DonhangService = class DonhangService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateNextOrderCode() {
        const lastOrder = await this.prisma.donhang.findFirst({
            orderBy: { createdAt: 'desc' },
        });
        let nextCode = 'TG-AA00001';
        if (lastOrder) {
            nextCode = this.incrementOrderCode(lastOrder.madonhang);
        }
        return nextCode;
    }
    incrementOrderCode(orderCode) {
        const prefix = 'TG-';
        const letters = orderCode.slice(3, 5);
        const numbers = parseInt(orderCode.slice(5), 10);
        let newLetters = letters;
        let newNumbers = numbers + 1;
        if (newNumbers > 99999) {
            newNumbers = 1;
            newLetters = this.incrementLetters(letters);
        }
        return `${prefix}${newLetters}${newNumbers.toString().padStart(5, '0')}`;
    }
    incrementLetters(letters) {
        let firstChar = letters.charCodeAt(0);
        let secondChar = letters.charCodeAt(1);
        if (secondChar === 90) {
            if (firstChar === 90)
                return 'ZZ';
            firstChar++;
            secondChar = 65;
        }
        else {
            secondChar++;
        }
        return String.fromCharCode(firstChar) + String.fromCharCode(secondChar);
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
        const { Batdau, Ketthuc, Type, pageSize = 10, pageNumber = 1 } = params;
        const where = {
            ngaygiao: {
                gte: Batdau
                    ? moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate()
                    : undefined,
                lte: Ketthuc
                    ? moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate()
                    : undefined,
            },
            type: Type,
            status: Array.isArray(params.Status)
                ? { in: params.Status }
                : params.Status,
        };
        const [total, donhangs] = await Promise.all([
            this.prisma.donhang.count({ where }),
            this.prisma.donhang.findMany({
                where,
                include: {
                    sanpham: {
                        include: {
                            sanpham: true,
                        },
                    },
                    khachhang: { include: { banggia: { include: { sanpham: true } } } },
                },
                orderBy: { createdAt: 'desc' },
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
            }),
        ]);
        const result = donhangs.map(({ khachhang, sanpham, ...donhang }) => ({
            ...donhang,
            sanpham: sanpham.map((item) => ({
                ...item.sanpham,
                idSP: item.idSP,
                giaban: khachhang.banggia
                    .find((bg) => donhang.ngaygiao &&
                    bg.batdau &&
                    bg.ketthuc &&
                    donhang.ngaygiao >= bg.batdau &&
                    donhang.ngaygiao <= bg.ketthuc)
                    ?.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban,
                sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
                slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
                slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
                ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
                ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
                ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
                ghichu: item.ghichu,
            })),
            khachhang: (({ banggia, ...rest }) => rest)(khachhang),
            name: khachhang.name,
        }));
        return {
            data: result,
            total,
            pageNumber,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        };
    }
    async phieuchuyen(params) {
        const { Batdau, Ketthuc, Type } = params;
        console.log('Batdau', moment(Batdau).startOf('day').toDate());
        console.log('Ketthuc', moment(Ketthuc).endOf('day').toDate());
        const result = await this.prisma.donhang.findMany({
            where: {
                ngaygiao: {
                    gte: Batdau
                        ? moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate()
                        : undefined,
                    lte: Ketthuc
                        ? moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate()
                        : undefined,
                },
                type: Type,
                status: Array.isArray(params.Status)
                    ? { in: params.Status }
                    : params.Status,
            },
            include: {
                sanpham: {
                    include: {
                        sanpham: true,
                    },
                },
                khachhang: { include: { banggia: { include: { sanpham: true } } } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return result.map(({ khachhang, sanpham, ...donhang }) => ({
            ...donhang,
            name: khachhang.name,
            diachi: khachhang.diachi,
            sdt: khachhang.sdt,
            gionhanhang: khachhang.gionhanhang,
            tongsomon: sanpham.length,
            soluongtt: sanpham.reduce((total, item) => total + item.slgiao, 0),
        }));
    }
    async phieugiao(params) {
        console.log('params', params);
        const result = await this.prisma.donhang.findUnique({
            where: params,
            include: {
                sanpham: {
                    include: {
                        sanpham: true,
                    },
                },
                khachhang: { include: { banggia: { include: { sanpham: true } } } },
            },
        });
        if (!result) {
            throw new common_1.NotFoundException('DonHang not found');
        }
        console.log('result', result);
        return {
            ...result,
            sanpham: result.sanpham.map((item) => ({
                ...item.sanpham,
                idSP: item.idSP,
                giaban: result.khachhang.banggia
                    .find((bg) => result.ngaygiao &&
                    bg.batdau &&
                    bg.ketthuc &&
                    result.ngaygiao >= bg.batdau &&
                    result.ngaygiao <= bg.ketthuc)
                    ?.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban,
                sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
                slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
                slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
                ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
                ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
                ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
                ghichu: item.ghichu,
            })),
            khachhang: (({ banggia, ...rest }) => rest)(result.khachhang),
        };
    }
    async findAll() {
        const donhangs = await this.prisma.donhang.findMany({
            include: {
                sanpham: {
                    include: {
                        sanpham: true,
                    },
                },
                khachhang: { include: { banggia: { include: { sanpham: true } } } },
            },
        });
        const result = donhangs.map((donhang) => ({
            ...donhang,
            sanpham: donhang.sanpham.map((item) => ({
                ...item.sanpham,
                idSP: item.idSP,
                giaban: donhang.khachhang.banggia
                    .find((bg) => donhang.ngaygiao &&
                    bg.batdau &&
                    bg.ketthuc &&
                    donhang.ngaygiao >= bg.batdau &&
                    donhang.ngaygiao <= bg.ketthuc)
                    ?.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban,
                sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
                slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
                slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
                ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
                ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
                ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
                ghichu: item.ghichu,
            })),
            name: donhang.khachhang.name,
        }));
        return result;
    }
    async searchfield(searchParams) {
        const where = {};
        for (const [key, value] of Object.entries(searchParams)) {
            if (!value)
                continue;
            if (key === 'id') {
                where[key] = value;
            }
            else if (typeof value === 'number' || typeof value === 'boolean') {
                where[key] = value;
            }
            else {
                where[key] = { contains: value, mode: 'insensitive' };
            }
        }
        const donhang = await this.prisma.donhang.findFirst({
            where,
            include: {
                sanpham: {
                    include: {
                        sanpham: true,
                    },
                },
                khachhang: {
                    include: {
                        banggia: {
                            include: { sanpham: true },
                        },
                    },
                },
            },
        });
        if (!donhang)
            throw new common_1.NotFoundException('DonHang not found');
        return {
            ...donhang,
            sanpham: donhang.sanpham.map((item) => ({
                ...item.sanpham,
                idSP: item.idSP,
                giaban: donhang.khachhang.banggia
                    .find((bg) => donhang.ngaygiao &&
                    bg.batdau &&
                    bg.ketthuc &&
                    donhang.ngaygiao >= bg.batdau &&
                    donhang.ngaygiao <= bg.ketthuc)
                    ?.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban,
                sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
                slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
                slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
                ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
                ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
                ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
                ghichu: item.ghichu,
            })),
            khachhang: (({ banggia, ...rest }) => rest)(donhang.khachhang),
        };
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
                khachhang: { include: { banggia: { include: { sanpham: true } } } },
            },
        });
        if (!donhang)
            throw new common_1.NotFoundException('DonHang not found');
        const result = {
            ...donhang,
            sanpham: donhang.sanpham.map((item) => ({
                ...item.sanpham,
                idSP: item.idSP,
                giaban: donhang.khachhang.banggia
                    .find((bg) => donhang.ngaygiao &&
                    bg.batdau &&
                    bg.ketthuc &&
                    donhang.ngaygiao >= bg.batdau &&
                    donhang.ngaygiao <= bg.ketthuc)
                    ?.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban,
                sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
                slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
                slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
                ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
                ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
                ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
                ghichu: item.ghichu,
            })),
        };
        return result;
    }
    async create(dto) {
        const madonhang = await this.generateNextOrderCode();
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
                            sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
                            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                            slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
                            ttdat: parseFloat((sp.ttdat ?? 0).toFixed(2)),
                            ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
                            ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(2)),
                        })),
                    },
                },
                include: {
                    sanpham: true,
                },
            });
            for (const sp of dto.sanpham) {
                const incrementValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
                await prisma.tonKho.upsert({
                    where: { sanphamId: sp.id },
                    update: {
                        slchogiao: { increment: incrementValue },
                    },
                    create: {
                        sanphamId: sp.id,
                        slchogiao: incrementValue,
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
            if (!oldDonhang) {
                throw new common_1.NotFoundException('Đơn hàng không tồn tại');
            }
            if (oldDonhang.status === 'dagiao' && data.status === 'dadat') {
                for (const sp of oldDonhang.sanpham) {
                    const incValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
                    await prisma.tonKho.update({
                        where: { sanphamId: sp.idSP },
                        data: {
                            slchogiao: { increment: incValue },
                            slton: { increment: incValue },
                        },
                    });
                }
                const maphieuOld = `PX-${oldDonhang.madonhang}`;
                const phieuKho = await prisma.phieuKho.findUnique({
                    where: { maphieu: maphieuOld },
                });
                if (!phieuKho) {
                    throw new common_1.NotFoundException('Phiếu kho không tồn tại');
                }
                try {
                    await prisma.phieuKhoSanpham.deleteMany({
                        where: { phieuKhoId: phieuKho.id },
                    });
                    await prisma.phieuKho.delete({
                        where: { maphieu: maphieuOld },
                    });
                }
                catch (error) {
                    throw error;
                }
                return prisma.donhang.update({
                    where: { id },
                    data: { status: 'dadat' },
                });
            }
            if (data.status === 'dagiao') {
                for (const sp of data.sanpham) {
                    const decValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
                    await prisma.tonKho.update({
                        where: { sanphamId: sp.id },
                        data: {
                            slchogiao: { decrement: decValue },
                            slton: { decrement: decValue },
                        },
                    });
                }
                const maphieuNew = `PX-${data.madonhang}`;
                const phieuPayload = {
                    ngay: new Date(data.ngaygiao),
                    type: 'xuat',
                    khoId: DEFAUL_KHO_ID,
                    ghichu: data.ghichu,
                    isActive: data.isActive ?? true,
                    sanpham: {
                        create: data.sanpham.map((sp) => ({
                            sanphamId: sp.id,
                            soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                            ghichu: sp.ghichu,
                        })),
                    },
                };
                await prisma.phieuKho.upsert({
                    where: { maphieu: maphieuNew },
                    create: { maphieu: maphieuNew, ...phieuPayload },
                    update: phieuPayload,
                });
                return prisma.donhang.update({
                    where: { id },
                    data: { status: 'dagiao' },
                });
            }
        });
    }
    async updatePhieugiao(id, data) {
        return this.prisma.$transaction(async (prisma) => {
            const updatedDonhang = await prisma.donhang.update({
                where: { id },
                data: {
                    title: data.title,
                    type: data.type,
                    madonhang: data.madonhang,
                    ngaygiao: new Date(data.ngaygiao),
                    khachhangId: data.khachhangId,
                    isActive: data.isActive,
                    status: data.status,
                    order: data.order,
                    ghichu: data.ghichu,
                    printCount: data.printCount,
                    sanpham: {
                        updateMany: data?.sanpham?.map((sp) => ({
                            where: { idSP: sp.id },
                            data: {
                                ghichu: sp.ghichu,
                                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                                slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
                                ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
                            },
                        })),
                    },
                },
                include: {
                    sanpham: true,
                },
            });
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
//# sourceMappingURL=donhang.service%20copy.js.map