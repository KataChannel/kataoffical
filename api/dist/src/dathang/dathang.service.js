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
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../prisma/prisma.service");
const importdata_service_1 = require("../importdata/importdata.service");
const status_machine_service_1 = require("../common/status-machine.service");
const tonkho_manager_service_1 = require("../common/tonkho-manager.service");
const performance_logger_1 = require("../shared/performance-logger");
const notification_service_1 = require("../notification/notification.service");
let DathangService = class DathangService {
    constructor(prisma, _ImportdataService, statusMachine, tonkhoManager, notificationService) {
        this.prisma = prisma;
        this._ImportdataService = _ImportdataService;
        this.statusMachine = statusMachine;
        this.tonkhoManager = tonkhoManager;
        this.notificationService = notificationService;
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
        return await performance_logger_1.PerformanceLogger.logAsync('DathangService.generateNextOrderCode', async () => {
            const lastOrder = await this.prisma.dathang.findFirst({
                orderBy: { createdAt: 'desc' },
            });
            let nextCode = 'TGNCC-AA00001';
            if (lastOrder && lastOrder.madncc) {
                nextCode = this.incrementOrderCode(lastOrder.madncc);
            }
            return nextCode;
        });
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
        return await performance_logger_1.PerformanceLogger.logAsync('DathangService.findAll', async () => {
            const dathangs = await this.prisma.dathang.findMany({
                take: 100,
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
        });
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
                    const expectedStock = Number(tonkho.slton) - Number(tonkho.slchogiao) + Number(tonkho.slchonhap);
                    if (expectedStock < 0) {
                        computedGoiy = Math.abs(expectedStock) * (1 + Number(item.sanpham.haohut) / 100);
                    }
                    else {
                        computedGoiy = 0;
                    }
                }
                return {
                    ...item.sanpham,
                    idSP: item.idSP,
                    goiy: computedGoiy,
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
        if (success > 0) {
            this.notificationService.broadcastToAdmins({
                title: 'Import Đặt Hàng Thành Công',
                body: `Đã import thành công ${success} đơn đặt hàng.`,
                url: '/admin/dathang/list',
                type: 'import'
            }).catch(err => console.error('Failed to send notification:', err));
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
        const { page: rawPage = 1, pageSize: rawPageSize = 50, isOne, khoId, ...where } = param;
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
        const pageSize = Math.min(Math.max(Number(rawPageSize) || 10, 1), 1000);
        const pageNumber = Math.max(Number(rawPage) || 1, 1);
        const skip = (pageNumber - 1) * pageSize;
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
            page: pageNumber,
            pageSize,
            total,
            pageCount: Math.ceil(total / pageSize),
        };
    }
    async create(dto) {
        const madathang = await this.generateNextOrderCode();
        const result = await this.prisma.$transaction(async (prisma) => {
            if (!dto.nhacungcap || !dto.nhacungcap.mancc) {
                throw new common_1.BadRequestException('Thông tin nhà cung cấp không hợp lệ');
            }
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
                    ngaynhanEnd: dto.ngaynhanEnd ? new Date(dto.ngaynhanEnd) : null,
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
                            ttnhan: parseFloat(((sp.slnhan || 0) * (sp.gianhap || 0)).toFixed(3)),
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
        if (result) {
            const nhacungcap = result.nhacungcapId ? await this.prisma.nhacungcap.findUnique({ where: { id: result.nhacungcapId } }) : null;
            this.notificationService.broadcastToAdmins({
                title: 'Đặt Hàng Mới',
                body: `Đơn đặt hàng ${result.madncc} đã được tạo cho NCC ${nhacungcap?.name || 'N/A'}.`,
                url: `/admin/dathang/detail/${result.id}`,
                type: 'dathang'
            }).catch(err => console.error('Failed to send notification:', err));
        }
        return result;
    }
    async createbynhucau(dto) {
        const madathang = await this.generateNextOrderCode();
        const result = await this.prisma.$transaction(async (prisma) => {
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
                    ngaynhanEnd: dto.ngaynhanEnd ? new Date(dto.ngaynhanEnd) : null,
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
                            ttnhan: parseFloat(((sp.slnhan || 0) * (sp.gianhap || 0)).toFixed(3)),
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
        if (result) {
            const nhacungcap = result.nhacungcapId ? await this.prisma.nhacungcap.findUnique({ where: { id: result.nhacungcapId } }) : null;
            this.notificationService.broadcastToAdmins({
                title: 'Đặt Hàng Mới (Nhu Cầu)',
                body: `Đơn đặt hàng ${result.madncc} đã được tạo cho NCC ${nhacungcap?.name || 'N/A'}.`,
                url: `/admin/dathang/detail/${result.id}`,
                type: 'dathang'
            }).catch(err => console.error('Failed to send notification:', err));
        }
        return result;
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
            const ngaynhanToCheck = oldDathang.ngaynhan || oldDathang.createdAt;
            if (ngaynhanToCheck) {
                const lastLockedChotkho = await prisma.chotkho.findFirst({
                    where: {
                        khoId: oldDathang.khoId || '4cc01811-61f5-4bdc-83de-a493764e9258',
                        isLocked: true,
                        ngaychot: { gte: ngaynhanToCheck }
                    },
                    orderBy: { ngaychot: 'desc' }
                });
                if (lastLockedChotkho) {
                    throw new common_1.BadRequestException(`Đơn hàng đã thuộc kỳ chốt kho đã khóa ngày ${new Date(lastLockedChotkho.ngaychot).toLocaleDateString('vi-VN')}. Không thể chỉnh sửa.`);
                }
            }
            if (data.status && data.status !== oldDathang.status) {
                const transition = this.statusMachine.validateTransition('dathang', oldDathang.status, data.status, true);
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
                        ngaynhanEnd: data.ngaynhanEnd ? new Date(data.ngaynhanEnd) : undefined,
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
                const oldProductIds = oldDathang.sanpham.map((sp) => sp.idSP);
                const newProductIds = data.sanpham.map((sp) => sp.idSP ?? sp.id);
                const deletedProductIds = oldProductIds.filter((id) => !newProductIds.includes(id));
                for (const deletedId of deletedProductIds) {
                    const deletedItem = oldDathang.sanpham.find((sp) => sp.idSP === deletedId);
                    if (deletedItem && Number(deletedItem.sldat) > 0) {
                        await prisma.tonKho.update({
                            where: { sanphamId: deletedId },
                            data: {
                                slchonhap: { decrement: parseFloat((deletedItem.sldat ?? 0).toFixed(3)) },
                            },
                        });
                    }
                }
                for (const sp of data.sanpham) {
                    const oldItem = oldDathang.sanpham.find((o) => o.idSP === (sp.idSP ?? sp.id));
                    const newSldat = parseFloat((sp.sldat ?? 0).toFixed(3));
                    if (oldItem) {
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
                    else {
                        if (newSldat > 0) {
                            await prisma.tonKho.upsert({
                                where: { sanphamId: sp.idSP ?? sp.id },
                                update: {
                                    slchonhap: { increment: newSldat },
                                },
                                create: {
                                    sanphamId: sp.idSP ?? sp.id,
                                    slchonhap: newSldat,
                                    slton: 0,
                                    slchogiao: 0,
                                },
                            });
                        }
                    }
                }
                if (deletedProductIds.length > 0) {
                    await prisma.dathangsanpham.deleteMany({
                        where: {
                            dathangId: id,
                            idSP: { in: deletedProductIds },
                        },
                    });
                }
                const updatedDathang = await prisma.dathang.update({
                    where: { id },
                    data: {
                        title: data.title,
                        type: data.type,
                        ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
                        ngaynhanEnd: data.ngaynhanEnd ? new Date(data.ngaynhanEnd) : undefined,
                        nhacungcapId: data.nhacungcapId,
                        khoId: khoId,
                        isActive: data.isActive,
                        order: data.order,
                        ghichu: data.ghichu,
                        status: 'dadat',
                    },
                });
                for (const sp of data.sanpham) {
                    const existingProduct = await prisma.dathangsanpham.findFirst({
                        where: {
                            dathangId: id,
                            idSP: sp.idSP ?? sp.id,
                        },
                    });
                    if (existingProduct) {
                        await prisma.dathangsanpham.update({
                            where: { id: existingProduct.id },
                            data: {
                                ghichu: sp.ghichu,
                                sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                                slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                                slhuy: parseFloat((sp.slhuy ?? 0).toFixed(3)),
                                gianhap: parseFloat((sp.gianhap ?? 0).toFixed(3)) || 0,
                                ttnhan: Number((sp.slnhan ?? 0) * (sp.gianhap ?? 0)) || 0,
                            },
                        });
                    }
                    else {
                        await prisma.dathangsanpham.create({
                            data: {
                                dathangId: id,
                                idSP: sp.idSP ?? sp.id,
                                ghichu: sp.ghichu,
                                sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                                slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                                slhuy: parseFloat((sp.slhuy ?? 0).toFixed(3)),
                                ttdat: parseFloat((sp.ttdat ?? 0).toFixed(3)),
                                ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
                                gianhap: parseFloat((sp.gianhap ?? 0).toFixed(3)) || 0,
                                ttnhan: Number((sp.slnhan ?? 0) * (sp.gianhap ?? 0)) || 0,
                            },
                        });
                    }
                }
                return prisma.dathang.findUnique({
                    where: { id },
                    include: { sanpham: true },
                });
            }
            if (data.status === 'dagiao') {
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
                    const oldSp = oldDathang.sanpham.find(o => o.idSP === item.idSP);
                    const reservedQty = parseFloat((Number(oldSp?.sldat) ?? 0).toFixed(3));
                    await this.tonkhoManager.updateTonkhoAtomic([{
                            sanphamId: item.idSP,
                            khoId: khoId,
                            operation: 'increment',
                            slton: receivedQty,
                            slchonhap: reservedQty,
                            reason: `Nhập hàng từ NCC ${oldDathang.madncc}`
                        }]);
                    await prisma.tonKho.update({
                        where: { sanphamId: item.idSP },
                        data: { slchonhap: { decrement: reservedQty } }
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
                const maphieuNhapChuan = `PN-${oldDathang.madncc}-${this.formatDateForFilename()}`;
                await prisma.phieuKho.create({
                    data: {
                        maphieu: maphieuNhapChuan,
                        ngay: new Date(data.ngaynhan || new Date()),
                        type: 'nhap',
                        khoId: khoId,
                        madncc: oldDathang.madncc,
                        ghichu: `Nhập kho tự động từ đơn đặt hàng ${oldDathang.madncc}`,
                        isActive: data.isActive ?? true,
                        sanpham: {
                            create: data.sanpham.map((item) => ({
                                sanphamId: item.idSP,
                                soluong: parseFloat((Number(item.slnhan) ?? 0).toFixed(3)),
                                ghichu: item.ghichu,
                            })),
                        },
                    },
                });
                if (shortageItems.length > 0) {
                    const maphieuShortage = `PX-${oldDathang.madncc}-RET-${this.formatDateForFilename()}`;
                    const phieuKhoData = {
                        maphieu: maphieuShortage,
                        ngay: new Date(data.ngaynhan || new Date()),
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
            if (data.status === 'danhan' && oldDathang.status === 'danhan' && data.sanpham) {
                for (const item of data.sanpham) {
                    const oldSp = oldDathang.sanpham.find(o => o.idSP === item.id || o.idSP === item.idSP);
                    if (oldSp) {
                        const oldReceived = parseFloat((Number(oldSp.slnhan) ?? 0).toFixed(3));
                        const newReceived = parseFloat((Number(item.slnhan) ?? 0).toFixed(3));
                        const delta = newReceived - oldReceived;
                        if (delta !== 0) {
                            await this.tonkhoManager.updateTonkhoAtomic([{
                                    sanphamId: oldSp.idSP,
                                    khoId: khoId,
                                    operation: delta > 0 ? 'increment' : 'decrement',
                                    slton: Math.abs(delta),
                                    reason: `Điều chỉnh số lượng nhập cho đơn ${oldDathang.madncc} (${oldReceived} -> ${newReceived})`
                                }]);
                            console.log(`📌 [DATHANG-UPDATE] Adjusted stock for ${oldSp.idSP}: delta ${delta}`);
                        }
                    }
                }
            }
            if (['huy', 'choxuly', 'khonggiao'].includes(data.status)) {
                if (oldDathang.status === 'danhan') {
                    for (const sp of oldDathang.sanpham) {
                        const slnhan = parseFloat((sp.slnhan ?? 0).toFixed(3));
                        if (slnhan > 0) {
                            if (oldDathang.khoId) {
                                await this.tonkhoManager.updateTonkhoAtomic([{
                                        sanphamId: sp.idSP,
                                        khoId: oldDathang.khoId || undefined,
                                        operation: 'decrement',
                                        slton: slnhan,
                                        reason: `Hoàn kho do đơn hàng ${oldDathang.madncc} chuyển trạng thái ${data.status}`
                                    }]);
                            }
                            else {
                                await prisma.tonKho.update({
                                    where: { sanphamId: sp.idSP },
                                    data: { slton: { decrement: slnhan } },
                                });
                            }
                        }
                    }
                }
                if (['dadat', 'dagiao'].includes(oldDathang.status)) {
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
                        status: data.status,
                        khoId: khoId,
                        ghichu: data.ghichu || `Đơn đặt hàng chuyển sang ${data.status}`,
                        sanpham: {
                            updateMany: oldDathang.sanpham.map((sp) => ({
                                where: { idSP: sp.idSP },
                                data: {
                                    slgiao: 0,
                                    slnhan: 0,
                                    slhuy: data.status === 'huy' ? parseFloat((sp.sldat ?? 0).toFixed(3)) : 0,
                                    ghichu: sp.ghichu || `Chuyển sang ${data.status}`,
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
                        await this.tonkhoManager.updateTonkhoAtomic([{
                                sanphamId: sp.idSP,
                                khoId: oldDathang.khoId || undefined,
                                operation: 'decrement',
                                slton: slnhan,
                                reason: `Hoàn kho khi rollback đơn hàng ${oldDathang.madncc} từ Đã nhận về Đã đặt`
                            }], prisma);
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
                        ngaynhanEnd: data.ngaynhanEnd ? new Date(data.ngaynhanEnd) : undefined,
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
                    const receivedQty = parseFloat((Number(sp.slnhan) ?? 0).toFixed(3));
                    const oldSp = oldDathang.sanpham.find(o => o.idSP === (sp.idSP ?? sp.id));
                    const reservedQty = parseFloat((Number(oldSp?.sldat) ?? 0).toFixed(3));
                    await this.tonkhoManager.updateTonkhoAtomic([{
                            sanphamId: sp.idSP ?? sp.id,
                            khoId: khoId,
                            operation: 'increment',
                            slton: receivedQty,
                            reason: `Nhập kho tự động từ đơn đặt hàng ${oldDathang.madncc} (Bỏ qua bước Đã giao)`
                        }], prisma);
                    await prisma.tonKho.update({
                        where: { sanphamId: sp.idSP ?? sp.id },
                        data: {
                            slchonhap: { decrement: reservedQty },
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
                const maphieuNhapChuan = `PN-${oldDathang.madncc}-${this.formatDateForFilename()}`;
                await prisma.phieuKho.create({
                    data: {
                        maphieu: maphieuNhapChuan,
                        ngay: new Date(data.ngaynhan || new Date()),
                        type: 'nhap',
                        khoId: khoId,
                        madncc: oldDathang.madncc,
                        ghichu: `Nhập kho tự động từ đơn đặt hàng ${oldDathang.madncc} (Bỏ qua bước Đã giao)`,
                        isActive: data.isActive ?? true,
                        sanpham: {
                            create: data.sanpham.map((item) => ({
                                sanphamId: item.idSP ?? item.id,
                                soluong: parseFloat((Number(item.slnhan) ?? 0).toFixed(3)),
                                ghichu: item.ghichu,
                            })),
                        },
                    },
                });
                if (shortageItems.length > 0) {
                    const maphieuShortage = `PX-${oldDathang.madncc}-RET-${this.formatDateForFilename()}`;
                    const phieuKhoData = {
                        maphieu: maphieuShortage,
                        ngay: new Date(data.ngaynhan || new Date()),
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
                await prisma.importHistory.create({
                    data: {
                        caseDetail: {
                            dathangId: id,
                            madncc: oldDathang.madncc,
                            products: data.sanpham.map((item) => {
                                const sldat = parseFloat((Number(item.sldat) ?? 0).toFixed(3));
                                const slnhan = parseFloat((Number(item.slnhan) ?? 0).toFixed(3));
                                return {
                                    idSP: item.sanphamId ?? item.id,
                                    sldat: sldat,
                                    slnhan: slnhan,
                                    chenhlech: sldat - slnhan
                                };
                            }),
                            additionalInfo: "Lưu vết tự động đối soát lúc nhận hàng",
                        },
                        order: 1,
                        createdBy: "system",
                        title: `[Metadata] Đối soát nhận hàng ${oldDathang.madncc} - ${new Date().toLocaleString('vi-VN')}`,
                        type: "dathang_audit",
                    }
                });
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
            if (oldDathang.status === 'danhan' && data.status === 'danhan') {
                const oldProductIds = oldDathang.sanpham.map((sp) => sp.idSP);
                const newProductIds = data.sanpham.map((sp) => sp.idSP ?? sp.id);
                const deletedProductIds = oldProductIds.filter((id) => !newProductIds.includes(id));
                for (const deletedId of deletedProductIds) {
                    const deletedItem = oldDathang.sanpham.find((sp) => sp.idSP === deletedId);
                    const slnhan = deletedItem ? parseFloat((deletedItem.slnhan ?? 0).toFixed(3)) : 0;
                    if (slnhan > 0) {
                        await this.tonkhoManager.updateTonkhoAtomic([{
                                sanphamId: deletedId,
                                khoId: oldDathang.khoId || undefined,
                                operation: 'decrement',
                                slton: slnhan,
                                reason: `Trừ kho do xóa sản phẩm khỏi đơn đặt hàng đã nhận ${oldDathang.madncc}`
                            }], prisma);
                    }
                }
                if (deletedProductIds.length > 0) {
                    await prisma.dathangsanpham.deleteMany({
                        where: {
                            dathangId: id,
                            idSP: { in: deletedProductIds },
                        },
                    });
                }
                for (const sp of data.sanpham) {
                    const spId = sp.idSP ?? sp.id;
                    const oldItem = oldDathang.sanpham.find((o) => o.idSP === spId);
                    const newSlnhan = parseFloat((sp.slnhan ?? 0).toFixed(3));
                    const newGianhap = parseFloat((sp.gianhap ?? 0).toFixed(3)) || 0;
                    if (oldItem) {
                        await prisma.tonKho.update({
                            where: { sanphamId: spId },
                            data: {
                                slchonhap: { set: 0 }
                            }
                        });
                        await prisma.dathangsanpham.update({
                            where: { id: oldItem.id },
                            data: {
                                slnhan: newSlnhan,
                                gianhap: newGianhap,
                                ttnhan: Number(newSlnhan * newGianhap),
                                ghichu: sp.ghichu,
                                sldat: parseFloat((sp.sldat ?? oldItem.sldat ?? 0).toFixed(3)),
                                slgiao: parseFloat((sp.slgiao ?? oldItem.slgiao ?? 0).toFixed(3)),
                            }
                        });
                    }
                    else {
                        if (newSlnhan > 0) {
                            await prisma.tonKho.upsert({
                                where: { sanphamId: spId },
                                update: {
                                    slton: { increment: newSlnhan },
                                },
                                create: {
                                    sanphamId: spId,
                                    slton: newSlnhan,
                                    slchonhap: 0,
                                    slchogiao: 0,
                                },
                            });
                        }
                        await prisma.dathangsanpham.create({
                            data: {
                                dathangId: id,
                                idSP: spId,
                                slnhan: newSlnhan,
                                sldat: parseFloat((sp.sldat ?? sp.slnhan ?? 0).toFixed(3)),
                                slgiao: parseFloat((sp.slgiao ?? sp.slnhan ?? 0).toFixed(3)),
                                gianhap: newGianhap,
                                ttnhan: Number(newSlnhan * newGianhap),
                                ghichu: sp.ghichu,
                                isActive: true,
                            }
                        });
                    }
                }
                const phieuKhoNhap = await prisma.phieuKho.findFirst({
                    where: {
                        madncc: oldDathang.madncc,
                        type: 'nhap',
                    },
                });
                if (phieuKhoNhap) {
                    if (deletedProductIds.length > 0) {
                        await prisma.phieuKhoSanpham.deleteMany({
                            where: {
                                phieuKhoId: phieuKhoNhap.id,
                                sanphamId: { in: deletedProductIds },
                            },
                        });
                    }
                    for (const sp of data.sanpham) {
                        const spId = sp.idSP ?? sp.id;
                        const newSlnhan = parseFloat((sp.slnhan ?? 0).toFixed(3));
                        if (newSlnhan > 0) {
                            await prisma.phieuKhoSanpham.upsert({
                                where: {
                                    phieuKhoId_sanphamId: {
                                        phieuKhoId: phieuKhoNhap.id,
                                        sanphamId: spId,
                                    },
                                },
                                update: {
                                    soluong: newSlnhan,
                                    ghichu: sp.ghichu,
                                },
                                create: {
                                    phieuKhoId: phieuKhoNhap.id,
                                    sanphamId: spId,
                                    soluong: newSlnhan,
                                    ghichu: sp.ghichu,
                                },
                            });
                        }
                        else {
                            await prisma.phieuKhoSanpham.deleteMany({
                                where: {
                                    phieuKhoId: phieuKhoNhap.id,
                                    sanphamId: spId,
                                },
                            });
                        }
                    }
                }
                await prisma.importHistory.create({
                    data: {
                        caseDetail: {
                            dathangId: id,
                            madncc: oldDathang.madncc,
                            products: data.sanpham.map((sp) => {
                                const sldat = parseFloat((sp.sldat ?? 0).toFixed(3));
                                const slnhan = parseFloat((sp.slnhan ?? 0).toFixed(3));
                                return {
                                    idSP: sp.idSP ?? sp.id,
                                    sldat: sldat,
                                    slnhan: slnhan,
                                    chenhlech: sldat - slnhan
                                };
                            }),
                            additionalInfo: "Sửa đổi số liệu sau khi hoàn tất Nhận hàng",
                        },
                        order: 1,
                        createdBy: "system",
                        title: `[Metadata] Cập nhật đối soát nhận hàng ${oldDathang.madncc} - ${new Date().toLocaleString('vi-VN')}`,
                        type: "dathang_audit",
                    }
                });
                return await prisma.dathang.update({
                    where: { id },
                    data: {
                        title: data.title,
                        type: data.type,
                        ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
                        ngaynhanEnd: data.ngaynhanEnd ? new Date(data.ngaynhanEnd) : undefined,
                        nhacungcapId: data.nhacungcapId,
                        khoId: khoId,
                        isActive: data.isActive,
                        order: data.order,
                        ghichu: data.ghichu,
                    },
                    include: { sanpham: true }
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
                    sanpham: { some: { idSP: sanphamId } }
                },
                include: {
                    sanpham: true
                }
            });
            if (pendingOrders.length === 0) {
                await this.tonkhoManager.syncStockToReality(sanphamId);
                return {
                    success: true,
                    count: 0,
                    message: 'Đã hoàn tất đồng bộ tồn kho thực tế'
                };
            }
            const batchSize = 25;
            let totalCompletedItems = 0;
            for (let i = 0; i < pendingOrders.length; i += batchSize) {
                const batch = pendingOrders.slice(i, i + batchSize);
                await this.prisma.$transaction(async (tx) => {
                    for (const order of batch) {
                        await tx.dathang.update({
                            where: { id: order.id },
                            data: {
                                status: 'danhan',
                                ghichu: (order.ghichu || '') + ' | Hoàn tất chờ nhập (Tự động)',
                                updatedAt: new Date()
                            }
                        });
                        for (const sp of order.sanpham) {
                            const sldat = parseFloat(sp.sldat.toString()) || 0;
                            const slgiao = parseFloat(sp.slgiao.toString()) || 0;
                            const qtyToReceive = slgiao > 0 ? slgiao : sldat;
                            if (qtyToReceive > 0) {
                                await tx.dathangsanpham.update({
                                    where: { id: sp.id },
                                    data: {
                                        slnhan: qtyToReceive,
                                        ghichu: (sp.ghichu || '') + ' | Tự động khớp lệnh'
                                    }
                                });
                                await tx.tonKho.upsert({
                                    where: { sanphamId: sp.idSP },
                                    create: {
                                        sanphamId: sp.idSP,
                                        slton: qtyToReceive,
                                        slchonhap: 0,
                                        slchogiao: 0
                                    },
                                    update: {
                                        slton: { increment: qtyToReceive },
                                        slchonhap: { decrement: sldat }
                                    }
                                });
                                totalCompletedItems++;
                            }
                        }
                    }
                    await this.tonkhoManager.syncStockToReality(sanphamId, tx);
                }, {
                    timeout: 40000
                });
            }
            return {
                success: true,
                count: totalCompletedItems,
                message: `Đã hoàn tất ${totalCompletedItems} mục hàng`
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
    async completePendingReceiptsBulk(sanphamIds) {
        try {
            const orders = await this.prisma.dathang.findMany({
                where: {
                    status: { in: ['dadat', 'dagiao'] },
                    sanpham: { some: { idSP: { in: sanphamIds } } }
                },
                include: {
                    sanpham: true
                }
            });
            if (orders.length === 0) {
                for (const id of sanphamIds) {
                    await this.tonkhoManager.syncStockToReality(id);
                }
                return { success: true, count: 0, totalProducts: sanphamIds.length };
            }
            const batchSize = 40;
            let totalItems = 0;
            const uniqueProducts = new Set();
            for (let i = 0; i < orders.length; i += batchSize) {
                const batch = orders.slice(i, i + batchSize);
                await this.prisma.$transaction(async (tx) => {
                    const tonkhoUpdates = new Map();
                    for (const order of batch) {
                        await tx.dathang.update({
                            where: { id: order.id },
                            data: {
                                status: 'danhan',
                                ghichu: (order.ghichu || '') + ' | Bulk match process',
                                updatedAt: new Date()
                            }
                        });
                        for (const sp of order.sanpham) {
                            const sldat = parseFloat(sp.sldat.toString()) || 0;
                            const slgiao = parseFloat(sp.slgiao.toString()) || 0;
                            const qtyToReceive = slgiao > 0 ? slgiao : sldat;
                            if (qtyToReceive > 0) {
                                await tx.dathangsanpham.update({
                                    where: { id: sp.id },
                                    data: { slnhan: qtyToReceive, ghichu: (sp.ghichu || '') + ' | Bulk match' }
                                });
                                const current = tonkhoUpdates.get(sp.idSP) || { slton: 0, slchonhap: 0 };
                                tonkhoUpdates.set(sp.idSP, {
                                    slton: current.slton + qtyToReceive,
                                    slchonhap: current.slchonhap + sldat
                                });
                                uniqueProducts.add(sp.idSP);
                                totalItems++;
                            }
                        }
                    }
                    const sortedProductIds = Array.from(tonkhoUpdates.keys()).sort();
                    for (const prodId of sortedProductIds) {
                        const delta = tonkhoUpdates.get(prodId);
                        if (!delta)
                            continue;
                        await tx.tonKho.upsert({
                            where: { sanphamId: prodId },
                            create: { sanphamId: prodId, slton: delta.slton, slchonhap: 0, slchogiao: 0 },
                            update: {
                                slton: { increment: delta.slton },
                                slchonhap: { decrement: delta.slchonhap }
                            }
                        });
                        await this.tonkhoManager.syncStockToReality(prodId, tx);
                    }
                }, { timeout: 120000 });
            }
            const unsyncedIds = sanphamIds.filter(id => !uniqueProducts.has(id));
            if (unsyncedIds.length > 0) {
                const CHUNK_SIZE = 20;
                for (let j = 0; j < unsyncedIds.length; j += CHUNK_SIZE) {
                    const chunk = unsyncedIds.slice(j, j + CHUNK_SIZE);
                    await Promise.all(chunk.map(id => this.tonkhoManager.syncStockToReality(id)));
                }
            }
            return {
                success: true,
                count: totalItems,
                totalProducts: uniqueProducts.size
            };
        }
        catch (error) {
            console.error('Error in completePendingReceiptsBulk:', error);
            throw error;
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
        console.time('🚀 CONGNONCC Performance');
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
        console.time('⚡ Database Query');
        const dathangs = await this.prisma.dathang.findMany({
            where,
            select: {
                id: true,
                madncc: true,
                ngaynhan: true,
                nhacungcap: {
                    select: {
                        name: true,
                        mancc: true
                    }
                },
                sanpham: {
                    select: {
                        slnhan: true,
                        sanpham: {
                            select: {
                                giaban: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });
        console.timeEnd('⚡ Database Query');
        console.time('💨 Data Processing');
        const result = dathangs.map((v) => {
            let tong = 0;
            let soluong = 0;
            for (const item of v.sanpham) {
                const slnhan = Number(item.slnhan) || 0;
                if (slnhan === 0)
                    continue;
                const giaban = Number(item.sanpham?.giaban) || 0;
                tong += slnhan * giaban;
                soluong += slnhan;
            }
            return {
                id: v.id,
                madathang: v.madncc,
                ngaynhan: v.ngaynhan,
                tong: tong.toFixed(3),
                soluong: soluong.toFixed(3),
                tonnhap: tong.toFixed(3),
                tennhacungcap: v.nhacungcap?.name,
                manhacungcap: v.nhacungcap?.mancc,
            };
        });
        console.timeEnd('💨 Data Processing');
        console.timeEnd('🚀 CONGNONCC Performance');
        console.log(`📊 Processed ${result.length} Dathang records`);
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
            return v.sanpham
                .filter((item) => Number(item.slnhan) > 0)
                .map((item) => ({
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
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cell_address = { c: C, r: R };
                const cell_ref = XLSX.utils.encode_cell(cell_address);
                if (!ws[cell_ref])
                    ws[cell_ref] = { t: 'z' };
                if (!ws[cell_ref].s)
                    ws[cell_ref].s = {};
                ws[cell_ref].s.border = {
                    top: { style: 'thin', color: { rgb: '000000' } },
                    bottom: { style: 'thin', color: { rgb: '000000' } },
                    left: { style: 'thin', color: { rgb: '000000' } },
                    right: { style: 'thin', color: { rgb: '000000' } }
                };
            }
        }
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
    async optimizeAllProducts() {
        console.log('🔧 [OPTIMIZE ALL] Bắt đầu tối ưu hóa tất cả sản phẩm...');
        const startTime = Date.now();
        try {
            const allProducts = await this.prisma.sanpham.findMany({
                select: { id: true },
            });
            const allIds = allProducts.map(p => p.id);
            const totalProducts = allIds.length;
            console.log(`📦 Tìm thấy ${totalProducts} sản phẩm`);
            if (totalProducts === 0) {
                return {
                    success: true,
                    totalProducts: 0,
                    processedBatches: 0,
                    totalOptimized: 0,
                    errors: [],
                };
            }
            const BATCH_SIZE = 200;
            let totalOptimized = 0;
            const errors = [];
            let processedBatches = 0;
            for (let i = 0; i < allIds.length; i += BATCH_SIZE) {
                const batchIds = allIds.slice(i, i + BATCH_SIZE);
                const batchNum = Math.floor(i / BATCH_SIZE) + 1;
                const totalBatches = Math.ceil(allIds.length / BATCH_SIZE);
                console.log(`  🔄 [${batchNum}/${totalBatches}] Đang xử lý ${batchIds.length} sản phẩm...`);
                try {
                    const result = await this.completePendingReceiptsBulk(batchIds);
                    totalOptimized += result.count;
                    processedBatches++;
                    console.log(`  ✅ [${batchNum}/${totalBatches}] Hoàn tất: ${result.count} mục khớp lệnh`);
                }
                catch (error) {
                    const errMsg = `Batch ${batchNum}: ${error.message}`;
                    errors.push(errMsg);
                    console.error(`  ❌ [${batchNum}/${totalBatches}] Lỗi:`, error.message);
                }
            }
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            console.log(`🎉 [OPTIMIZE ALL] Hoàn tất trong ${elapsed}s: ${totalOptimized} mục khớp lệnh từ ${totalProducts} sản phẩm`);
            return {
                success: errors.length === 0,
                totalProducts,
                processedBatches,
                totalOptimized,
                errors,
            };
        }
        catch (error) {
            console.error('❌ [OPTIMIZE ALL] Lỗi:', error);
            throw error;
        }
    }
    async autoSystemCompleteOrders() {
        console.log('🤖 [Auto-pilot] Bắt đầu quét đơn đặt hàng chờ nhập hàng ngày...');
        try {
            const pendingOrders = await this.prisma.dathang.findMany({
                where: {
                    status: 'dadat',
                    isActive: true
                }
            });
            if (pendingOrders.length === 0) {
                console.log('🤖 [Auto-pilot] Không có đơn hàng nào cần xử lý.');
                return;
            }
            for (const order of pendingOrders) {
                console.log(`🤖 [Auto-pilot] Đang xử lý tự động đơn hàng: ${order.madncc}`);
                const dathangFull = await this.prisma.dathang.findUnique({
                    where: { id: order.id },
                    include: { sanpham: true }
                });
                if (!dathangFull)
                    continue;
                const updateData = {
                    status: 'danhan',
                    ghichu: (order.ghichu || '') + ' | [Auto-pilot] Tự động xác nhận nhập kho lúc 23h',
                    sanpham: dathangFull.sanpham.map(sp => ({
                        id: sp.id,
                        idSP: sp.idSP,
                        sldat: Number(sp.sldat),
                        slnhan: Number(sp.sldat),
                        gianhap: Number(sp.gianhap)
                    }))
                };
                await this.update(order.id, updateData);
            }
            console.log(`🤖 [Auto-pilot] Hoàn thành tự động chốt ${pendingOrders.length} đơn hàng.`);
        }
        catch (error) {
            console.error('❌ [Auto-pilot] Lỗi trong quá trình tự động chốt đơn:', error);
        }
    }
};
exports.DathangService = DathangService;
__decorate([
    (0, schedule_1.Cron)('0 0 23 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DathangService.prototype, "autoSystemCompleteOrders", null);
exports.DathangService = DathangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        importdata_service_1.ImportdataService,
        status_machine_service_1.StatusMachineService,
        tonkho_manager_service_1.TonkhoManagerService,
        notification_service_1.NotificationService])
], DathangService);
//# sourceMappingURL=dathang.service.js.map