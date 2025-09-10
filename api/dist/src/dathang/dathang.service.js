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
const importdata_service_1 = require("../importdata/importdata.service");
const status_machine_service_1 = require("../common/status-machine.service");
const tonkho_manager_service_1 = require("../common/tonkho-manager.service");
let DathangService = class DathangService {
    constructor(prisma, _ImportdataService, statusMachine, tonkhoManager) {
        this.prisma = prisma;
        this._ImportdataService = _ImportdataService;
        this.statusMachine = statusMachine;
        this.tonkhoManager = tonkhoManager;
    }
    formatDateForFilename() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `${year}${month}${day}_${hours}${minutes}${seconds}`;
    }
    convertDateFilters(filters) {
        const result = {};
        if (filters.fromDate) {
            result.fromDate = new Date(filters.fromDate);
        }
        if (filters.toDate) {
            result.toDate = new Date(filters.toDate);
        }
        return result;
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
                kho: true,
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
                kho: true,
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
                    gianhap: Number(item.gianhap),
                    ghichu: item.ghichu,
                };
            }),
        };
    }
    async import(data) {
        const convertData = await this.convertDathangImportToTransfer(data);
        let success = 0;
        let fail = 0;
        for (const element of convertData) {
            try {
                await this.create(element);
                success += 1;
            }
            catch (error) {
                fail += 1;
                await this._ImportdataService.create({
                    caseDetail: {
                        errorMessage: error.message,
                        errorStack: error.stack,
                        additionalInfo: 'Error during import process',
                    },
                    order: 1,
                    createdBy: 'system',
                    title: `Import Đặt hàng ${new Date().toLocaleString('vi-VN')}`,
                    type: 'dathang',
                });
            }
        }
        return {
            success,
            fail,
        };
    }
    async importcu(data) {
        return {};
    }
    async convertDathangImportToTransfer(dathangimport) {
        const dathangimporttranfer = [];
        for (const importItem of dathangimport) {
            try {
                const nhacungcap = await this.prisma.nhacungcap.findFirst({
                    where: { mancc: importItem.mancc }
                });
                if (!nhacungcap) {
                    console.warn(`Không tìm thấy nhà cung cấp với mã: ${importItem.mancc}`);
                    continue;
                }
                let kho = null;
                if (importItem.makho) {
                    kho = await this.prisma.kho.findFirst({
                        where: {
                            OR: [
                                { makho: importItem.makho },
                                { name: { contains: importItem.makho, mode: 'insensitive' } }
                            ]
                        }
                    });
                }
                if (!kho) {
                    kho = await this.prisma.kho.findFirst({
                        where: { isActive: true },
                        orderBy: { createdAt: 'asc' }
                    });
                }
                const sanphamList = [];
                for (const sp of importItem.sanpham) {
                    const sanpham = await this.prisma.sanpham.findFirst({
                        where: { masp: sp.masp }
                    });
                    if (!sanpham) {
                        console.warn(`Không tìm thấy sản phẩm với mã: ${sp.masp}`);
                        continue;
                    }
                    sanphamList.push({
                        id: sanpham.id,
                        masp: sanpham.masp,
                        slnhan: Number(sp.slnhan) || 0,
                        slgiao: Number(sp.slgiao) || 0,
                        sldat: Number(sp.sldat) || 0,
                    });
                }
                const transferItem = {
                    title: `Import ${this.formatDateForFilename()}`,
                    type: "dathang",
                    ngaynhan: importItem.ngaynhan ? new Date(importItem.ngaynhan).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                    nhacungcapId: nhacungcap.id,
                    nhacungcap: {
                        name: nhacungcap.name,
                        mancc: nhacungcap.mancc,
                        diachi: nhacungcap.diachi,
                        sdt: nhacungcap.sdt,
                        ghichu: nhacungcap.ghichu
                    },
                    khoId: kho?.id || null,
                    kho: kho ? {
                        name: kho.name,
                        diachi: kho.diachi || "",
                        sdt: kho.sdt || "",
                        ghichu: kho.ghichu || ""
                    } : null,
                    sanpham: sanphamList,
                    status: importItem.status || "dadat",
                    ghichu: importItem.ghichu || ""
                };
                dathangimporttranfer.push(transferItem);
            }
            catch (error) {
                console.error(`Lỗi khi convert item với mancc ${importItem.mancc}:`, error);
            }
        }
        return dathangimporttranfer;
    }
    async search(params) {
        const { Batdau, Ketthuc, Type, pageSize = 10, pageNumber = 1, khoId } = params;
        const where = {};
        if (Batdau || Ketthuc) {
            where.ngaynhan = {
                ...(Batdau && { gte: new Date(Batdau) }),
                ...(Ketthuc && { lte: new Date(Ketthuc) })
            };
        }
        if (khoId) {
            where.khoId = khoId;
        }
        if (params.Status) {
            where.status = Array.isArray(params.Status)
                ? { in: params.Status }
                : params.Status;
        }
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
                    kho: true,
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
    async getchonhap(params) {
        const { Batdau, Ketthuc, Type, khoId } = params;
        const where = {};
        if (Batdau || Ketthuc) {
            where.ngaynhan = {
                ...(Batdau && { gte: new Date(Batdau) }),
                ...(Ketthuc && { lte: new Date(Ketthuc) })
            };
        }
        if (khoId) {
            where.khoId = khoId;
        }
        const dathangs = await this.prisma.dathang.findMany({
            where,
            include: {
                sanpham: {
                    include: { sanpham: true },
                },
                kho: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        const productMap = new Map();
        for (const dh of dathangs) {
            for (const sp of dh.sanpham) {
                if (!sp?.sanpham)
                    continue;
                const key = sp.idSP;
                if (productMap.has(key)) {
                    productMap.get(key).sldat += Number(sp.sldat) || 0;
                }
                else {
                    productMap.set(key, {
                        title: sp.sanpham.title,
                        masp: sp.sanpham.masp,
                        sldat: Number(sp.sldat) || 0,
                    });
                }
            }
        }
        return Array.from(productMap, ([idSP, value]) => ({
            idSP,
            title: value.title,
            masp: value.masp,
            slchonhaptt: parseFloat(value.sldat.toFixed(3)),
        }));
    }
    async findby(param) {
        console.log('findby', param);
        const { page = 1, pageSize = 50, isOne, khoId, ...where } = param;
        const whereClause = {};
        if (where.subtitle) {
            whereClause.OR = [];
            if (where.subtitle) {
                whereClause.OR.push({ subtitle: { contains: where.subtitle, mode: 'insensitive' } });
                whereClause.OR.push({ madncc: { contains: where.subtitle, mode: 'insensitive' } });
                whereClause.OR.push({ title: { contains: where.subtitle, mode: 'insensitive' } });
                whereClause.OR.push({
                    nhacungcap: { name: { contains: where.subtitle, mode: 'insensitive' } }
                });
                whereClause.OR.push({
                    nhacungcap: { sdt: { contains: where.subtitle, mode: 'insensitive' } }
                });
            }
        }
        if (where.Batdau || where.Ketthuc) {
            whereClause.ngaynhan = {
                ...(where.Batdau && { gte: new Date(where.Batdau) }),
                ...(where.Ketthuc && { lte: new Date(where.Ketthuc) })
            };
            console.log('dateRange', whereClause.ngaynhan);
        }
        if (khoId) {
            whereClause.khoId = khoId;
        }
        if (isOne) {
            const oneResult = await this.prisma.dathang.findFirst({
                where: whereClause,
                include: {
                    sanpham: {
                        include: { sanpham: true },
                    },
                    nhacungcap: true,
                    kho: true,
                },
                orderBy: { createdAt: 'desc' },
            });
            return oneResult;
        }
        const skip = (page - 1) * pageSize;
        const [dathangs, total] = await Promise.all([
            this.prisma.dathang.findMany({
                where: whereClause,
                include: {
                    sanpham: {
                        include: { sanpham: true },
                    },
                    nhacungcap: true,
                    kho: true,
                },
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.dathang.count({ where: whereClause }),
        ]);
        return {
            data: dathangs,
            page,
            pageSize,
            total,
            pageCount: Math.ceil(total / pageSize),
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
            if (dto.khoId) {
                const kho = await prisma.kho.findFirst({
                    where: { id: dto.khoId },
                });
                if (!kho) {
                    throw new common_1.NotFoundException('Kho không tồn tại');
                }
            }
            const newDathang = await prisma.dathang.create({
                data: {
                    title: dto.title,
                    type: dto.type,
                    madncc: madathang,
                    ngaynhan: dto.ngaynhan ? new Date(dto.ngaynhan) : new Date(),
                    nhacungcapId: nhacungcap.id,
                    khoId: dto.khoId,
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
                            ttnhan: Number(sp.slnhan * sp.gianhap) || 0,
                        })),
                    },
                },
                include: { sanpham: true },
            });
            for (const sp of dto.sanpham) {
                const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(3));
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
            if (dto.khoId) {
                const kho = await prisma.kho.findUnique({
                    where: { id: dto.khoId },
                });
                if (!kho) {
                    throw new common_1.NotFoundException('Kho không tồn tại');
                }
            }
            const newDathang = await prisma.dathang.create({
                data: {
                    title: dto.title,
                    type: dto.type,
                    madncc: madathang,
                    ngaynhan: dto.ngaynhan ? new Date(dto.ngaynhan) : new Date(),
                    nhacungcapId: nhacungcap.id,
                    khoId: dto.khoId,
                    isActive: dto.isActive !== undefined ? dto.isActive : true,
                    order: dto.order,
                    ghichu: dto.ghichu,
                    sanpham: {
                        create: dto?.sanpham?.map((sp) => ({
                            idSP: sp.id,
                            ghichu: sp.ghichu,
                            sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                            slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                            slhuy: parseFloat((sp.slhuy ?? 0).toFixed(3)),
                            ttdat: parseFloat((sp.ttdat ?? 0).toFixed(3)),
                            ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
                            ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(3)),
                        })),
                    },
                },
                include: { sanpham: true },
            });
            for (const sp of dto.sanpham) {
                const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(3));
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
                include: { sanpham: true, kho: true },
            });
            if (!oldDathang) {
                throw new common_1.NotFoundException('Đơn đặt hàng không tồn tại');
            }
            if (data.status && data.status !== oldDathang.status) {
                const transition = this.statusMachine.validateTransition(oldDathang.status, data.status, 'dathang');
                if (!transition.isValid) {
                    throw new Error(`Invalid status transition: ${transition.reason}`);
                }
            }
            if (data.khoId && data.khoId !== oldDathang.khoId) {
                const kho = await prisma.kho.findUnique({
                    where: { id: data.khoId },
                });
                if (!kho) {
                    throw new common_1.NotFoundException('Kho không tồn tại');
                }
            }
            const khoId = data.khoId || oldDathang.khoId;
            if (oldDathang.status === 'dagiao' && data.status === 'dadat') {
                for (const sp of oldDathang.sanpham) {
                    const incValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
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
                        khoId: khoId,
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
                                            sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                                            slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                                            slhuy: parseFloat((sp.slhuy ?? 0).toFixed(3)),
                                            gianhap: parseFloat((sp.gianhap ?? 0).toFixed(3)) || 0,
                                            ttnhan: Number((sp.slnhan ?? 0) * (sp.gianhap ?? 0)) || 0,
                                        },
                                    })),
                                },
                            }
                            : {}),
                    },
                });
                for (const sp of data.sanpham) {
                    const newSldat = parseFloat((sp.sldat ?? 0).toFixed(3));
                    const oldItem = oldDathang.sanpham.find((o) => o.idSP === (sp.idSP ?? sp.id));
                    const oldSlgiao = oldItem
                        ? parseFloat((oldItem.slgiao ?? 0).toFixed(3))
                        : 0;
                    const difference = newSldat - oldSlgiao;
                    if (difference !== 0) {
                        await prisma.tonKho.update({
                            where: { sanphamId: sp.idSP ?? sp.id },
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
                    const oldItem = oldDathang.sanpham.find((o) => o.idSP === (sp.idSP ?? sp.id));
                    if (oldItem) {
                        const newSldat = parseFloat((sp.sldat ?? 0).toFixed(3));
                        const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(3));
                        const difference = newSldat - oldSldat;
                        if (difference !== 0) {
                            await prisma.tonKho.update({
                                where: { sanphamId: sp.idSP ?? sp.id },
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
                        khoId: khoId,
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
                                            sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                                            slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                                            slhuy: parseFloat((sp.slhuy ?? 0).toFixed(3)),
                                            gianhap: parseFloat((sp.gianhap ?? 0).toFixed(3)) || 0,
                                            ttnhan: Number((sp.slnhan ?? 0) * (sp.gianhap ?? 0)) || 0,
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
                    const decValue = parseFloat((Number(sp.slgiao) ?? 0).toFixed(3));
                    await prisma.tonKho.update({
                        where: { sanphamId: sp.idSP },
                        data: {
                            slchonhap: { decrement: decValue },
                        },
                    });
                }
                const maphieuNew = `PX-${data.madncc}-${this.formatDateForFilename()}`;
                const phieuPayload = {
                    ngay: data.ngaynhan ? new Date(data.ngaynhan) : new Date(),
                    type: 'xuat',
                    khoId: khoId,
                    madncc: data.madncc,
                    ghichu: data.ghichu,
                    isActive: data.isActive ?? true,
                    sanpham: {
                        create: data.sanpham.map((sp) => ({
                            sanphamId: sp.idSP,
                            soluong: parseFloat((Number(sp.slgiao) ?? 0).toFixed(3)),
                            ghichu: sp.ghichu,
                        })),
                    },
                };
                try {
                    const { sanpham, ...phieuPayloadWithoutSanpham } = phieuPayload;
                    await prisma.phieuKho.upsert({
                        where: { maphieu: maphieuNew },
                        create: { maphieu: maphieuNew, ...phieuPayload },
                        update: { ...phieuPayloadWithoutSanpham },
                    });
                }
                catch (error) {
                    console.error('Error upserting phieuKho:', error);
                    throw error;
                }
                return prisma.dathang.update({
                    where: { id },
                    data: {
                        status: 'dagiao',
                        khoId: khoId,
                        sanpham: {
                            updateMany: data.sanpham.map((sp) => ({
                                where: { idSP: sp.idSP },
                                data: {
                                    ghichu: sp.ghichu,
                                    slgiao: parseFloat((Number(sp.slgiao) ?? 0).toFixed(3)),
                                    slnhan: parseFloat((Number(sp.slnhan) ?? 0).toFixed(3)),
                                    ttdat: parseFloat((Number(sp.ttdat) ?? 0).toFixed(3)),
                                    ttgiao: parseFloat((Number(sp.ttgiao) ?? 0).toFixed(3)),
                                    ttnhan: Number((sp.slnhan ?? 0) * (sp.gianhap ?? 0)) || 0,
                                    gianhap: parseFloat((Number(sp.gianhap) ?? 0).toFixed(3)),
                                },
                            })),
                        },
                    },
                });
            }
            if (data.status === 'danhan' && oldDathang.status === 'dagiao') {
                const shortageItems = [];
                for (const item of data.sanpham) {
                    const receivedQty = parseFloat((Number(item.slnhan) ?? 0).toFixed(3));
                    const shippedQty = parseFloat((Number(item.slgiao) ?? 0).toFixed(3));
                    await prisma.tonKho.update({
                        where: { sanphamId: item.idSP },
                        data: { slton: { increment: receivedQty } },
                    });
                    if (receivedQty < shippedQty) {
                        const shortage = shippedQty - receivedQty;
                        shortageItems.push({
                            sanphamId: item.idSP,
                            soluong: shortage,
                            ghichu: item.ghichu
                                ? `${item.ghichu}; thiếu ${shortage.toFixed(3)}`
                                : `Thiếu ${shortage.toFixed(3)}`,
                        });
                    }
                }
                if (shortageItems.length > 0) {
                    const maphieuNhap = `PX-${oldDathang.madncc}-RET-${this.formatDateForFilename()}`;
                    const phieuKhoData = {
                        maphieu: maphieuNhap,
                        ngay: new Date(data.ngaynhan),
                        type: 'xuat',
                        khoId: khoId,
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
                        khoId: khoId,
                        sanpham: {
                            updateMany: data.sanpham.map((item) => {
                                const delivered = parseFloat((Number(item.slgiao) ?? 0).toFixed(3));
                                const received = parseFloat((Number(item.slnhan) ?? 0).toFixed(3));
                                const shortageNote = received < delivered
                                    ? item.ghichu
                                        ? `${item.ghichu}; thiếu ${(delivered - received).toFixed(3)}`
                                        : `Thiếu ${(delivered - received).toFixed(3)}`
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
                    const incValue = parseFloat((sp.sldat ?? 0).toFixed(3));
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
                        khoId: khoId,
                        ghichu: data.ghichu || 'Đơn đặt hàng đã hủy',
                        sanpham: {
                            updateMany: oldDathang.sanpham.map((sp) => ({
                                where: { idSP: sp.idSP },
                                data: {
                                    slgiao: 0,
                                    slnhan: 0,
                                    slhuy: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                    ghichu: sp.ghichu || 'Hủy đơn đặt hàng',
                                },
                            })),
                        },
                    },
                });
            }
            if (oldDathang.status === 'danhan' && data.status === 'dadat') {
                for (const sp of oldDathang.sanpham) {
                    const slnhan = parseFloat((sp.slnhan ?? 0).toFixed(3));
                    if (slnhan > 0) {
                        await prisma.tonKho.update({
                            where: { sanphamId: sp.idSP },
                            data: {
                                slton: { decrement: slnhan },
                            },
                        });
                    }
                }
                const maphieuReturn = `PX-${oldDathang.madncc}-RET-${this.formatDateForFilename()}`;
                const phieuKhoReturn = await prisma.phieuKho.findUnique({
                    where: { maphieu: maphieuReturn },
                });
                if (phieuKhoReturn) {
                    await prisma.phieuKhoSanpham.deleteMany({
                        where: { phieuKhoId: phieuKhoReturn.id },
                    });
                    await prisma.phieuKho.delete({
                        where: { maphieu: maphieuReturn },
                    });
                }
                for (const sp of data.sanpham) {
                    const newSldat = parseFloat((sp.sldat ?? 0).toFixed(3));
                    const oldItem = oldDathang.sanpham.find((o) => o.idSP === sp.id);
                    const oldslnhan = oldItem ? parseFloat((oldItem.slnhan ?? 0).toFixed(3)) : 0;
                    const difference = newSldat - oldslnhan;
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
                const updatedDathang = await prisma.dathang.update({
                    where: { id },
                    data: {
                        title: data.title,
                        type: data.type,
                        ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
                        nhacungcapId: data.nhacungcapId,
                        khoId: khoId,
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
                                            sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                        },
                                    })),
                                },
                            }
                            : {}),
                    },
                });
                return updatedDathang;
            }
            if (oldDathang.status === 'dadat' && data.status === 'danhan') {
                for (const sp of data.sanpham) {
                    const slnhan = parseFloat((Number(sp.slnhan) ?? 0).toFixed(3));
                    await prisma.tonKho.update({
                        where: { sanphamId: sp.idSP ?? sp.id },
                        data: {
                            slchonhap: { decrement: slnhan },
                            slton: { increment: slnhan },
                        },
                    });
                }
                const shortageItems = [];
                for (const item of data.sanpham) {
                    const sldat = parseFloat((Number(item.sldat) ?? 0).toFixed(3));
                    const slnhan = parseFloat((Number(item.slnhan) ?? 0).toFixed(3));
                    if (slnhan < sldat) {
                        const shortage = sldat - slnhan;
                        shortageItems.push({
                            sanphamId: item.id,
                            soluong: shortage,
                            ghichu: item.ghichu
                                ? `${item.ghichu}; thiếu ${shortage.toFixed(3)}`
                                : `Thiếu ${shortage.toFixed(3)}`,
                        });
                    }
                }
                if (shortageItems.length > 0) {
                    const maphieuNhap = `PX-${oldDathang.madncc}-RET-${this.formatDateForFilename()}`;
                    const phieuKhoData = {
                        maphieu: maphieuNhap,
                        ngay: new Date(data.ngaynhan),
                        type: 'xuat',
                        khoId: khoId,
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
                    await prisma.phieuKho.create({ data: phieuKhoData });
                }
                return prisma.dathang.update({
                    where: { id },
                    data: {
                        status: 'danhan',
                        khoId: khoId,
                        sanpham: {
                            updateMany: data.sanpham.map((item) => {
                                const sldat = parseFloat((Number(item.sldat) ?? 0).toFixed(3));
                                const slnhan = parseFloat((Number(item.slnhan) ?? 0).toFixed(3));
                                const shortageNote = slnhan < sldat
                                    ? item.ghichu
                                        ? `${item.ghichu}; thiếu ${(sldat - slnhan).toFixed(3)}`
                                        : `Thiếu ${(sldat - slnhan).toFixed(3)}`
                                    : item.ghichu || '';
                                return {
                                    where: { idSP: item.idSP ?? item.id },
                                    data: {
                                        ghichu: shortageNote,
                                        slnhan: slnhan,
                                        slgiao: sldat,
                                    },
                                };
                            }),
                        },
                    },
                });
            }
            throw new Error('Trạng thái không hợp lệ');
        });
    }
    async remove(id) {
        return this.prisma.$transaction(async (prisma) => {
            const dathang = await prisma.dathang.findUnique({
                where: { id },
                include: { sanpham: true },
            });
            if (!dathang) {
                throw new common_1.NotFoundException('Đơn đặt hàng không tồn tại');
            }
            for (const sp of dathang.sanpham) {
                const sldat = parseFloat((sp.sldat ?? 0).toFixed(3));
                const slgiao = parseFloat((sp.slgiao ?? 0).toFixed(3));
                if (dathang.status === 'dagiao') {
                    await prisma.tonKho.update({
                        where: { sanphamId: sp.idSP },
                        data: { slchonhap: { increment: slgiao } },
                    });
                }
                await prisma.tonKho.update({
                    where: { sanphamId: sp.idSP },
                    data: { slchonhap: { decrement: sldat } },
                });
            }
            return prisma.dathang.delete({ where: { id } });
        });
    }
    async findByProductId(idSP) {
        const dathangs = await this.prisma.dathang.findMany({
            where: {
                sanpham: {
                    some: { idSP },
                },
            },
            include: {
                sanpham: {
                    where: { idSP },
                    include: {
                        sanpham: true,
                    },
                },
                nhacungcap: true,
                kho: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return dathangs.map((dathang) => ({
            ...dathang,
            sanpham: dathang.sanpham.find((item) => item.idSP === idSP)
        }));
    }
    async deletebulk(data) {
        try {
            const { ids } = data;
            if (!Array.isArray(ids) || ids.length === 0) {
                throw new Error('Invalid or empty ids array');
            }
            const results = [];
            const errors = [];
            for (const id of ids) {
                try {
                    await this.remove(id);
                    results.push({ id, status: 'deleted' });
                }
                catch (error) {
                    console.error(`Error deleting dathang ${id}:`, error);
                    errors.push({
                        id,
                        error: error.message,
                        status: 'failed'
                    });
                    await this._ImportdataService.create({
                        caseDetail: {
                            errorMessage: error.message,
                            errorStack: error.stack,
                            additionalInfo: `Error deleting dathang with id: ${id}`,
                        },
                        order: 1,
                        createdBy: 'system',
                        title: `Delete Bulk Dathang Error ${new Date().toLocaleString('vi-VN')}`,
                        type: 'dathang',
                    });
                }
            }
            return {
                total: ids.length,
                success: results.length,
                failed: errors.length,
                results,
                errors,
                message: `Processed ${ids.length} deletions. ${results.length} successful, ${errors.length} failed.`
            };
        }
        catch (error) {
            console.error('Error in deletebulk:', error);
            throw error;
        }
    }
    async findOrdersByStatus(params) {
        try {
            const data = await this.prisma.dathang.findMany({
                where: {
                    status: { in: params.status },
                    sanpham: {
                        some: {
                            idSP: params.sanphamId
                        }
                    }
                },
                include: {
                    sanpham: {
                        where: { idSP: params.sanphamId }
                    },
                    nhacungcap: {
                        select: {
                            id: true,
                            name: true,
                            mancc: true
                        }
                    }
                }
            });
            return data || [];
        }
        catch (error) {
            console.error('Error finding dathang by status:', error);
            return [];
        }
    }
    async completeDathang(id, data) {
        try {
            return await this.prisma.$transaction(async (prisma) => {
                const dathang = await prisma.dathang.findUnique({
                    where: { id },
                    include: { sanpham: true }
                });
                if (!dathang) {
                    return { success: false, message: 'Đặt hàng không tồn tại' };
                }
                await prisma.dathang.update({
                    where: { id },
                    data: {
                        status: 'danhan',
                        ghichu: data.ghichu,
                        updatedAt: new Date()
                    }
                });
                for (const sp of dathang.sanpham) {
                    await prisma.dathangsanpham.update({
                        where: { id: sp.id },
                        data: {
                            slnhan: data.slnhan,
                            ghichu: data.ghichu
                        }
                    });
                    const oldSlchonhap = parseFloat((sp.slgiao || 0).toString());
                    const newSlnhan = parseFloat(data.slnhan.toString());
                    await this.updateTonKhoSafely(sp.idSP, {
                        slchonhap: { decrement: oldSlchonhap },
                        slton: { increment: newSlnhan }
                    });
                }
                return { success: true, message: 'Hoàn tất đặt hàng thành công' };
            });
        }
        catch (error) {
            console.error('Error completing dathang:', error);
            return { success: false, message: error.message };
        }
    }
    async completePendingReceiptsForProduct(sanphamId) {
        try {
            const pendingOrders = await this.prisma.dathang.findMany({
                where: {
                    status: { in: ['dadat', 'dagiao'] },
                    sanpham: {
                        some: {
                            idSP: sanphamId,
                            slgiao: { gt: 0 }
                        }
                    }
                },
                include: {
                    sanpham: {
                        where: { idSP: sanphamId }
                    }
                }
            });
            if (pendingOrders.length === 0) {
                return {
                    success: true,
                    count: 0,
                    message: 'Không có đặt hàng chờ nhập nào'
                };
            }
            const batchSize = 10;
            let totalCompleted = 0;
            for (let i = 0; i < pendingOrders.length; i += batchSize) {
                const batch = pendingOrders.slice(i, i + batchSize);
                const batchResult = await this.prisma.$transaction(async (prisma) => {
                    let batchCount = 0;
                    for (const order of batch) {
                        const sanphamUpdates = order.sanpham.map(sp => ({
                            id: sp.id,
                            slnhan: parseFloat(sp.slgiao.toString()),
                            ghichu: (sp.ghichu || '') + ' | Auto-completed for inventory close'
                        }));
                        await prisma.dathang.update({
                            where: { id: order.id },
                            data: {
                                status: 'danhan',
                                ghichu: (order.ghichu || '') + ' | Tự động hoàn tất trước chốt kho',
                                updatedAt: new Date()
                            }
                        });
                        for (const update of sanphamUpdates) {
                            await prisma.dathangsanpham.update({
                                where: { id: update.id },
                                data: {
                                    slnhan: update.slnhan,
                                    ghichu: update.ghichu
                                }
                            });
                        }
                        for (const sp of order.sanpham) {
                            const slgiaoValue = parseFloat(sp.slgiao.toString());
                            await this.tonkhoManager.updateTonkhoAtomic([{
                                    sanphamId: sp.idSP,
                                    operation: 'increment',
                                    slton: slgiaoValue,
                                    slchonhap: -slgiaoValue,
                                    reason: `Auto-complete pending receipt for order ${order.madncc}`
                                }]);
                        }
                        batchCount += order.sanpham.length;
                    }
                    return batchCount;
                }, {
                    timeout: 30000
                });
                totalCompleted += batchResult;
            }
            return {
                success: true,
                count: totalCompleted,
                message: `Đã hoàn tất ${totalCompleted} đặt hàng chờ nhập`
            };
        }
        catch (error) {
            console.error('Error completing pending receipts:', error);
            return {
                success: false,
                count: 0,
                message: error.message || 'Lỗi khi hoàn tất đặt hàng chờ nhập'
            };
        }
    }
    async updateTonKhoSafely(sanphamId, updateData) {
        try {
            const existingTonKho = await this.prisma.tonKho.findUnique({
                where: { sanphamId }
            });
            if (existingTonKho) {
                await this.prisma.tonKho.update({
                    where: { sanphamId },
                    data: updateData
                });
            }
            else {
                const initialValue = this.calculateInitialTonKhoValue(updateData);
                await this.prisma.tonKho.create({
                    data: {
                        sanphamId,
                        slton: initialValue.slton,
                        slchogiao: initialValue.slchogiao,
                        slchonhap: initialValue.slchonhap
                    }
                });
            }
        }
        catch (error) {
            console.error(`Error updating TonKho for product ${sanphamId}:`, error);
            throw error;
        }
    }
    calculateInitialTonKhoValue(updateData) {
        let slton = 0;
        let slchogiao = 0;
        let slchonhap = 0;
        if (updateData.slton) {
            if (typeof updateData.slton === 'object' && updateData.slton.increment) {
                slton = updateData.slton.increment;
            }
            else {
                slton = updateData.slton;
            }
        }
        if (updateData.slchogiao) {
            if (typeof updateData.slchogiao === 'object' && updateData.slchogiao.increment) {
                slchogiao = updateData.slchogiao.increment;
            }
            else if (typeof updateData.slchogiao === 'object' && updateData.slchogiao.decrement) {
                slchogiao = -updateData.slchogiao.decrement;
            }
            else {
                slchogiao = updateData.slchogiao;
            }
        }
        if (updateData.slchonhap) {
            if (typeof updateData.slchonhap === 'object' && updateData.slchonhap.increment) {
                slchonhap = updateData.slchonhap.increment;
            }
            else if (typeof updateData.slchonhap === 'object' && updateData.slchonhap.decrement) {
                slchonhap = -updateData.slchonhap.decrement;
            }
            else {
                slchonhap = updateData.slchonhap;
            }
        }
        return { slton, slchogiao, slchonhap };
    }
    async getPendingReceiptsForProduct(sanphamId) {
        try {
            const orders = await this.prisma.dathang.findMany({
                where: {
                    status: { in: ['dadat', 'dagiao'] },
                    sanpham: {
                        some: {
                            idSP: sanphamId,
                            slgiao: { gt: 0 }
                        }
                    }
                },
                include: {
                    sanpham: {
                        where: { idSP: sanphamId }
                    },
                    nhacungcap: {
                        select: {
                            id: true,
                            name: true,
                            mancc: true
                        }
                    }
                }
            });
            return orders.map(order => ({
                id: order.id,
                status: order.status,
                nhacungcap: order.nhacungcap,
                sanpham: order.sanpham[0],
                createdAt: order.createdAt
            }));
        }
        catch (error) {
            console.error('Error getting pending receipts for product:', error);
            return [];
        }
    }
    async congnoncc(params) {
        const { Batdau, Ketthuc, query } = params;
        const dateRange = {
            gte: Batdau ? new Date(Batdau) : undefined,
            lte: Ketthuc ? new Date(Ketthuc) : undefined,
        };
        const where = {
            ngaynhan: dateRange,
            status: Array.isArray(params.Status)
                ? { in: params.Status }
                : params.Status,
        };
        if (query) {
            where.OR = [
                { madncc: { contains: query, mode: 'insensitive' } },
                { nhacungcap: { name: { contains: query, mode: 'insensitive' } } },
            ];
        }
        const dathangs = await this.prisma.dathang.findMany({
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
        });
        const result = dathangs.map((v) => {
            const [tong, soluong] = v.sanpham.reduce((acc, item) => {
                const slnhan = parseFloat((item.slnhan || 0).toString());
                const giaban = parseFloat((item.sanpham?.giaban || 0).toString());
                return [
                    acc[0] + (slnhan * giaban),
                    acc[1] + slnhan
                ];
            }, [0, 0]);
            return {
                id: v.id,
                madathang: v.madncc,
                ngaynhan: v.ngaynhan,
                tong: tong.toFixed(3),
                soluong: soluong.toFixed(3),
                tongtien: v.tongtien,
                tongvat: v.tongvat,
                tennhacungcap: v.nhacungcap?.name,
                manhacungcap: v.nhacungcap?.mancc,
            };
        });
        return result || [];
    }
    async downloadcongnoncc(params) {
        const { Batdau, Ketthuc, query, ids } = params;
        const dateRange = {
            gte: Batdau ? new Date(Batdau) : undefined,
            lte: Ketthuc ? new Date(Ketthuc) : undefined,
        };
        const where = {
            ngaynhan: dateRange,
            status: Array.isArray(params.Status)
                ? { in: params.Status }
                : params.Status,
        };
        if (ids?.length > 0) {
            where.id = { in: ids };
        }
        if (query) {
            where.OR = [
                { madncc: { contains: query, mode: 'insensitive' } },
                { nhacungcap: { name: { contains: query, mode: 'insensitive' } } },
            ];
        }
        const dathangs = await this.prisma.dathang.findMany({
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
        });
        const Sanphams = await this.prisma.sanpham.findMany();
        const flatItems = dathangs.flatMap((v) => {
            return v.sanpham.map((item) => ({
                madathang: v.madncc,
                ngaynhan: v.ngaynhan,
                tennhacungcap: v.nhacungcap?.name,
                manhacungcap: v.nhacungcap?.mancc,
                sdt: v.nhacungcap?.sdt,
                diachi: v.nhacungcap?.diachi,
                sanphamId: item.sanphamId,
                title: item.sanpham?.title,
                masp: item.sanpham?.masp,
                dvt: item.sanpham?.dvt,
                giaban: parseFloat((item.sanpham?.giaban || 0).toString()),
                slnhan: parseFloat((item.slnhan || 0).toString()),
                tongtien: parseFloat((item.slnhan || 0).toString()) * parseFloat((item.sanpham?.giaban || 0).toString()),
                ghichu: item.ghichu,
                vat: v.vat || 0,
                tongvat: v.tongvat || 0,
                tongtienOrder: v.tongtien || 0,
            }));
        });
        const customerGroups = flatItems.reduce((groups, item) => {
            const key = `${item.manhacungcap}_${item.tennhacungcap}`;
            if (!groups[key]) {
                groups[key] = {
                    manhacungcap: item.manhacungcap,
                    tennhacungcap: item.tennhacungcap,
                    sdt: item.sdt,
                    diachi: item.diachi,
                    items: [],
                    totalQuantity: 0,
                    totalAmount: 0,
                    vatAmount: 0,
                    finalAmount: 0
                };
            }
            groups[key].items.push(item);
            groups[key].totalQuantity += item.slnhan;
            groups[key].totalAmount += item.tongtien;
            return groups;
        }, {});
        const excelData = Object.values(customerGroups).flatMap((group) => {
            const subtotal = group.totalAmount;
            const vatRate = group.items[0]?.vat || 0;
            const vatAmount = subtotal * vatRate;
            const finalTotal = subtotal + vatAmount;
            const itemRows = group.items.map((item, index) => ({
                'STT': index + 1,
                'Mã Đặt Hàng': item.madathang,
                'Ngày Giao': item.ngaynhan ? new Date(item.ngaynhan).toLocaleDateString('vi-VN') : '',
                'Mã NCC': item.manhacungcap,
                'Tên Nhà Cung Cấp': item.tennhacungcap,
                'SĐT': item.sdt,
                'Địa Chỉ': item.diachi,
                'Mã SP': item.masp,
                'Tên Sản Phẩm': item.title,
                'ĐVT': item.dvt,
                'Giá Bán': item.giaban,
                'Số Lượng': item.slnhan,
                'Thành Tiền': item.tongtien,
                'Ghi Chú': item.ghichu,
                'Tổng Số Lượng': index === 0 ? group.totalQuantity : '',
                'Tổng Tiền': index === 0 ? subtotal : '',
                'Thuế VAT (%)': index === 0 ? (vatRate * 100) : '',
                'Tiền Thuế': index === 0 ? vatAmount : '',
                'Tổng Cộng': index === 0 ? finalTotal : '',
            }));
            return itemRows;
        });
        const XLSX = require('xlsx-js-style');
        const ws = XLSX.utils.json_to_sheet(excelData);
        const colWidths = [
            { wch: 5 },
            { wch: 15 },
            { wch: 12 },
            { wch: 10 },
            { wch: 25 },
            { wch: 12 },
            { wch: 30 },
            { wch: 10 },
            { wch: 30 },
            { wch: 8 },
            { wch: 12 },
            { wch: 10 },
            { wch: 15 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 12 },
            { wch: 15 },
            { wch: 15 },
        ];
        ws['!cols'] = colWidths;
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Công Nợ NCC');
        const dateStr = this.formatDateForFilename();
        const filename = `CongNoNCC_${dateStr}.xlsx`;
        return XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
    }
};
exports.DathangService = DathangService;
exports.DathangService = DathangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        importdata_service_1.ImportdataService,
        status_machine_service_1.StatusMachineService,
        tonkho_manager_service_1.TonkhoManagerService])
], DathangService);
//# sourceMappingURL=dathang.service.js.map