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
const moment = require("moment");
const ExcelJS = require("exceljs");
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
            console.log(param);
            console.log(where);
            if (isOne) {
                const result = await this.prisma.hoadonChitiet.findFirst({
                    include: {
                        hoadon: {
                            select: {
                                ntao: true,
                                tdlap: true,
                                thlap: true,
                                ttxly: true,
                                tthai: true,
                            },
                        },
                    },
                    where,
                    orderBy: { order: 'asc' },
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.hoadonChitiet.findMany({
                    include: {
                        hoadon: {
                            select: {
                                ntao: true,
                                tdlap: true,
                                thlap: true,
                                ttxly: true,
                                tthai: true,
                            },
                        },
                    },
                    where,
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                }),
                this.prisma.hoadonChitiet.count({ where }),
            ]);
            return {
                data: data.map((item) => {
                    const { hoadon, ...rest } = item;
                    return {
                        ...rest,
                        ttxly: hoadon?.ttxly || 0,
                        tthai: hoadon?.tthai || 0,
                        ntao: hoadon?.ntao
                            ? new Date(hoadon.ntao).toLocaleDateString()
                            : '',
                        tdlap: hoadon?.tdlap
                            ? new Date(hoadon.tdlap).toLocaleDateString() : '',
                        thlap: hoadon?.thlap
                            ? hoadon?.thlap : ''
                    };
                }),
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
                                ttxly: true,
                                tthai: true,
                            },
                        },
                    },
                }),
                this.prisma.hoadonChitiet.count(),
            ]);
            console.log('data', data[0]);
            const result = data.map((item) => {
                const { hoadon, ...rest } = item;
                return {
                    ...rest,
                    ttxly: hoadon?.ttxly || 0,
                    tthai: hoadon?.tthai || 0,
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
    formatDate(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    formatMonth(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    async xuatnhapton(param) {
        delete param.isDownload;
        const { page = 1, limit = 20, sizesp = 10, batdau, ketthuc, ...where } = param;
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
            const [hoadonchitiets, total, mathangs, totalmh] = await Promise.all([
                this.prisma.hoadonChitiet.findMany({
                    skip,
                    take: limit,
                    orderBy: { order: 'asc' },
                    where: { ...where, ...dateFilter },
                    include: {
                        hoadon: {
                            select: { ntao: true, tdlap: true, thlap: true, nbmst: true },
                        },
                    },
                }),
                this.prisma.hoadonChitiet.count({
                    where: { ...where, ...dateFilter },
                }),
                this.prisma.mathang.findMany(),
                this.prisma.mathang.count(),
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
            const dailyMap = {};
            hoadonchitiets.forEach((item) => {
                if (item.title && item.sluong && item.hoadon && item.hoadon.ntao) {
                    const date = new Date(item.hoadon.ntao);
                    const dateStr = moment(date).format('DD/MM/YYYY');
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
                            ttdauNgay: 0,
                            ttnhapNgay: 0,
                            ttxuatNgay: 0,
                            ttcuoiNgay: 0,
                            thang: this.formatMonth(date),
                            tongNhapThang: 0,
                            tongXuatThang: 0,
                            tongCuoiThang: 0,
                            ttnhapThang: 0,
                            ttxuatThang: 0,
                            ttcuoiThang: 0,
                            nam: date.getFullYear(),
                            tongNhapNam: 0,
                            tongXuatNam: 0,
                            tongCuoiNam: 0,
                            ttnhapNam: 0,
                            ttxuatNam: 0,
                            ttcuoiNam: 0,
                        };
                    }
                    if (item.hoadon.nbmst === '5900363291') {
                        dailyMap[key].nhapNgay += item.sluong || 0;
                        dailyMap[key].ttnhapNgay += item.thtien || 0;
                        dailyMap[key].tongNhapThang += item.sluong || 0;
                        dailyMap[key].ttnhapThang += item.thtien || 0;
                        dailyMap[key].tongNhapNam += item.sluong || 0;
                        dailyMap[key].ttnhapNam += item.thtien || 0;
                    }
                    else {
                        dailyMap[key].xuatNgay += item.sluong || 0;
                        dailyMap[key].ttxuatNgay += item.thtien || 0;
                        dailyMap[key].tongXuatThang += item.sluong || 0;
                        dailyMap[key].ttxuatThang += item.thtien || 0;
                        dailyMap[key].tongXuatNam += item.sluong || 0;
                        dailyMap[key].ttxuatNam += item.thtien || 0;
                    }
                    dailyMap[key].cuoiNgay =
                        dailyMap[key].dauNgay + dailyMap[key].nhapNgay - dailyMap[key].xuatNgay;
                    dailyMap[key].ttcuoiNgay =
                        dailyMap[key].ttdauNgay + dailyMap[key].ttnhapNgay - dailyMap[key].ttxuatNgay;
                }
            });
            const groupedByProduct = {};
            Object.keys(dailyMap).forEach(key => {
                const record = dailyMap[key];
                const productKey = record.ma;
                if (!groupedByProduct[productKey]) {
                    groupedByProduct[productKey] = [];
                }
                groupedByProduct[productKey].push(record);
            });
            Object.values(groupedByProduct).forEach(records => {
                records.sort((a, b) => {
                    const dateA = moment(a.ngay, 'DD/MM/YYYY').toDate().getTime();
                    const dateB = moment(b.ngay, 'DD/MM/YYYY').toDate().getTime();
                    return dateA - dateB;
                });
                for (let i = 1; i < records.length; i++) {
                    records[i].dauNgay = records[i - 1].cuoiNgay;
                    records[i].ttdauNgay = records[i - 1].ttcuoiNgay;
                    records[i].cuoiNgay =
                        records[i].dauNgay + records[i].nhapNgay - records[i].xuatNgay;
                    records[i].ttcuoiNgay =
                        records[i].ttdauNgay + records[i].ttnhapNgay - records[i].ttxuatNgay;
                }
            });
            const baoCaoHangNgay = Object.values(dailyMap);
            const filteredBaoCaoTongHop = baoCaoHangNgay.filter(record => record.ngay !== 'N/A' && record.thang !== 'N/A' && record.nam !== 'N/A');
            return {
                data: filteredBaoCaoTongHop.slice(0, sizesp),
                total,
                totalSP: sizesp,
                totalmh: totalmh,
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
    async generateExcel(dulieu) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
        console.log('dulieu', dulieu);
        if (!dulieu || !dulieu.length) {
            throw new Error('No data provided');
        }
        const headers = Object.keys(dulieu[0]);
        worksheet.columns = headers.map(key => ({
            header: key.toUpperCase(),
            key,
            width: 20,
        }));
        const batchSize = 10000;
        for (let i = 0; i < dulieu.length; i += batchSize) {
            const batch = dulieu.slice(i, i + batchSize);
            worksheet.addRows(batch);
        }
        const data = await workbook.xlsx.writeBuffer();
        return Buffer.from(data);
    }
    async mathang(param) {
        const { page = 1, pageSize = 50, ...where } = param;
        try {
            const skip = (page - 1) * pageSize;
            const filter = { ...where };
            if (filter.title || filter.title2) {
                const searchTerm = filter.title || filter.title2;
                filter.OR = [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    { title2: { contains: searchTerm, mode: 'insensitive' } },
                ];
                delete filter.title;
                delete filter.title2;
            }
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
        if (data.giavon && typeof data.giavon === 'string') {
            data.giavon = parseFloat(data.giavon);
        }
        try {
            const updated = await this.prisma.mathang.update({
                where: { id },
                data,
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