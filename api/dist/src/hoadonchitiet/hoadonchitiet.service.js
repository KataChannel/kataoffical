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
exports.HoadonchitietService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let HoadonchitietService = class HoadonchitietService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdatedhoadonChitiet() {
        try {
            const lastUpdated = await this.prisma.hoadonChitiet.aggregate({
                _max: { updatedAt: true },
            });
            return {
                updatedAt: lastUpdated._max.updatedAt
                    ? new Date(lastUpdated._max.updatedAt).getTime()
                    : 0,
            };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdatedhoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.hoadonChitiet.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const prefix = 'DONHANG';
                const match = latest.codeId.match(new RegExp(prefix + '(\d+)'));
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            const newPrefix = 'DONHANG';
            return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            this._ErrorlogService.logError('generatehoadonChitietCodeId', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(data) {
        try {
            const maxOrder = await this.prisma.hoadonChitiet.aggregate({
                _max: { order: true },
            });
            const newOrder = (maxOrder._max?.order || 0) + 1;
            const codeId = await this.generateCodeId();
            const { id, idhoadon, ...rest } = data;
            const hoadonExists = await this.prisma.hoadon.findFirst({
                where: { id: idhoadon },
            });
            if (!hoadonExists) {
                throw new common_1.HttpException('Referenced Hoadon not found', common_1.HttpStatus.BAD_REQUEST);
            }
            const created = await this.prisma.hoadonChitiet.create({
                data: {
                    ...rest,
                    order: newOrder,
                    codeId: codeId,
                    idhoadon: idhoadon,
                },
            });
            this._SocketGateway.sendUpdate('hoadonchitiet');
            return created;
        }
        catch (error) {
            this._ErrorlogService.logError('createhoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.hoadonChitiet.findFirst({
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.hoadonChitiet.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.hoadonChitiet.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findByhoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.hoadonChitiet.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                    include: {
                        hoadon: {
                            select: {
                                ntao: true,
                                tdlap: true,
                                thlap: true,
                            },
                        },
                    },
                }),
                this.prisma.hoadonChitiet.count(),
            ]);
            const result = data.map((item) => {
                const { hoadon, ...rest } = item;
                return {
                    ...rest,
                    ntao: hoadon?.ntao ? new Date(hoadon.ntao).toLocaleDateString() : '',
                    tdlap: hoadon?.tdlap
                        ? new Date(hoadon.tdlap).toLocaleDateString()
                        : '',
                    thlap: hoadon?.thlap
                        ? hoadon.thlap.toString().replace(/^(\d{4})(\d{2})$/, '$2/$1')
                        : '',
                };
            });
            return {
                data: result,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findAllhoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    parseDate(dateStr) {
        const [month, day, year] = dateStr.split('/');
        return new Date(year, month - 1, day);
    }
    formatDate(date) {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    formatMonth(date) {
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    async xuatnhapton(param) {
        const { page = 1, limit = 20, sizesp = 10, batdau, ketthuc, ...where } = param;
        console.log('param', param);
        try {
            const skip = (page - 1) * limit;
            const dateFilter = batdau && ketthuc
                ? {
                    hoadon: {
                        tdlap: {
                            gte: new Date(batdau),
                            lte: new Date(ketthuc),
                        },
                    },
                }
                : {};
            const [hoadonchitiets, total, mathangs] = await Promise.all([
                this.prisma.hoadonChitiet.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                    where: { ...where, ...dateFilter },
                    include: { hoadon: { select: { ntao: true, tdlap: true, thlap: true, nbmst: true } } },
                }),
                this.prisma.hoadonChitiet.count({
                    where: { ...where, ...dateFilter },
                }),
                this.prisma.mathang.findMany(),
            ]);
            const productDetails = {};
            mathangs.forEach((item) => {
                if (item.title) {
                    productDetails[item.title2] = {
                        code: item.title2,
                        unit: item.dvtinh || 'N/A',
                    };
                }
            });
            const currentDate = new Date();
            const dailyMap = {};
            console.log('hoadonchitiets', hoadonchitiets);
            hoadonchitiets.forEach((item) => {
                if (item.title && item.sluong && item.hoadon && item.hoadon.ntao) {
                    const date = new Date(item.hoadon.ntao);
                    console.log('date', date);
                    const dateStr = this.formatDate(date);
                    const key = `${item.title}_${dateStr}`;
                    if (!dailyMap[key]) {
                        dailyMap[key] = {
                            ngay: dateStr,
                            ma: item.title,
                            sanpham: item.ten,
                            donvi: item.dvtinh || 'N/A',
                            dauNgay: 0,
                            nhapNgay: 0,
                            xuatNgay: 0,
                            cuoiNgay: 0,
                            ttnhap: 0,
                            ttxuat: 0,
                            thang: this.formatMonth(date),
                            tongNhapThang: 0,
                            tongXuatThang: 0,
                            closing: 0,
                            nam: date.getFullYear(),
                            tongNhapNam: 0,
                            tongXuatNam: 0,
                        };
                    }
                    if (item.hoadon.nbmst === "5900363291") {
                        dailyMap[key].nhapNgay += item.sluong || 0;
                        dailyMap[key].ttnhap += item.thtien || 0;
                    }
                    else {
                        dailyMap[key].xuatNgay += item.sluong || 0;
                        dailyMap[key].ttxuat += item.thtien || 0;
                    }
                }
            });
            const baoCaoHangNgay = Object.values(dailyMap);
            console.log('baoCaoHangNgay', baoCaoHangNgay);
            const monthlyMap = {};
            const yearlyMap = {};
            baoCaoHangNgay.forEach((record) => {
                const monthKey = `${record.ma}_${this.formatMonth(record.date)}`;
                if (!monthlyMap[monthKey]) {
                    monthlyMap[monthKey] = {
                        thang: this.formatMonth(record.date),
                        sanpham: record.sanpham,
                        ma: record.ma,
                        donvi: record.donvi,
                        tongNhapThang: 0,
                        tongXuatThang: 0,
                        opening: 0,
                        closing: 0,
                    };
                }
                monthlyMap[monthKey].tongNhapThang += record.nhapNgay;
                monthlyMap[monthKey].tongXuatThang += record.xuatNgay;
                const yearKey = `${record.ma}_${record.date.getFullYear()}`;
                if (!yearlyMap[yearKey]) {
                    yearlyMap[yearKey] = {
                        nam: record.date.getFullYear(),
                        sanpham: record.sanpham,
                        ma: record.ma,
                        donvi: record.donvi,
                        tongNhapNam: 0,
                        tongXuatNam: 0,
                        opening: 0,
                        closing: 0,
                    };
                }
                yearlyMap[yearKey].tongNhapNam += record.nhapNgay;
                yearlyMap[yearKey].tongXuatNam += record.xuatNgay;
            });
            Object.values(monthlyMap).forEach((entry) => {
                entry.opening = 0;
                entry.closing = entry.tongNhapThang - entry.tongXuatThang;
            });
            Object.values(yearlyMap).forEach((entry) => {
                entry.opening = 0;
                entry.closing = entry.tongNhapNam - entry.tongXuatNam;
            });
            const products = new Set([
                ...hoadonchitiets.map((item) => item.title).filter((t) => t != null),
                ...mathangs.map((item) => item.title).filter((t) => t != null),
            ]);
            const baoCaoTongHop = [...baoCaoHangNgay];
            console.log('baoCaoTongHop', baoCaoTongHop);
            products.forEach((product) => {
                if (!baoCaoTongHop.some((row) => row.ma === product)) {
                    const mathangItem = mathangs.find((item) => item.title === product);
                    const productName = mathangItem && mathangItem.ten ? mathangItem.ten : product;
                    const details = productDetails[product] || { code: product, unit: 'N/A' };
                    baoCaoTongHop.push({
                        ngay: 'N/A',
                        ma: details.code,
                        sanpham: productName,
                        donvi: details.unit,
                        dauNgay: 0,
                        nhapNgay: 0,
                        xuatNgay: 0,
                        cuoiNgay: 0,
                        ttnhap: 0,
                        ttxuat: 0,
                        thang: 'N/A',
                        tongNhapThang: 0,
                        tongXuatThang: 0,
                        closing: 0,
                        nam: 'N/A',
                        tongNhapNam: 0,
                        tongXuatNam: 0,
                    });
                }
            });
            return {
                data: baoCaoTongHop.slice(0, sizesp),
                total,
                totalSP: sizesp,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('xuatnhapton', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async mathang(param) {
        const { page = 1, pageSize = 20, ...where } = param;
        try {
            const skip = (page - 1) * pageSize;
            const filter = { ...where };
            const [mathangs, total] = await Promise.all([
                this.prisma.mathang.findMany({
                    skip,
                    take: pageSize,
                    orderBy: [{ title: 'asc' }, { giavon: 'asc' }],
                    where: filter,
                }),
                this.prisma.mathang.count({
                    where: filter,
                }),
            ]);
            return {
                data: mathangs.map((item) => {
                    item.giavon = Number(item.giavon).toFixed(0);
                    return item;
                }),
                total,
                page,
                pageCount: Math.ceil(total / pageSize),
            };
        }
        catch (error) {
            this._ErrorlogService.logError('mathang', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.hoadonChitiet.findUnique({
                where: { id },
            });
            if (!item)
                throw new common_1.HttpException('hoadonChitiet not found', common_1.HttpStatus.NOT_FOUND);
            return item;
        }
        catch (error) {
            this._ErrorlogService.logError('findOnehoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateMathang(id, data) {
        console.log('data', data);
        try {
            const updated = await this.prisma.mathang.update({
                where: { id },
                data: { isproduct: data.isproduct },
            });
            console.log('updated', updated);
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updateMathang', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, data) {
        try {
            let updated;
            if (data.order) {
                const { order, ...rest } = data;
                await this.prisma.hoadonChitiet.update({ where: { id }, data: rest });
                updated = await this.prisma.hoadonChitiet.update({
                    where: { id },
                    data: { order },
                });
            }
            else {
                updated = await this.prisma.hoadonChitiet.update({
                    where: { id },
                    data,
                });
            }
            this._SocketGateway.sendUpdate('hoadonchitiet');
            return updated;
        }
        catch (error) {
            this._ErrorlogService.logError('updatehoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.hoadonChitiet.delete({ where: { id } });
            this._SocketGateway.sendUpdate('hoadonchitiet');
            return deleted;
        }
        catch (error) {
            this._ErrorlogService.logError('removehoadonChitiet', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async reorderhoadonChitiets(hoadonChitietIds) {
        try {
            for (let i = 0; i < hoadonChitietIds.length; i++) {
                await this.prisma.hoadonChitiet.update({
                    where: { id: hoadonChitietIds[i] },
                    data: { order: i + 1 },
                });
            }
            this._SocketGateway.sendUpdate('hoadonchitiet');
            return { status: 'success' };
        }
        catch (error) {
            this._ErrorlogService.logError('reorderhoadonChitiets', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.HoadonchitietService = HoadonchitietService;
exports.HoadonchitietService = HoadonchitietService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], HoadonchitietService);
//# sourceMappingURL=hoadonchitiet.service.js.map