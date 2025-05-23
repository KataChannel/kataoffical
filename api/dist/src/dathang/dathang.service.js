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
const moment = require("moment-timezone");
const prisma_service_1 = require("../../prisma/prisma.service");
const DEFAUL_KHO_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
let DathangService = class DathangService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateNextOrderCode() {
        const lastOrder = await this.prisma.dathang.findFirst({
            orderBy: { createdAt: 'desc' },
        });
        let nextCode = 'TGNCC-AA00001';
        if (lastOrder && lastOrder.madncc) {
            nextCode = this.incrementOrderCode(lastOrder.madncc);
        }
        return nextCode;
    }
    incrementOrderCode(orderCode) {
        const prefix = 'TGNCC-';
        const letters = orderCode.slice(6, 8);
        const numbers = parseInt(orderCode.slice(8), 13);
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
    async reorderDathangs(dathangIds) {
        for (let i = 0; i < dathangIds.length; i++) {
            await this.prisma.dathang.update({
                where: { id: dathangIds[i] },
                data: { order: i + 1 },
            });
        }
    }
    async findAll() {
        const dathangs = await this.prisma.dathang.findMany({
            include: {
                sanpham: {
                    include: {
                        sanpham: true,
                    },
                },
                nhacungcap: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return dathangs.map((dathang) => ({
            ...dathang,
            sanpham: dathang.sanpham.map((item) => ({
                ...item.sanpham,
                idSP: item.idSP,
                sldat: item.sldat || 0,
                slgiao: item.slgiao || 0,
                slnhan: item.slnhan || 0,
                ttdat: item.ttdat || 0,
                ttgiao: item.ttgiao || 0,
                ttnhan: item.ttnhan || 0,
                ghichu: item.ghichu,
            })),
        }));
    }
    async findOne(id) {
        const dathang = await this.prisma.dathang.findUnique({
            where: { id },
            include: {
                sanpham: {
                    include: {
                        sanpham: {
                            include: {
                                TonKho: true,
                            },
                        },
                    },
                },
                nhacungcap: true,
            },
        });
        if (!dathang)
            throw new common_1.NotFoundException('Dathang not found');
        return {
            ...dathang,
            sanpham: dathang.sanpham.map((item) => {
                let computedGoiy = 0;
                if (item.sanpham.TonKho && item.sanpham.TonKho[0]) {
                    const tonkho = item.sanpham.TonKho[0];
                    computedGoiy = (Number(tonkho.slton) - Number(tonkho.slchogiao) + Number(tonkho.slchonhap))
                        * (1 + Number(item.sanpham.haohut) / 100);
                }
                return {
                    ...item.sanpham,
                    idSP: item.idSP,
                    goiy: Math.abs(computedGoiy),
                    sldat: Number(item.sldat),
                    slgiao: Number(item.slgiao),
                    slnhan: Number(item.slnhan),
                    slhuy: Number(item.slhuy),
                    ttdat: Number(item.ttdat),
                    ttgiao: Number(item.ttgiao),
                    ttnhan: Number(item.ttnhan),
                    ghichu: item.ghichu,
                };
            }),
        };
    }
    async import(data) {
        const acc = {};
        for (const curr of data) {
            if (!acc[curr.mancc]) {
                const nhacungcap = await this.prisma.nhacungcap.findFirst({ where: { mancc: curr.mancc } });
                acc[curr.mancc] = {
                    title: `Import ${moment().format('DD_MM_YYYY')}`,
                    ngaynhan: curr.ngaynhan,
                    mancc: curr.mancc,
                    name: nhacungcap?.name,
                    mabanggia: curr.mabanggia,
                    sanpham: [],
                    nhacungcap: {
                        mancc: curr.mancc,
                    }
                };
            }
            const sanphamRecord = await this.prisma.sanpham.findFirst({ where: { masp: curr.masp } });
            acc[curr.mancc].sanpham.push({
                masp: curr.masp,
                id: sanphamRecord?.id,
                sldat: Number(curr.sldat),
                slgiao: Number(curr.slgiao),
                slnhan: Number(curr.slnhan),
                ghichu: curr.ghichu,
            });
        }
        const convertData = Object.values(acc);
        let success = 0;
        let fail = 0;
        for (const element of convertData) {
            try {
                await this.create(element);
                success += 1;
            }
            catch (error) {
                fail += 1;
            }
        }
        return {
            success,
            fail,
        };
    }
    async search(params) {
        const { Batdau, Ketthuc, Type, pageSize = 10, pageNumber = 1 } = params;
        const where = {
            ngaynhan: {
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
        const [total, dathangs] = await Promise.all([
            this.prisma.dathang.count({ where }),
            this.prisma.dathang.findMany({
                where,
                include: {
                    sanpham: {
                        include: {
                            sanpham: true,
                        },
                    },
                    nhacungcap: true,
                },
                orderBy: { createdAt: 'desc' },
                skip: (Number(pageNumber) - 1) * Number(pageSize),
                take: Number(pageSize),
            }),
        ]);
        return {
            data: dathangs,
            total,
            pageNumber,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        };
    }
    async create(dto) {
        const madathang = await this.generateNextOrderCode();
        return this.prisma.$transaction(async (prisma) => {
            const nhacungcap = await prisma.nhacungcap.findFirst({
                where: {
                    mancc: dto.nhacungcap.mancc,
                },
            });
            if (!nhacungcap)
                throw new common_1.NotFoundException('Nhà cung cấp không tồn tại');
            const newDathang = await prisma.dathang.create({
                data: {
                    title: dto.title,
                    type: dto.type,
                    madncc: madathang,
                    ngaynhan: dto.ngaynhan ? new Date(dto.ngaynhan) : new Date(),
                    nhacungcapId: nhacungcap.id,
                    isActive: dto.isActive !== undefined ? dto.isActive : true,
                    order: dto.order,
                    ghichu: dto.ghichu,
                    sanpham: {
                        create: dto?.sanpham?.map((sp) => ({
                            idSP: sp.id,
                            ghichu: sp.ghichu,
                            sldat: sp.sldat || 0,
                            slgiao: sp.slgiao || 0,
                            slnhan: sp.slnhan || 0,
                            slhuy: sp.slhuy || 0,
                            ttdat: sp.ttdat || 0,
                            ttgiao: sp.ttgiao || 0,
                            ttnhan: sp.ttnhan || 0,
                        })),
                    },
                },
                include: { sanpham: true },
            });
            for (const sp of dto.sanpham) {
                const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(2));
                await prisma.tonKho.upsert({
                    where: { sanphamId: sp.id },
                    update: {
                        slchonhap: { increment: incrementValue },
                    },
                    create: {
                        sanphamId: sp.id,
                        slchonhap: incrementValue,
                    },
                });
            }
            return newDathang;
        });
    }
    async createbynhucau(dto) {
        const madathang = await this.generateNextOrderCode();
        return this.prisma.$transaction(async (prisma) => {
            const nhacungcap = await prisma.nhacungcap.findUnique({
                where: { id: dto.id },
            });
            if (!nhacungcap)
                throw new common_1.NotFoundException('Nhà cung cấp không tồn tại');
            const newDathang = await prisma.dathang.create({
                data: {
                    title: dto.title,
                    type: dto.type,
                    madncc: madathang,
                    ngaynhan: dto.ngaynhan ? new Date(dto.ngaynhan) : new Date(),
                    nhacungcapId: nhacungcap.id,
                    isActive: dto.isActive !== undefined ? dto.isActive : true,
                    order: dto.order,
                    ghichu: dto.ghichu,
                    sanpham: {
                        create: dto?.sanpham?.map((sp) => ({
                            idSP: sp.id,
                            ghichu: sp.ghichu,
                            sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
                            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                            slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
                            slhuy: parseFloat((sp.slhuy ?? 0).toFixed(2)),
                            ttdat: parseFloat((sp.ttdat ?? 0).toFixed(2)),
                            ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
                            ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(2)),
                        })),
                    },
                },
                include: { sanpham: true },
            });
            for (const sp of dto.sanpham) {
                const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(2));
                await prisma.tonKho.upsert({
                    where: { sanphamId: sp.id },
                    update: {
                        slchonhap: { increment: incrementValue },
                    },
                    create: {
                        sanphamId: sp.id,
                        slchonhap: incrementValue,
                    },
                });
            }
            return newDathang;
        });
    }
    async update(id, data) {
        return this.prisma.$transaction(async (prisma) => {
            const oldDathang = await prisma.dathang.findUnique({
                where: { id },
                include: { sanpham: true },
            });
            if (!oldDathang) {
                throw new common_1.NotFoundException('Đơn đặt hàng không tồn tại');
            }
            if (oldDathang.status === 'dagiao' && data.status === 'dadat') {
                for (const sp of oldDathang.sanpham) {
                    const incValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
                    await prisma.tonKho.update({
                        where: { sanphamId: sp.idSP },
                        data: {
                            slchonhap: { increment: incValue },
                        },
                    });
                }
                const maphieuOld = `PX-${oldDathang.madncc}`;
                const phieuKho = await prisma.phieuKho.findUnique({
                    where: { maphieu: maphieuOld },
                });
                if (phieuKho) {
                    await prisma.phieuKhoSanpham.deleteMany({
                        where: { phieuKhoId: phieuKho.id },
                    });
                    await prisma.phieuKho.delete({
                        where: { maphieu: maphieuOld },
                    });
                }
                const updatedDathang = await prisma.dathang.update({
                    where: { id },
                    data: {
                        title: data.title,
                        type: data.type,
                        ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
                        nhacungcapId: data.nhacungcapId,
                        isActive: data.isActive,
                        order: data.order,
                        ghichu: data.ghichu,
                        status: 'dadat',
                        ...(data.sanpham && data.sanpham.length
                            ? {
                                sanpham: {
                                    updateMany: data.sanpham.map((sp) => ({
                                        where: { idSP: sp.id },
                                        data: {
                                            ghichu: sp.ghichu,
                                            sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
                                            slgiao: 0,
                                            slnhan: 0,
                                            slhuy: 0,
                                        },
                                    })),
                                },
                            }
                            : {}),
                    },
                });
                for (const sp of data.sanpham) {
                    const newSldat = parseFloat((sp.sldat ?? 0).toFixed(2));
                    const oldItem = oldDathang.sanpham.find((o) => o.idSP === sp.id);
                    const oldSlgiao = oldItem
                        ? parseFloat((oldItem.slgiao ?? 0).toFixed(2))
                        : 0;
                    const difference = newSldat - oldSlgiao;
                    if (difference !== 0) {
                        await prisma.tonKho.update({
                            where: { sanphamId: sp.id },
                            data: {
                                slchonhap: difference > 0
                                    ? { increment: difference }
                                    : { decrement: -difference },
                            },
                        });
                    }
                }
                return updatedDathang;
            }
            if (oldDathang.status === 'dadat' && data.status === 'dadat') {
                for (const sp of data.sanpham) {
                    const oldItem = oldDathang.sanpham.find((o) => o.idSP === sp.id);
                    if (oldItem) {
                        const newSldat = parseFloat((sp.sldat ?? 0).toFixed(2));
                        const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(2));
                        const difference = newSldat - oldSldat;
                        if (difference !== 0) {
                            await prisma.tonKho.update({
                                where: { sanphamId: sp.id },
                                data: {
                                    slchonhap: { increment: difference },
                                },
                            });
                        }
                    }
                }
                return prisma.dathang.update({
                    where: { id },
                    data: {
                        title: data.title,
                        type: data.type,
                        ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
                        nhacungcapId: data.nhacungcapId,
                        isActive: data.isActive,
                        order: data.order,
                        ghichu: data.ghichu,
                        status: 'dadat',
                        ...(data.sanpham && data.sanpham.length
                            ? {
                                sanpham: {
                                    updateMany: data.sanpham.map((sp) => ({
                                        where: { idSP: sp.id },
                                        data: {
                                            ghichu: sp.ghichu,
                                            sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
                                            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                                            slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
                                            slhuy: parseFloat((sp.slhuy ?? 0).toFixed(2)),
                                        },
                                    })),
                                },
                            }
                            : {}),
                    },
                });
            }
            if (data.status === 'dagiao') {
                for (const sp of data.sanpham) {
                    const decValue = parseFloat((Number(sp.slgiao) ?? 0).toFixed(2));
                    await prisma.tonKho.update({
                        where: { sanphamId: sp.id },
                        data: {
                            slchonhap: { decrement: decValue },
                        },
                    });
                }
                const maphieuNew = `PX-${data.madncc}`;
                const phieuPayload = {
                    ngay: data.ngaynhan ? new Date(data.ngaynhan) : new Date(),
                    type: 'xuat',
                    khoId: DEFAUL_KHO_ID,
                    madncc: data.madncc,
                    ghichu: data.ghichu,
                    isActive: data.isActive ?? true,
                    sanpham: {
                        create: data.sanpham.map((sp) => ({
                            sanphamId: sp.id,
                            soluong: parseFloat((Number(sp.slgiao) ?? 0).toFixed(2)),
                            ghichu: sp.ghichu,
                        })),
                    },
                };
                await prisma.phieuKho.upsert({
                    where: { maphieu: maphieuNew },
                    create: { maphieu: maphieuNew, ...phieuPayload },
                    update: phieuPayload,
                });
                return prisma.dathang.update({
                    where: { id },
                    data: {
                        status: 'dagiao',
                        sanpham: {
                            updateMany: data.sanpham.map((sp) => ({
                                where: { idSP: sp.id },
                                data: {
                                    ghichu: sp.ghichu,
                                    slgiao: parseFloat((Number(sp.slgiao) ?? 0).toFixed(2)),
                                },
                            })),
                        },
                    },
                });
            }
            if (data.status === 'danhan') {
                const shortageItems = [];
                for (const item of data.sanpham) {
                    const receivedQty = parseFloat((Number(item.slnhan) ?? 0).toFixed(2));
                    const shippedQty = parseFloat((Number(item.slgiao) ?? 0).toFixed(2));
                    if (receivedQty < shippedQty) {
                        const shortage = shippedQty - receivedQty;
                        await prisma.tonKho.update({
                            where: { sanphamId: item.idSP },
                            data: { slton: { increment: shortage } },
                        });
                        shortageItems.push({
                            sanphamId: item.id,
                            soluong: shortage,
                            ghichu: item.ghichu
                                ? `${item.ghichu}; thiếu ${shortage.toFixed(2)}`
                                : `Thiếu ${shortage.toFixed(2)}`,
                        });
                    }
                    else if (receivedQty === shippedQty) {
                        await prisma.tonKho.update({
                            where: { sanphamId: item.idSP },
                            data: { slton: { increment: receivedQty } },
                        });
                    }
                }
                if (shortageItems.length > 0) {
                    const maphieuNhap = `PX-${oldDathang.madncc}-RET`;
                    const phieuKhoData = {
                        maphieu: maphieuNhap,
                        ngay: new Date(data.ngaynhan),
                        type: 'xuat',
                        khoId: DEFAUL_KHO_ID,
                        ghichu: 'Phiếu xuất hàng trả về do thiếu hàng khi nhận',
                        isActive: data.isActive ?? true,
                        sanpham: {
                            create: shortageItems.map((item) => ({
                                sanphamId: item.sanphamId,
                                soluong: item.soluong,
                                ghichu: item.ghichu,
                            })),
                        },
                    };
                    await prisma.phieuKho.create({
                        data: phieuKhoData,
                    });
                }
                return prisma.dathang.update({
                    where: { id },
                    data: {
                        status: 'danhan',
                        sanpham: {
                            updateMany: data.sanpham.map((item) => {
                                const delivered = parseFloat((Number(item.slgiao) ?? 0).toFixed(2));
                                const received = parseFloat((Number(item.slnhan) ?? 0).toFixed(2));
                                const shortageNote = received < delivered
                                    ? item.ghichu
                                        ? `${item.ghichu}; thiếu ${(delivered - received).toFixed(2)}`
                                        : `Thiếu ${(delivered - received).toFixed(2)}`
                                    : item.ghichu || '';
                                return {
                                    where: { idSP: item.id },
                                    data: {
                                        ghichu: shortageNote,
                                        slnhan: received,
                                    },
                                };
                            }),
                        },
                    },
                });
            }
            if (data.status === 'huy') {
                for (const sp of oldDathang.sanpham) {
                    const incValue = parseFloat((sp.sldat ?? 0).toFixed(2));
                    if (incValue > 0) {
                        await prisma.tonKho.update({
                            where: { sanphamId: sp.idSP },
                            data: {
                                slchonhap: { decrement: incValue },
                            },
                        });
                    }
                }
                const maphieuOld = `PX-${oldDathang.madncc}`;
                const phieuKho = await prisma.phieuKho.findUnique({
                    where: { maphieu: maphieuOld },
                });
                if (phieuKho) {
                    await prisma.phieuKhoSanpham.deleteMany({
                        where: { phieuKhoId: phieuKho.id },
                    });
                    await prisma.phieuKho.delete({
                        where: { maphieu: maphieuOld },
                    });
                }
                return prisma.dathang.update({
                    where: { id },
                    data: {
                        status: 'huy',
                        ghichu: data.ghichu || 'Đơn đặt hàng đã hủy',
                        sanpham: {
                            updateMany: oldDathang.sanpham.map((sp) => ({
                                where: { idSP: sp.idSP },
                                data: {
                                    slgiao: 0,
                                    slnhan: 0,
                                    slhuy: parseFloat((sp.sldat ?? 0).toFixed(2)),
                                    ghichu: sp.ghichu || 'Hủy đơn đặt hàng',
                                },
                            })),
                        },
                    },
                });
            }
            throw new Error('Trạng thái không hợp lệ');
        });
    }
    async remove(id) {
        return this.prisma.dathang.delete({ where: { id } });
    }
};
exports.DathangService = DathangService;
exports.DathangService = DathangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DathangService);
//# sourceMappingURL=dathang.service.js.map