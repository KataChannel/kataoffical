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
        console.log('nextCode', nextCode);
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
                skip: (Number(pageNumber) - 1) * Number(pageSize),
                take: Number(pageSize),
            }),
        ]);
        const result = donhangs.map(({ khachhang, sanpham, ...donhang }) => ({
            ...donhang,
            sanpham: sanpham.map((item) => {
                const matchingBanggia = khachhang.banggia.find((bg) => donhang.ngaygiao &&
                    bg.batdau &&
                    bg.ketthuc &&
                    donhang.ngaygiao >= bg.batdau &&
                    donhang.ngaygiao <= bg.ketthuc);
                const priceFromBanggia = matchingBanggia
                    ? matchingBanggia.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban
                    : undefined;
                return {
                    ...item.sanpham,
                    idSP: item.idSP,
                    giaban: priceFromBanggia !== undefined
                        ? priceFromBanggia
                        : item.sanpham.giaban,
                    sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
                    slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
                    slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
                    ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
                    ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
                    ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
                    ghichu: item.ghichu,
                };
            }),
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
            soluongtt: parseFloat(sanpham.reduce((total, item) => total + Number(item.slgiao || 0), 0).toFixed(2)),
        }));
    }
    async phieugiao(params) {
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
        return {
            ...result,
            sanpham: result.sanpham.map((item) => {
                const matchingBanggia = result.khachhang.banggia.find((bg) => result.ngaygiao &&
                    bg.batdau &&
                    bg.ketthuc &&
                    result.ngaygiao >= bg.batdau &&
                    result.ngaygiao <= bg.ketthuc);
                const priceFromBanggia = matchingBanggia
                    ? matchingBanggia.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban
                    : undefined;
                return {
                    ...item.sanpham,
                    idSP: item.idSP,
                    giaban: priceFromBanggia !== undefined
                        ? priceFromBanggia
                        : item.sanpham.giaban,
                    sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
                    slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
                    slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
                    ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
                    ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
                    ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
                    ghichu: item.ghichu,
                };
            }),
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
            orderBy: { createdAt: 'desc' },
        });
        const result = donhangs.map((donhang) => ({
            ...donhang,
            sanpham: donhang.sanpham.map((item) => {
                const matchingBanggia = donhang.khachhang.banggia.find((bg) => donhang.ngaygiao &&
                    bg.batdau &&
                    bg.ketthuc &&
                    donhang.ngaygiao >= bg.batdau &&
                    donhang.ngaygiao <= bg.ketthuc);
                const priceFromBanggia = matchingBanggia
                    ? matchingBanggia.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban
                    : undefined;
                return {
                    ...item.sanpham,
                    idSP: item.idSP,
                    giaban: priceFromBanggia !== undefined ? priceFromBanggia : item.sanpham.giaban,
                    sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
                    slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
                    slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
                    ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
                    ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
                    ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
                    ghichu: item.ghichu,
                };
            }),
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
            sanpham: donhang.sanpham.map((item) => {
                const matchingBanggia = donhang.khachhang.banggia.find((bg) => donhang.ngaygiao &&
                    bg.batdau &&
                    bg.ketthuc &&
                    donhang.ngaygiao >= bg.batdau &&
                    donhang.ngaygiao <= bg.ketthuc);
                const priceFromBanggia = matchingBanggia
                    ? matchingBanggia.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban
                    : undefined;
                return {
                    ...item.sanpham,
                    idSP: item.idSP,
                    giaban: priceFromBanggia !== undefined
                        ? priceFromBanggia
                        : item.sanpham.giaban,
                    sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
                    slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
                    slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
                    ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
                    ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
                    ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
                    ghichu: item.ghichu,
                };
            }),
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
            sanpham: donhang.sanpham.map((item) => {
                const matchingBanggia = donhang.khachhang.banggia.find((bg) => donhang.ngaygiao &&
                    bg.batdau &&
                    bg.ketthuc &&
                    donhang.ngaygiao >= bg.batdau &&
                    donhang.ngaygiao <= bg.ketthuc);
                const productGiabanFromBanggia = matchingBanggia?.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban;
                return {
                    ...item.sanpham,
                    idSP: item.idSP,
                    giaban: productGiabanFromBanggia !== undefined
                        ? productGiabanFromBanggia
                        : item.sanpham.giaban,
                    sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
                    slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
                    slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
                    slhuy: parseFloat((item.slhuy ?? 0).toFixed(2)),
                    ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
                    ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
                    ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
                    ghichu: item.ghichu,
                };
            }),
        };
        return result;
    }
    async ImportDonhangOld(dulieu) {
        let data = await Promise.all(dulieu.map(async (v) => {
            const ngaygiao = moment().toDate();
            const [khachhangRecord, banggiaRecord, sanphamRecord] = await Promise.all([
                this.prisma.khachhang.findFirst({ where: { id: v.khachhangId } }),
                this.prisma.banggia.findFirst({ where: { mabanggia: v.mabanggia } }),
                this.prisma.sanpham.findFirst({ where: { masp: v.ItemCode } }),
            ]);
            if (!khachhangRecord || !banggiaRecord || !sanphamRecord) {
                return null;
            }
            return {
                ngaygiao,
                makh: khachhangRecord.makh,
                mabanggia: banggiaRecord.mabanggia,
                masp: sanphamRecord.masp,
                sldat: Number(v.Quantity) || 0,
                slgiao: Number(v.Quantity) || 0,
                slnhan: Number(v.Quantity) || 0,
                ghichu: v.ghichu || '',
            };
        }));
        data = (await Promise.all(data.map(async (d) => {
            if (!d)
                return null;
            const exists = await this.prisma.donhang.findFirst({
                where: { ngaygiao: d.ngaygiao, khachhang: { makh: d.makh } },
            });
            if (exists) {
                console.log(`Skipping import for customer ${d.makh} on ${d.ngaygiao}`);
                return null;
            }
            return d;
        }))).filter(Boolean);
        const acc = {};
        for (const curr of data) {
            if (!acc[curr.makh]) {
                const khachhang = await this.prisma.khachhang.findFirst({ where: { makh: curr.makh } });
                acc[curr.makh] = {
                    title: `Import ${moment().format('DD_MM_YYYY')}`,
                    ngaygiao: curr.ngaygiao,
                    makh: curr.makh,
                    khachhangId: khachhang?.id,
                    name: khachhang?.name,
                    mabanggia: curr.mabanggia,
                    sanpham: [],
                    khachhang: {
                        makh: curr.makh,
                    },
                };
            }
            const sanphamRecord = await this.prisma.sanpham.findFirst({ where: { masp: curr.masp } });
            acc[curr.makh].sanpham.push({
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
                success++;
            }
            catch (error) {
                console.error('Error importing order:', error);
                await this.prisma.importHistory.create({
                    data: {
                        codeId: element.madonhang,
                        title: element.title,
                        type: 'donhang',
                        caseDetail: {
                            errorMessage: error.message,
                            errorStack: error.stack,
                            additionalInfo: 'Failed during donhang import process',
                        },
                        order: 1,
                        createdBy: 'system',
                    },
                });
                fail++;
            }
        }
        return { success, fail };
    }
    async ImportDonhang(data) {
        const acc = {};
        for (const curr of data) {
            if (!acc[curr.makh]) {
                const khachhang = await this.prisma.khachhang.findFirst({ where: { makh: curr.makh } });
                acc[curr.makh] = {
                    title: `Import ${moment().format('DD_MM_YYYY')}`,
                    ngaygiao: curr.ngaygiao,
                    makh: curr.makh,
                    khachhangId: khachhang?.id,
                    name: khachhang?.name,
                    mabanggia: curr.mabanggia,
                    sanpham: [],
                    khachhang: {
                        makh: curr.makh,
                    }
                };
            }
            const sanphamRecord = await this.prisma.sanpham.findFirst({ where: { masp: curr.masp } });
            acc[curr.makh].sanpham.push({
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
                console.log('error', error);
                await this.prisma.importHistory.create({
                    data: {
                        codeId: element.madonhang,
                        title: element.title,
                        type: 'donhang',
                        caseDetail: {
                            errorMessage: error.message,
                            errorStack: error.stack,
                            additionalInfo: 'Failed during donhang import process',
                        },
                        order: 1,
                        createdBy: 'system',
                    },
                });
                fail += 1;
            }
        }
        return {
            success,
            fail,
        };
    }
    async create(dto) {
        const madonhang = await this.generateNextOrderCode();
        return this.prisma.$transaction(async (prisma) => {
            const newDonhang = await prisma.donhang.create({
                data: {
                    title: dto.title,
                    type: dto.type || 'donsi',
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
                            slhuy: parseFloat((sp.slhuy ?? 0).toFixed(2)),
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
                const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(2));
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
                const updatedOrder = await prisma.donhang.update({
                    where: { id },
                    data: {
                        title: data.title,
                        type: data.type,
                        ngaygiao: new Date(data.ngaygiao),
                        khachhangId: data.khachhangId,
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
                                            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                                        },
                                    })),
                                },
                            }
                            : {}),
                    },
                });
                for (const sp of data.sanpham) {
                    const newSlgiao = parseFloat((sp.slgiao ?? 0).toFixed(2));
                    const oldItem = oldDonhang.sanpham.find((o) => o.idSP === sp.id);
                    const oldSlgiao = oldItem ? parseFloat((oldItem.slgiao ?? 0).toFixed(2)) : 0;
                    const difference = newSlgiao - oldSlgiao;
                    if (difference !== 0) {
                        await prisma.tonKho.update({
                            where: { sanphamId: sp.id },
                            data: {
                                slchogiao: difference > 0
                                    ? { decrement: difference }
                                    : { increment: -difference },
                                slton: difference > 0
                                    ? { decrement: difference }
                                    : { increment: -difference },
                            },
                        });
                    }
                }
                return updatedOrder;
            }
            if (oldDonhang.status === 'dadat' && data.status === 'dadat') {
                for (const sp of data.sanpham) {
                    const oldItem = oldDonhang.sanpham.find((o) => o.idSP === sp.id);
                    if (oldItem) {
                        const newSldat = parseFloat((sp.sldat ?? 0).toFixed(2));
                        const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(2));
                        const difference = Number(newSldat) - Number(oldSldat);
                        if (difference > 0) {
                            await prisma.tonKho.update({
                                where: { sanphamId: sp.id },
                                data: {
                                    slchogiao: { increment: difference },
                                },
                            });
                        }
                        else if (difference < 0) {
                            await prisma.tonKho.update({
                                where: { sanphamId: sp.id },
                                data: {
                                    slchogiao: { increment: difference },
                                },
                            });
                        }
                    }
                }
                return prisma.donhang.update({
                    where: { id },
                    data: {
                        title: data.title,
                        type: data.type,
                        ngaygiao: new Date(data.ngaygiao),
                        khachhangId: data.khachhangId,
                        isActive: data.isActive,
                        order: data.order,
                        ghichu: data.ghichu,
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
                    data: {
                        status: 'dagiao',
                        sanpham: {
                            updateMany: data.sanpham.map((sp) => ({
                                where: { idSP: sp.id },
                                data: {
                                    ghichu: sp.ghichu,
                                    slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                                },
                            })),
                        },
                    },
                });
            }
            if (data.status === 'danhan') {
                const shortageItems = [];
                for (const item of data.sanpham) {
                    const receivedQty = parseFloat((item.slnhan ?? 0).toFixed(2));
                    const shippedQty = parseFloat((item.slgiao ?? 0).toFixed(2));
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
                            data: { slton: { decrement: receivedQty } },
                        });
                    }
                }
                if (shortageItems.length > 0) {
                    const maphieuNhap = `PN-${data.madonhang}-RET`;
                    const phieuKhoData = {
                        maphieu: maphieuNhap,
                        ngay: new Date(data.ngaygiao),
                        type: 'nhap',
                        khoId: DEFAUL_KHO_ID,
                        ghichu: 'Phiếu nhập hàng trả về do thiếu hàng khi nhận',
                        isActive: data.isActive ?? true,
                        sanpham: {
                            create: shortageItems.map(item => ({
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
                return prisma.donhang.update({
                    where: { id },
                    data: {
                        status: 'danhan',
                        sanpham: {
                            updateMany: data.sanpham.map((item) => {
                                const delivered = parseFloat((item.slgiao ?? 0).toFixed(2));
                                const received = parseFloat((item.slnhan ?? 0).toFixed(2));
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
            if (data.status === 'hoanthanh') {
                return prisma.donhang.update({
                    where: { id },
                    data: {
                        status: 'hoanthanh',
                    },
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
        return this.prisma.$transaction(async (prisma) => {
            const donhang = await prisma.donhang.findUnique({
                where: { id },
                include: { sanpham: true },
            });
            if (!donhang) {
                throw new common_1.NotFoundException('Đơn hàng không tồn tại');
            }
            for (const sp of donhang.sanpham) {
                const sldat = parseFloat((sp.sldat ?? 0).toFixed(2));
                if (donhang.status === 'dagiao') {
                    const slgiao = parseFloat((sp.slgiao ?? 0).toFixed(2));
                    await prisma.tonKho.update({
                        where: { sanphamId: sp.idSP },
                        data: {
                            slchogiao: { decrement: sldat },
                            slton: { increment: slgiao },
                        },
                    });
                }
                else {
                    await prisma.tonKho.update({
                        where: { sanphamId: sp.idSP },
                        data: {
                            slchogiao: { decrement: sldat },
                        },
                    });
                }
            }
            return prisma.donhang.delete({ where: { id } });
        });
    }
};
exports.DonhangService = DonhangService;
exports.DonhangService = DonhangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DonhangService);
//# sourceMappingURL=donhang.service.js.map