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
const moment = require("moment-timezone");
const prisma_service_1 = require("../../prisma/prisma.service");
const status_machine_service_1 = require("../common/status-machine.service");
const tonkho_manager_service_1 = require("../common/tonkho-manager.service");
const DEFAUL_KHO_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
const DEFAUL_BANGGIA_ID = '84a62698-5784-4ac3-b506-5e662d1511cb';
let DonhangService = class DonhangService {
    constructor(prisma, statusMachine, tonkhoManager) {
        this.prisma = prisma;
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
    formatDateUnderscored() {
        return this.formatDateForFilename();
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
    getStartOfDay(date) {
        const d = new Date(date);
        d.setUTCHours(0, 0, 0, 0);
        return d;
    }
    getEndOfDay(date) {
        const d = new Date(date);
        d.setUTCHours(23, 59, 59, 999);
        return d;
    }
    async updateTonKhoSafe(prisma, sanphamId, updateData) {
        try {
            await prisma.tonKho.upsert({
                where: { sanphamId },
                create: {
                    sanphamId,
                    slton: this.getCreateValue(updateData.slton),
                    slchogiao: this.getCreateValue(updateData.slchogiao),
                    slchonhap: this.getCreateValue(updateData.slchonhap),
                },
                update: updateData,
            });
        }
        catch (error) {
            console.error(`Error updating TonKho for sanphamId ${sanphamId}:`, error);
            throw error;
        }
    }
    getCreateValue(operation) {
        if (!operation)
            return 0;
        if (operation.increment)
            return operation.increment;
        if (operation.decrement)
            return -operation.decrement;
        return 0;
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
        const { Batdau, Ketthuc, Type, pageSize = 10, pageNumber = 1, query, } = params;
        const ngaygiao = Batdau || Ketthuc
            ? {
                ...(Batdau && { gte: new Date(Batdau) }),
                ...(Ketthuc && { lte: new Date(Ketthuc) }),
            }
            : undefined;
        const where = {
            ...(ngaygiao && { ngaygiao }),
            status: Array.isArray(params.Status)
                ? { in: params.Status }
                : params.Status,
        };
        if (Type && Type !== 'all') {
            where.khachhang = { loaikh: Type };
        }
        if (query) {
            where.OR = [
                { madonhang: { contains: query, mode: 'insensitive' } },
                { khachhang: { name: { contains: query, mode: 'insensitive' } } },
            ];
        }
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
                return {
                    ...item.sanpham,
                    idSP: item.idSP,
                    giaban: item.giaban,
                    sldat: parseFloat((item.sldat ?? 0).toFixed(3)),
                    slgiao: parseFloat((item.slgiao ?? 0).toFixed(3)),
                    slnhan: parseFloat((item.slnhan ?? 0).toFixed(3)),
                    ttdat: parseFloat((item.ttdat ?? 0).toFixed(3)),
                    ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(3)),
                    ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(3)),
                    ghichu: item.ghichu,
                };
            }),
            khachhang: khachhang
                ? (({ banggia, ...rest }) => rest)(khachhang)
                : null,
            name: khachhang?.name,
        }));
        return {
            data: result,
            total,
            pageNumber,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        };
    }
    async congnokhachhang(params) {
        const { Batdau, Ketthuc, query } = params;
        const dateRange = {
            gte: Batdau ? new Date(Batdau) : undefined,
            lte: Ketthuc ? new Date(Ketthuc) : undefined,
        };
        const where = {
            ngaygiao: dateRange,
            status: Array.isArray(params.Status)
                ? { in: params.Status }
                : params.Status,
        };
        if (query) {
            where.OR = [
                { madonhang: { contains: query, mode: 'insensitive' } },
                { khachhang: { name: { contains: query, mode: 'insensitive' } } },
            ];
        }
        const donhangs = await this.prisma.donhang.findMany({
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
        });
        const result = donhangs.map((v) => {
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
                madonhang: v.madonhang,
                ngaygiao: v.ngaygiao,
                tong: tong.toFixed(3),
                soluong: soluong.toFixed(3),
                tongtien: v.tongtien,
                tongvat: v.tongvat,
                name: v.khachhang?.name,
                makh: v.khachhang?.makh,
            };
        });
        return result || [];
    }
    async downloadcongnokhachhang(params) {
        const { Batdau, Ketthuc, query, ids } = params;
        const dateRange = {
            gte: Batdau ? new Date(Batdau) : undefined,
            lte: Ketthuc ? new Date(Ketthuc) : undefined,
        };
        const where = {
            ngaygiao: dateRange,
            status: Array.isArray(params.Status)
                ? { in: params.Status }
                : params.Status,
        };
        if (ids.length > 0) {
            where.id = { in: ids };
        }
        if (query) {
            where.OR = [
                { madonhang: { contains: query, mode: 'insensitive' } },
                { khachhang: { name: { contains: query, mode: 'insensitive' } } },
            ];
        }
        const donhangs = await this.prisma.donhang.findMany({
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
        });
        const Sanphams = await this.prisma.sanpham.findMany();
        const flatItems = donhangs.flatMap((v) => {
            return v.sanpham.map((v1) => {
                const product = Sanphams.find((sp) => sp.id === v1.idSP);
                const giaban = v1.giaban || 0;
                const vat = Number(product?.vat) || 0;
                const thanhtiensauvat = v1.slnhan * giaban * (1 + vat);
                const normalizedDate = v.ngaygiao ?
                    moment(v.ngaygiao).utc().startOf('day').format('YYYY-MM-DD') :
                    'no-date';
                return {
                    id: v.id,
                    ngaygiao: v.ngaygiao,
                    ngaygiaoNormalized: normalizedDate,
                    tenkhachhang: v.khachhang?.name,
                    makhachhang: v.khachhang?.makh,
                    madonhang: v.madonhang,
                    tenhang: product?.title || '',
                    mahang: product?.masp || '',
                    dvt: product?.dvt || '',
                    soluong: v1.slnhan,
                    dongia: giaban,
                    thanhtientruocvat: v1.slnhan * giaban,
                    vat: vat,
                    dongiavathoadon: giaban * (1 + vat),
                    thanhtiensauvat: thanhtiensauvat,
                    ghichu: v1.ghichu,
                };
            });
        });
        const combinationTotals = new Map();
        flatItems.forEach(item => {
            const customerKey = item.makhachhang || 'unknown-customer';
            const dateKey = item.ngaygiaoNormalized;
            const combinationKey = `${customerKey}|${dateKey}`;
            if (!combinationTotals.has(combinationKey)) {
                combinationTotals.set(combinationKey, {
                    tongtiensauvat: 0,
                    itemCount: 0,
                    customerInfo: {
                        makhachhang: item.makhachhang,
                        tenkhachhang: item.tenkhachhang
                    },
                    dateInfo: {
                        ngaygiao: item.ngaygiao,
                        ngaygiaoNormalized: item.ngaygiaoNormalized
                    }
                });
            }
            const combination = combinationTotals.get(combinationKey);
            combination.tongtiensauvat += item.thanhtiensauvat;
            combination.itemCount += 1;
        });
        const result = flatItems.map(item => {
            const customerKey = item.makhachhang || 'unknown-customer';
            const dateKey = item.ngaygiaoNormalized;
            const combinationKey = `${customerKey}|${dateKey}`;
            const combination = combinationTotals.get(combinationKey);
            return {
                ...item,
                tongtiensauvat: combination ? combination.tongtiensauvat : item.thanhtiensauvat,
                _debug: {
                    combinationKey: combinationKey,
                    itemsInCombination: combination?.itemCount || 0
                }
            };
        });
        console.log('=== COMBINATION TOTALS DEBUG ===');
        combinationTotals.forEach((value, key) => {
            console.log(`${key}: ${value.tongtiensauvat} VND (${value.itemCount} items)`);
        });
        console.log('================================');
        console.log('result', result);
        return this.createCongnoExcelFile(result || [], params);
    }
    async createCongnoExcelFile(data, params) {
        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Công Nợ Khách Hàng');
        const columns = [
            { key: 'ngaygiao', header: 'Ngày Giao', width: 15 },
            { key: 'makhachhang', header: 'Mã Khách Hàng', width: 15 },
            { key: 'tenkhachhang', header: 'Tên Khách Hàng', width: 25 },
            { key: 'madonhang', header: 'Mã Đơn Hàng', width: 15 },
            { key: 'mahang', header: 'Mã Hàng', width: 15 },
            { key: 'tenhang', header: 'Tên Hàng', width: 30 },
            { key: 'dvt', header: 'ĐVT', width: 10 },
            { key: 'soluong', header: 'Số Lượng', width: 12 },
            { key: 'dongia', header: 'Đơn Giá', width: 15 },
            { key: 'thanhtientruocvat', header: 'Thành Tiền Trước VAT', width: 20 },
            { key: 'ghichu', header: 'Ghi Chú', width: 20 },
            { key: 'vat', header: 'VAT (%)', width: 10 },
            { key: 'dongiavathoadon', header: 'Đơn Giá VAT', width: 15 },
            { key: 'thanhtiensauvat', header: 'Thành Tiền Sau VAT', width: 20 },
            { key: 'tongtiensauvat', header: 'Tổng Tiền Sau Thuế', width: 20 },
            { key: 'tongcong', header: 'Tổng Cộng Khách Hàng', width: 25 }
        ];
        worksheet.columns = columns;
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '366092' }
        };
        headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
        headerRow.height = 25;
        const groupedData = this.groupDataByCustomerAndDate(data);
        let currentRow = 2;
        const mergeRanges = [];
        for (const customerData of groupedData) {
            const customerStartRow = currentRow;
            for (const dateGroup of customerData.dateGroups) {
                const dateStartRow = currentRow;
                const orderGroups = new Map();
                dateGroup.items.forEach(item => {
                    const orderKey = item.madonhang || 'unknown-order';
                    if (!orderGroups.has(orderKey)) {
                        orderGroups.set(orderKey, []);
                    }
                    orderGroups.get(orderKey).push(item);
                });
                for (const [orderKey, orderItems] of orderGroups) {
                    const orderStartRow = currentRow;
                    for (const item of orderItems) {
                        const row = worksheet.getRow(currentRow);
                        const ngaygiao = item.ngaygiao ? new Date(item.ngaygiao) : null;
                        row.values = {
                            ngaygiao: ngaygiao ? moment(ngaygiao).tz('Asia/Ho_Chi_Minh').format("DD/MM/YYYY") : '',
                            makhachhang: item.makhachhang || '',
                            tenkhachhang: item.tenkhachhang || '',
                            madonhang: item.madonhang || '',
                            mahang: item.mahang || '',
                            tenhang: item.tenhang || '',
                            dvt: item.dvt || '',
                            soluong: Number(item.soluong) || 0,
                            dongia: Number(item.dongia) || 0,
                            thanhtientruocvat: Number(item.thanhtientruocvat) || 0,
                            vat: Number(item.vat) || 0,
                            dongiavathoadon: Number(item.dongiavathoadon) || 0,
                            thanhtiensauvat: Number(item.thanhtiensauvat) || 0,
                            ghichu: item.ghichu || '',
                            tongtiensauvat: Number(item.tongtiensauvat) || 0,
                            tongcong: Number(customerData.tongtiensauvat) || 0
                        };
                        ['soluong', 'dongia', 'thanhtientruocvat', 'dongiavathoadon', 'thanhtiensauvat', 'tongtiensauvat', 'tongcong'].forEach(col => {
                            const cell = row.getCell(col);
                            cell.numFmt = '#,##0.00';
                            cell.alignment = { horizontal: 'right' };
                        });
                        ['vat'].forEach(col => {
                            const cell = row.getCell(col);
                            cell.numFmt = '0.00%';
                            cell.alignment = { horizontal: 'right' };
                        });
                        currentRow++;
                    }
                    const orderEndRow = currentRow - 1;
                    if (orderEndRow > orderStartRow) {
                        const makhachhangColIndex = columns.findIndex(c => c.key === 'makhachhang') + 1;
                        const tenkhachhangColIndex = columns.findIndex(c => c.key === 'tenkhachhang') + 1;
                        const madonhangColIndex = columns.findIndex(c => c.key === 'madonhang') + 1;
                        mergeRanges.push({
                            range: `${String.fromCharCode(64 + makhachhangColIndex)}${orderStartRow}:${String.fromCharCode(64 + makhachhangColIndex)}${orderEndRow}`,
                            value: orderItems[0].makhachhang || ''
                        });
                        mergeRanges.push({
                            range: `${String.fromCharCode(64 + tenkhachhangColIndex)}${orderStartRow}:${String.fromCharCode(64 + tenkhachhangColIndex)}${orderEndRow}`,
                            value: orderItems[0].tenkhachhang || ''
                        });
                        mergeRanges.push({
                            range: `${String.fromCharCode(64 + madonhangColIndex)}${orderStartRow}:${String.fromCharCode(64 + madonhangColIndex)}${orderEndRow}`,
                            value: orderItems[0].madonhang || ''
                        });
                    }
                }
                const dateEndRow = currentRow - 1;
                if (dateEndRow > dateStartRow) {
                    const ngaygiaoColIndex = columns.findIndex(c => c.key === 'ngaygiao') + 1;
                    mergeRanges.push({
                        range: `${String.fromCharCode(64 + ngaygiaoColIndex)}${dateStartRow}:${String.fromCharCode(64 + ngaygiaoColIndex)}${dateEndRow}`,
                        value: dateGroup.items[0].ngaygiao ? moment(dateGroup.items[0].ngaygiao).tz('Asia/Ho_Chi_Minh').format("DD/MM/YYYY") : ''
                    });
                    const tongtiensauvatColIndex = columns.findIndex(c => c.key === 'tongtiensauvat') + 1;
                    mergeRanges.push({
                        range: `${String.fromCharCode(64 + tongtiensauvatColIndex)}${dateStartRow}:${String.fromCharCode(64 + tongtiensauvatColIndex)}${dateEndRow}`,
                        value: dateGroup.items[0].tongtiensauvat
                    });
                }
            }
            const customerEndRow = currentRow - 1;
            if (customerEndRow > customerStartRow) {
                const tongcongColIndex = columns.findIndex(c => c.key === 'tongcong') + 1;
                mergeRanges.push({
                    range: `${String.fromCharCode(64 + tongcongColIndex)}${customerStartRow}:${String.fromCharCode(64 + tongcongColIndex)}${customerEndRow}`,
                    value: customerData.tongtiensauvat
                });
            }
        }
        mergeRanges.forEach(merge => {
            worksheet.mergeCells(merge.range);
            const cell = worksheet.getCell(merge.range.split(':')[0]);
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.font = { bold: true };
        });
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });
        const dateStr = this.formatDateForFilename();
        const filename = `CongNoKhachHang_${dateStr}.xlsx`;
        const buffer = await workbook.xlsx.writeBuffer();
        return {
            buffer: buffer,
            filename: filename,
            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        };
    }
    groupDataByCustomerAndDate(data) {
        const customerMap = new Map();
        data.forEach(item => {
            const customerKey = item.makhachhang || 'unknown-customer';
            if (!customerMap.has(customerKey)) {
                customerMap.set(customerKey, {
                    makhachhang: item.makhachhang,
                    tenkhachhang: item.tenkhachhang,
                    tongtiensauvat: 0,
                    items: [],
                    dateGroups: []
                });
            }
            const customer = customerMap.get(customerKey);
            customer.items.push(item);
        });
        customerMap.forEach(customer => {
            const dateMap = new Map();
            customer.items.forEach(item => {
                const dateKey = item.ngaygiaoNormalized || 'no-date';
                if (!dateMap.has(dateKey)) {
                    dateMap.set(dateKey, {
                        date: item.ngaygiao,
                        dateKey: dateKey,
                        items: [],
                        tongtiensauvat: 0,
                        combinationKey: `${customer.makhachhang}|${dateKey}`
                    });
                }
                const dateGroup = dateMap.get(dateKey);
                dateGroup.items.push(item);
                if (dateGroup.items.length === 1) {
                    dateGroup.tongtiensauvat = Number(item.tongtiensauvat) || 0;
                }
            });
            customer.dateGroups = Array.from(dateMap.values()).sort((a, b) => {
                if (!a.date && !b.date)
                    return 0;
                if (!a.date)
                    return 1;
                if (!b.date)
                    return -1;
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
            customer.tongtiensauvat = customer.dateGroups.reduce((sum, dateGroup) => {
                return sum + dateGroup.tongtiensauvat;
            }, 0);
        });
        return Array.from(customerMap.values()).sort((a, b) => (a.tenkhachhang || '').localeCompare(b.tenkhachhang || ''));
    }
    groupDataByCustomer(data) {
        const customerMap = new Map();
        data.forEach(item => {
            const customerKey = item.makhachhang || 'unknown';
            if (!customerMap.has(customerKey)) {
                customerMap.set(customerKey, {
                    makhachhang: item.makhachhang,
                    tenkhachhang: item.tenkhachhang,
                    tongtiensauvat: 0,
                    items: []
                });
            }
            const customer = customerMap.get(customerKey);
            customer.items.push(item);
            customer.tongtiensauvat += Number(item.thanhtiensauvat) || 0;
        });
        return Array.from(customerMap.values()).sort((a, b) => (a.tenkhachhang || '').localeCompare(b.tenkhachhang || ''));
    }
    async getchogiao(params) {
        const { Batdau, Ketthuc, Type } = params;
        const dateRange = {
            gte: Batdau ? new Date(Batdau) : undefined,
            lte: Ketthuc ? new Date(Ketthuc) : undefined,
        };
        const donhangs = await this.prisma.donhang.findMany({
            where: {
                ngaygiao: dateRange,
            },
            include: {
                sanpham: {
                    include: { sanpham: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        const productMap = new Map();
        for (const dh of donhangs) {
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
            slchogiaott: parseFloat(value.sldat.toFixed(3)),
        }));
    }
    async dongbogia(listdonhang) {
        console.log('Đồng bộ giá cho danh sách đơn hàng:', listdonhang);
        let totalUpdatedCount = 0;
        let totalErrorCount = 0;
        const batchSize = 5;
        for (let i = 0; i < listdonhang.length; i += batchSize) {
            const batch = listdonhang.slice(i, i + batchSize);
            console.log(`Xử lý batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(listdonhang.length / batchSize)} với ${batch.length} đơn hàng`);
            try {
                const batchResult = await this.prisma.$transaction(async (prisma) => {
                    let updatedCount = 0;
                    let errorCount = 0;
                    for (const donhangId of batch) {
                        try {
                            const donhang = await prisma.donhang.findUnique({
                                where: { id: donhangId },
                                include: {
                                    banggia: {
                                        include: {
                                            sanpham: {
                                                include: {
                                                    sanpham: true
                                                }
                                            },
                                        },
                                    },
                                    khachhang: true,
                                    sanpham: {
                                        include: {
                                            sanpham: true
                                        }
                                    },
                                },
                            });
                            if (!donhang) {
                                console.warn(`Đơn hàng ${donhangId} không tồn tại`);
                                errorCount++;
                                continue;
                            }
                            if (!donhang.banggia) {
                                console.warn(`Đơn hàng ${donhang.madonhang} không có bảng giá được chỉ định`);
                                errorCount++;
                                continue;
                            }
                            const banggiaDefault = await prisma.banggia.findUnique({
                                where: { id: DEFAUL_BANGGIA_ID },
                                include: {
                                    sanpham: {
                                        include: {
                                            sanpham: true
                                        }
                                    },
                                },
                            });
                            console.log(`Cập nhật giá cho đơn hàng ${donhang.madonhang} từ bảng giá ${donhang.banggia.mabanggia}`);
                            let tongchua = 0;
                            let hasUpdates = false;
                            for (const donhangSanpham of donhang.sanpham) {
                                const giaSanpham = donhang.banggia.sanpham.find((bgsp) => bgsp.sanphamId === donhangSanpham.idSP);
                                const giaSanphamDefault = banggiaDefault?.sanpham.find((bgsp) => bgsp.sanphamId === donhangSanpham.idSP);
                                let giaban = 0;
                                let giaSource = 'none';
                                if (giaSanpham) {
                                    const giabanFromBanggia = Number(giaSanpham.giaban);
                                    if (giabanFromBanggia > 0) {
                                        giaban = giabanFromBanggia;
                                        giaSource = `bảng giá ${donhang.banggia.mabanggia}`;
                                    }
                                    else if (giaSanphamDefault && Number(giaSanphamDefault.giaban) > 0) {
                                        giaban = Number(giaSanphamDefault.giaban);
                                        giaSource = 'bảng giá mặc định (fallback do giá = 0)';
                                    }
                                    else {
                                        giaban = 0;
                                        giaSource = 'không tìm thấy giá hợp lệ (trả về 0)';
                                    }
                                }
                                else if (giaSanphamDefault && Number(giaSanphamDefault.giaban) > 0) {
                                    giaban = Number(giaSanphamDefault.giaban);
                                    giaSource = 'bảng giá mặc định (không có trong bảng giá chỉ định)';
                                }
                                else {
                                    giaban = 0;
                                    giaSource = 'không tìm thấy trong cả 2 bảng giá (trả về 0)';
                                }
                                if (giaban > 0) {
                                    const sldat = Number(donhangSanpham.sldat) || 0;
                                    const slgiao = Number(donhangSanpham.slgiao) || 0;
                                    const slnhan = Number(donhangSanpham.slnhan) || 0;
                                    const vat = Number(donhangSanpham.vat) || 0;
                                    const ttdat = giaban * sldat;
                                    const ttgiao = giaban * slgiao;
                                    const ttnhan = giaban * slnhan;
                                    const ttsauvat = ttnhan * (1 + vat);
                                    await prisma.donhangsanpham.update({
                                        where: { id: donhangSanpham.id },
                                        data: {
                                            giaban: giaban,
                                            ttdat: ttdat,
                                            ttgiao: ttgiao,
                                            ttnhan: ttnhan,
                                            ttsauvat: ttsauvat,
                                        },
                                    });
                                    tongchua += ttnhan;
                                    hasUpdates = true;
                                    console.log(`✅ Cập nhật sản phẩm ${donhangSanpham.sanpham?.title} - Giá: ${giaban} (từ ${giaSource})`);
                                }
                                else {
                                    console.warn(`⚠️ Sản phẩm ${donhangSanpham.sanpham?.title} - ${giaSource}, giữ nguyên giá cũ`);
                                }
                            }
                            if (hasUpdates) {
                                const vatRate = Number(donhang.vat) || 0;
                                const tongvat = tongchua * (vatRate);
                                const tongtien = tongchua + tongvat;
                                await prisma.donhang.update({
                                    where: { id: donhangId },
                                    data: {
                                        tongvat: tongvat,
                                        tongtien: tongtien,
                                    },
                                });
                                console.log(`Cập nhật tổng tiền đơn hàng ${donhang.madonhang}: Tổng chưa VAT: ${tongchua}, VAT: ${tongvat}, Tổng tiền: ${tongtien}`);
                            }
                            updatedCount++;
                        }
                        catch (error) {
                            console.error(`Lỗi khi cập nhật đơn hàng ${donhangId}:`, error);
                            errorCount++;
                        }
                    }
                    return { updatedCount, errorCount };
                }, {
                    maxWait: 15000,
                    timeout: 12000,
                });
                totalUpdatedCount += batchResult.updatedCount;
                totalErrorCount += batchResult.errorCount;
                console.log(`Hoàn thành batch: ${batchResult.updatedCount} thành công, ${batchResult.errorCount} lỗi`);
                if (i + batchSize < listdonhang.length) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            catch (error) {
                console.error(`Lỗi khi xử lý batch từ ${i} đến ${i + batchSize - 1}:`, error);
                totalErrorCount += batch.length;
            }
        }
        return {
            status: 'success',
            message: `Đã đồng bộ giá thành công cho ${totalUpdatedCount} đơn hàng${totalErrorCount > 0 ? `, ${totalErrorCount} đơn hàng lỗi` : ''}`,
            updatedCount: totalUpdatedCount,
            errorCount: totalErrorCount,
            totalProcessed: listdonhang.length,
        };
    }
    async phieuchuyen(params) {
        const { Batdau, Ketthuc, Type } = params;
        const dateRange = {
            gte: Batdau ? new Date(Batdau) : undefined,
            lte: Ketthuc ? new Date(Ketthuc) : undefined,
        };
        const result = await this.prisma.donhang.findMany({
            where: {
                ngaygiao: dateRange,
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
            name: khachhang?.name,
            diachi: khachhang?.diachi,
            sdt: khachhang?.sdt,
            gionhanhang: khachhang?.gionhanhang,
            tongsomon: sanpham.length,
            soluongtt: parseFloat(sanpham
                .reduce((total, item) => total + Number(item.slgiao || 0), 0)
                .toFixed(3)),
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
                khachhang: true,
                banggia: { select: { id: true, title: true, mabanggia: true } },
            },
        });
        if (!result) {
            throw new common_1.NotFoundException('DonHang not found');
        }
        return {
            ...result,
            sanpham: result.sanpham.map((item) => {
                return {
                    ...item.sanpham,
                    idSP: item.idSP,
                    giaban: item.giaban,
                    sldat: parseFloat((item.sldat ?? 0).toFixed(3)),
                    slgiao: parseFloat((item.slgiao ?? 0).toFixed(3)),
                    slnhan: parseFloat((item.slnhan ?? 0).toFixed(3)),
                    ttdat: parseFloat((item.ttdat ?? 0).toFixed(3)),
                    ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(3)),
                    ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(3)),
                    vat: parseFloat((item.vat ?? 0).toFixed(3)),
                    ttsauvat: parseFloat((item.ttnhan * (1 + (item.vat || 0))).toFixed(3)),
                    ghichu: item.ghichu,
                };
            })
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
                return {
                    ...item.sanpham,
                    idSP: item.idSP,
                    giaban: item.giaban,
                    sldat: parseFloat((item.sldat ?? 0).toFixed(3)),
                    slgiao: parseFloat((item.slgiao ?? 0).toFixed(3)),
                    slnhan: parseFloat((item.slnhan ?? 0).toFixed(3)),
                    ttdat: parseFloat((item.ttdat ?? 0).toFixed(3)),
                    ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(3)),
                    ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(3)),
                    ghichu: item.ghichu,
                };
            }),
            name: donhang.khachhang?.name,
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
                return {
                    ...item.sanpham,
                    idSP: item.idSP,
                    giaban: item.giaban,
                    sldat: parseFloat((item.sldat ?? 0).toFixed(3)),
                    slgiao: parseFloat((item.slgiao ?? 0).toFixed(3)),
                    slnhan: parseFloat((item.slnhan ?? 0).toFixed(3)),
                    ttdat: parseFloat((item.ttdat ?? 0).toFixed(3)),
                    ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(3)),
                    ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(3)),
                    ghichu: item.ghichu,
                };
            }),
            khachhang: donhang.khachhang
                ? (({ banggia, ...rest }) => rest)(donhang.khachhang)
                : null,
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
                return {
                    ...item.sanpham,
                    idSP: item.idSP,
                    giaban: item.giaban,
                    sldat: parseFloat((item.sldat ?? 0).toFixed(3)),
                    slgiao: parseFloat((item.slgiao ?? 0).toFixed(3)),
                    slnhan: parseFloat((item.slnhan ?? 0).toFixed(3)),
                    slhuy: parseFloat((item.slhuy ?? 0).toFixed(3)),
                    ttdat: parseFloat((item.ttdat ?? 0).toFixed(3)),
                    ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(3)),
                    ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(3)),
                    ghichu: item.ghichu,
                };
            }),
        };
        return result;
    }
    async ImportDonhangOld(dulieu) {
        const rawData = await Promise.all(dulieu.map(async (v) => {
            try {
                const mappedSanpham = await Promise.all(v.sanpham.map(async (item) => {
                    try {
                        const sp = await this.prisma.sanpham.findFirst({
                            where: { masp: item.ItemCode },
                        });
                        if (!sp) {
                            console.warn(`Sản phẩm với mã ${item.ItemCode} không tồn tại, bỏ qua`);
                            return null;
                        }
                        return {
                            id: sp.id,
                            sldat: parseFloat((item.Quantity ?? 0).toFixed(3)),
                            slgiao: parseFloat((item.Quantity ?? 0).toFixed(3)),
                            slnhan: parseFloat((item.Quantity ?? 0).toFixed(3)),
                            slhuy: 0,
                            ttdat: 0,
                            ttgiao: 0,
                            ttnhan: 0,
                            ghichu: item.Remark || '',
                        };
                    }
                    catch (error) {
                        console.warn(`Lỗi xử lý sản phẩm ${item.ItemCode}, bỏ qua:`, error, item);
                        return null;
                    }
                }));
                const validSanpham = mappedSanpham.filter((item) => item !== null);
                if (validSanpham.length === 0) {
                    console.warn(`Đơn hàng ${v.tenkh} không có sản phẩm hợp lệ, bỏ qua`);
                    return null;
                }
                return {
                    title: `Import ${v.tenkh} - ${this.formatDateUnderscored()}`,
                    type: 'donsi',
                    ngaygiao: new Date(v.ngaygiao) || new Date(),
                    khachhangId: v.khachhangId,
                    sanpham: validSanpham,
                    originalData: v,
                };
            }
            catch (error) {
                console.warn(`Lỗi xử lý đơn hàng ${v.tenkh}, bỏ qua:`, error);
                return null;
            }
        }));
        const validRawData = rawData.filter((item) => item !== null);
        const duplicateChecks = [];
        const processResults = {
            success: 0,
            fail: 0,
            skip: 0,
            duplicates: [],
            errors: []
        };
        for (const order of validRawData) {
            try {
                if (!order || !order.khachhangId || !order.ngaygiao) {
                    processResults.fail++;
                    processResults.errors.push({
                        customer: order?.originalData?.tenkh || 'Unknown',
                        error: 'Missing required data (khachhangId or ngaygiao)'
                    });
                    continue;
                }
                const startOfDay = this.getStartOfDay(order.ngaygiao);
                const endOfDay = this.getEndOfDay(order.ngaygiao);
                const existingOrders = await this.prisma.donhang.findMany({
                    where: {
                        khachhangId: order.khachhangId,
                        ngaygiao: {
                            gte: startOfDay,
                            lte: endOfDay
                        },
                    },
                    include: {
                        sanpham: true,
                        khachhang: true
                    },
                });
                if (existingOrders.length > 0) {
                    duplicateChecks.push({
                        order: order,
                        existingOrders: existingOrders,
                        customerName: order.originalData?.tenkh || 'Unknown',
                        deliveryDate: order.ngaygiao,
                        newProductCount: order.sanpham.length,
                        existingProductCounts: existingOrders.map(eo => eo.sanpham.length)
                    });
                }
                else {
                    try {
                        await this.create(order);
                        processResults.success++;
                    }
                    catch (createError) {
                        console.error(`Lỗi tạo đơn hàng cho ${order.originalData?.tenkh}:`, createError);
                        processResults.fail++;
                        processResults.errors.push({
                            customer: order.originalData?.tenkh,
                            error: createError.message || 'Unknown error'
                        });
                    }
                }
            }
            catch (checkError) {
                console.error(`Lỗi kiểm tra đơn hàng cho ${order.originalData?.tenkh}:`, checkError);
                processResults.fail++;
                processResults.errors.push({
                    customer: order.originalData?.tenkh,
                    error: checkError.message || 'Check error'
                });
            }
        }
        if (duplicateChecks.length > 0) {
            return {
                status: 'duplicates_found',
                message: `Tìm thấy ${duplicateChecks.length} đơn hàng trùng ngày giao`,
                duplicates: duplicateChecks.map(dup => ({
                    customerName: dup.customerName,
                    deliveryDate: dup.deliveryDate,
                    newProductCount: dup.newProductCount,
                    existingOrderCount: dup.existingOrders.length,
                    existingProductCounts: dup.existingProductCounts
                })),
                processResults,
                pendingOrders: duplicateChecks.map(dup => dup.order)
            };
        }
        return {
            status: 'completed',
            message: `Import hoàn tất: ${processResults.success} thành công, ${processResults.fail} thất bại`,
            ...processResults
        };
    }
    async ImportDonhangOldConfirmed(pendingOrders, userChoice) {
        const processResults = {
            success: 0,
            fail: 0,
            skip: 0,
            errors: []
        };
        if (userChoice === 'skip') {
            processResults.skip = pendingOrders.length;
            return {
                status: 'skipped',
                message: `Đã bỏ qua ${pendingOrders.length} đơn hàng trùng lặp`,
                ...processResults
            };
        }
        for (const order of pendingOrders) {
            try {
                await this.create(order);
                processResults.success++;
            }
            catch (createError) {
                console.error(`Lỗi tạo đơn hàng cho ${order.originalData?.tenkh}:`, createError);
                processResults.fail++;
                processResults.errors.push({
                    customer: order.originalData?.tenkh,
                    error: createError.message || 'Unknown error'
                });
            }
        }
        return {
            status: 'completed',
            message: `Import hoàn tất: ${processResults.success} thành công, ${processResults.fail} thất bại`,
            ...processResults
        };
    }
    async ImportDonhang(data) {
        const acc = {};
        for (const curr of data) {
            if (!acc[curr.makh]) {
                const khachhang = await this.prisma.khachhang.findFirst({
                    where: { makh: curr.makh },
                });
                acc[curr.makh] = {
                    title: `Import ${this.formatDateUnderscored()}`,
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
            const sanphamRecord = await this.prisma.sanpham.findFirst({
                where: { masp: curr.masp },
            });
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
    async DonhangcodeToNumber(code) {
        if (!code.match(/^TG-[A-Z]{2}\d{5}$/)) {
            throw new Error('Mã không đúng định dạng TG-XXYYYYY');
        }
        const letters = code.slice(3, 5);
        const number = parseInt(code.slice(5), 10);
        const letterValue = (letters.charCodeAt(0) - 65) * 26 + (letters.charCodeAt(1) - 65);
        return letterValue * 100000 + number;
    }
    async DonhangnumberToCode(number) {
        if (number < 1 || number > 676 * 100000) {
            throw new Error('Số thứ tự không hợp lệ');
        }
        const letterValue = Math.floor(number / 100000);
        const numValue = number % 100000;
        const firstLetter = String.fromCharCode(65 + Math.floor(letterValue / 26));
        const secondLetter = String.fromCharCode(65 + (letterValue % 26));
        const numStr = numValue.toString().padStart(5, '0');
        return `TG-${firstLetter}${secondLetter}${numStr}`;
    }
    calculateDonhangTotals(sanpham, vatRate = 0.05) {
        const tong = sanpham.reduce((total, sp) => {
            const giaban = parseFloat((sp.giaban || 0).toString());
            const slnhan = parseFloat((sp.slnhan || 0).toString());
            return total + (giaban * slnhan);
        }, 0);
        const tongvat = tong * vatRate;
        const tongtien = tong + tongvat;
        return { tong, tongvat, tongtien };
    }
    async create(dto) {
        const maxOrderResult = await this.prisma.donhang.aggregate({
            _max: {
                order: true,
            },
        });
        let maxOrder = maxOrderResult._max.order || 0;
        let madonhang = await this.DonhangnumberToCode(maxOrder + 1);
        let existingDonhang = await this.prisma.donhang.findUnique({ where: { madonhang } });
        while (existingDonhang) {
            maxOrder++;
            madonhang = await this.DonhangnumberToCode(maxOrder + 1);
            existingDonhang = await this.prisma.donhang.findUnique({
                where: { madonhang },
            });
        }
        return this.prisma.$transaction(async (prisma) => {
            const khachhang = await prisma.khachhang.findUnique({
                where: { id: dto.khachhangId },
                include: { banggia: true },
            });
            if (!khachhang) {
                throw new common_1.NotFoundException('Khách hàng không tồn tại');
            }
            const newDonhang = await prisma.donhang.create({
                data: {
                    title: dto.title,
                    type: dto.type || 'donsi',
                    madonhang: madonhang,
                    ngaygiao: new Date(dto.ngaygiao),
                    khachhangId: dto.khachhangId,
                    banggiaId: dto.banggiaId || khachhang.banggiaId || DEFAUL_BANGGIA_ID,
                    vat: parseFloat((dto.vat || 0.05).toString()),
                    isActive: dto.isActive,
                    order: maxOrder + 1,
                    ghichu: dto.ghichu,
                    isshowvat: khachhang.isshowvat,
                    sanpham: {
                        create: (() => {
                            let sanphamArray;
                            if (Array.isArray(dto?.sanpham)) {
                                sanphamArray = dto.sanpham;
                            }
                            else if (dto?.sanpham?.create && Array.isArray(dto.sanpham.create)) {
                                sanphamArray = dto.sanpham.create;
                            }
                            else {
                                sanphamArray = [];
                            }
                            return sanphamArray.map((sp) => ({
                                idSP: sp.idSP || sp.id,
                                giaban: parseFloat((sp.giaban || 0).toString()),
                                ghichu: sp.ghichu,
                                sldat: parseFloat((sp.sldat ?? 0).toString()),
                                slgiao: parseFloat((sp.slgiao ?? 0).toString()),
                                slnhan: parseFloat((sp.slnhan ?? 0).toString()),
                                slhuy: parseFloat((sp.slhuy ?? 0).toString()),
                                ttdat: parseFloat((sp.ttdat ?? 0).toString()),
                                ttgiao: parseFloat((sp.ttgiao ?? 0).toString()),
                                ttnhan: parseFloat((sp.ttnhan ?? 0).toString()),
                                vat: parseFloat((sp.vat ?? 0).toString()),
                                ttsauvat: parseFloat((sp.ttsauvat ?? 0).toString()),
                                order: sp.order || 1,
                                isActive: sp.isActive !== undefined ? sp.isActive : true,
                            }));
                        })()
                    },
                },
                include: {
                    sanpham: true,
                },
            });
            const vatRate = parseFloat((dto.vat || 0.05).toString());
            const banggia = await prisma.banggia.findUnique({
                where: { id: dto.banggiaId || khachhang.banggiaId || DEFAUL_BANGGIA_ID },
                include: { sanpham: true },
            });
            const banggiaDefault = await prisma.banggia.findUnique({
                where: { id: DEFAUL_BANGGIA_ID },
                include: { sanpham: true },
            });
            const updatedSanpham = dto?.sanpham?.map((sp) => {
                const giaSanpham = banggia?.sanpham.find(bgsp => bgsp.sanphamId === (sp.idSP || sp.id));
                const giaSanphamDefault = banggiaDefault?.sanpham.find(bgsp => bgsp.sanphamId === (sp.idSP || sp.id));
                let giaban = parseFloat((sp.giaban || 0).toString());
                if (giaSanpham) {
                    const giabanFromBanggia = parseFloat(giaSanpham.giaban.toString());
                    if (giabanFromBanggia === 0 && giaSanphamDefault) {
                        giaban = parseFloat(giaSanphamDefault.giaban.toString());
                    }
                    else {
                        giaban = giabanFromBanggia;
                    }
                }
                else if (giaSanphamDefault) {
                    giaban = parseFloat(giaSanphamDefault.giaban.toString());
                }
                const slnhan = parseFloat((sp.slnhan ?? 0).toString());
                const vat = parseFloat((sp.vat ?? 0).toString());
                return {
                    ...sp,
                    giaban: giaban,
                    ttdat: giaban * parseFloat((sp.sldat ?? 0).toString()),
                    ttgiao: giaban * parseFloat((sp.slgiao ?? 0).toString()),
                    ttnhan: giaban * slnhan,
                    ttsauvat: (giaban * slnhan) * (1 + vat),
                };
            }) || [];
            if (updatedSanpham.length > 0) {
                await Promise.all(updatedSanpham.map(async (sp) => {
                    await prisma.donhangsanpham.updateMany({
                        where: {
                            donhangId: newDonhang.id,
                            idSP: sp.idSP || sp.id
                        },
                        data: {
                            giaban: sp.giaban,
                            ttdat: sp.ttdat,
                            ttgiao: sp.ttgiao,
                            ttnhan: sp.ttnhan,
                            ttsauvat: sp.ttsauvat,
                        },
                    });
                }));
            }
            const { tongvat, tongtien } = this.calculateDonhangTotals(updatedSanpham, vatRate);
            await prisma.donhang.update({
                where: { id: newDonhang.id },
                data: {
                    tongvat: tongvat,
                    tongtien: tongtien,
                },
            });
            for (const sp of dto.sanpham) {
                const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(3));
                await prisma.tonKho.upsert({
                    where: { sanphamId: sp.idSP || sp.id },
                    update: {
                        slchogiao: { increment: incrementValue },
                    },
                    create: {
                        sanphamId: sp.idSP || sp.id,
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
            if (data.status && data.status !== oldDonhang.status) {
                const transition = this.statusMachine.validateTransition('donhang', oldDonhang.status, data.status, true);
                if (!transition.isValid) {
                    throw new common_1.BadRequestException(`Invalid status transition: ${oldDonhang.status} → ${data.status}. ${transition.reason}`);
                }
            }
            const tonkhoOps = [];
            if (oldDonhang.status === 'dagiao' && data.status === 'dadat') {
                for (const sp of oldDonhang.sanpham) {
                    const incValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
                    tonkhoOps.push({
                        sanphamId: sp.idSP,
                        operation: 'increment',
                        slchogiao: incValue,
                        slton: incValue,
                        reason: `Rollback DAGIAO→DADAT for order ${oldDonhang.madonhang}`
                    });
                }
                await this.tonkhoManager.updateTonkhoAtomic(tonkhoOps);
                const maphieuOld = `PX-${oldDonhang.madonhang}`;
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
                                            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                                        },
                                    })),
                                },
                            }
                            : {}),
                    },
                });
                for (const sp of data.sanpham) {
                    const newSlgiao = parseFloat((sp.slgiao ?? 0).toFixed(3));
                    const oldItem = oldDonhang.sanpham.find((o) => o.idSP === sp.id);
                    const oldSlgiao = oldItem
                        ? parseFloat((oldItem.slgiao ?? 0).toFixed(3))
                        : 0;
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
                    const newSldat = parseFloat((sp.sldat ?? 0).toFixed(3));
                    const oldItem = oldDonhang.sanpham.find((o) => o.idSP === sp.id);
                    if (oldItem) {
                        const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(3));
                        const difference = newSldat - oldSldat;
                        if (difference !== 0) {
                            await prisma.tonKho.update({
                                where: { sanphamId: sp.id },
                                data: {
                                    slchogiao: difference > 0
                                        ? { increment: difference }
                                        : { decrement: Math.abs(difference) },
                                },
                            });
                        }
                    }
                    else {
                        await prisma.tonKho.update({
                            where: { sanphamId: sp.id },
                            data: {
                                slchogiao: { increment: newSldat },
                            },
                        });
                    }
                }
                for (const oldItem of oldDonhang.sanpham) {
                    const exists = data.sanpham.find((sp) => sp.id === oldItem.idSP);
                    if (!exists) {
                        const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(3));
                        await prisma.tonKho.update({
                            where: { sanphamId: oldItem.idSP },
                            data: {
                                slchogiao: { decrement: oldSldat },
                            },
                        });
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
                                    deleteMany: {},
                                    createMany: {
                                        data: data.sanpham.map((sp) => ({
                                            idSP: sp.id,
                                            ghichu: sp.ghichu,
                                            sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                                            slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                                            ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
                                        })),
                                    },
                                },
                            }
                            : {}),
                    },
                });
            }
            if (oldDonhang.status === 'dadat' && data.status === 'dagiao') {
                for (const sp of data.sanpham) {
                    const decValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
                    await this.updateTonKhoSafe(prisma, sp.id, {
                        slchogiao: { decrement: decValue },
                        slton: { decrement: decValue },
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
                            soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                            ghichu: sp.ghichu,
                        })),
                    },
                };
                const existingPhieu = await prisma.phieuKho.findUnique({
                    where: { maphieu: maphieuNew },
                    include: { sanpham: true },
                });
                if (existingPhieu) {
                    await prisma.phieuKhoSanpham.deleteMany({
                        where: { phieuKhoId: existingPhieu.id },
                    });
                    await prisma.phieuKho.update({
                        where: { maphieu: maphieuNew },
                        data: {
                            ngay: phieuPayload.ngay,
                            type: phieuPayload.type,
                            khoId: phieuPayload.khoId,
                            ghichu: phieuPayload.ghichu,
                            isActive: phieuPayload.isActive,
                            sanpham: {
                                create: data.sanpham.map((sp) => ({
                                    sanphamId: sp.id,
                                    soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                                    ghichu: sp.ghichu,
                                })),
                            },
                        },
                    });
                }
                else {
                    const uniqueSanpham = data.sanpham.reduce((acc, sp) => {
                        const existing = acc.find((item) => item.sanphamId === sp.id);
                        if (existing) {
                            existing.soluong += parseFloat((sp.slgiao ?? 0).toFixed(3));
                        }
                        else {
                            acc.push({
                                sanphamId: sp.id,
                                soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                                ghichu: sp.ghichu,
                            });
                        }
                        return acc;
                    }, []);
                    await prisma.phieuKho.create({
                        data: {
                            maphieu: maphieuNew,
                            ngay: phieuPayload.ngay,
                            type: phieuPayload.type,
                            khoId: phieuPayload.khoId,
                            ghichu: phieuPayload.ghichu,
                            isActive: phieuPayload.isActive,
                            sanpham: {
                                create: uniqueSanpham,
                            },
                        },
                    });
                }
                return prisma.donhang.update({
                    where: { id },
                    data: {
                        status: 'dagiao',
                        sanpham: {
                            updateMany: data.sanpham.map((sp) => ({
                                where: { idSP: sp.id },
                                data: {
                                    ghichu: sp.ghichu,
                                    sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                    slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                                    slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                                },
                            })),
                        },
                    },
                });
            }
            if (oldDonhang.status === 'dagiao' && data.status === 'danhan') {
                const shortageItems = [];
                for (const item of data.sanpham) {
                    const receivedQty = parseFloat((item.slnhan ?? 0).toFixed(3));
                    const shippedQty = parseFloat((item.slgiao ?? 0).toFixed(3));
                    if (receivedQty < shippedQty) {
                        const shortage = shippedQty - receivedQty;
                        await prisma.tonKho.update({
                            where: { sanphamId: item.id },
                            data: { slton: { increment: shortage } },
                        });
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
                    const maphieuNhap = `PN-${data.madonhang}-RET-${this.formatDateForFilename()}`;
                    const phieuKhoData = {
                        maphieu: maphieuNhap,
                        ngay: new Date(data.ngaygiao),
                        type: 'nhap',
                        khoId: DEFAUL_KHO_ID,
                        ghichu: 'Phiếu nhập hàng trả về do thiếu hàng khi nhận',
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
                return prisma.donhang.update({
                    where: { id },
                    data: {
                        status: 'danhan',
                        sanpham: {
                            updateMany: data.sanpham.map((item) => {
                                const delivered = parseFloat((item.slgiao ?? 0).toFixed(3));
                                const received = parseFloat((item.slnhan ?? 0).toFixed(3));
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
            if (data.status === 'hoanthanh') {
                return prisma.donhang.update({
                    where: { id },
                    data: {
                        status: 'hoanthanh',
                    },
                });
            }
            if (oldDonhang.status === 'danhan' && data.status === 'dadat') {
                for (const sp of oldDonhang.sanpham) {
                    const incValue = parseFloat((sp.slnhan ?? 0).toFixed(3));
                    await prisma.tonKho.update({
                        where: { sanphamId: sp.idSP },
                        data: {
                            slchogiao: { increment: incValue },
                            slton: { increment: incValue },
                        },
                    });
                }
                const maphieuNhap = `PN-${oldDonhang.madonhang}-RET-${this.formatDateForFilename()}`;
                const phieuNhap = await prisma.phieuKho.findUnique({
                    where: { maphieu: maphieuNhap },
                });
                if (phieuNhap) {
                    await prisma.phieuKhoSanpham.deleteMany({
                        where: { phieuKhoId: phieuNhap.id },
                    });
                    await prisma.phieuKho.delete({
                        where: { maphieu: maphieuNhap },
                    });
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
                                            sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                                            slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                                            ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
                                            ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(3)),
                                        },
                                    })),
                                },
                            }
                            : {}),
                    },
                });
                return updatedOrder;
            }
            if (oldDonhang.status === 'dadat' && data.status === 'dagiao') {
                const tonkhoOpsGiao = [];
                for (const sp of data.sanpham) {
                    const decValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
                    tonkhoOpsGiao.push({
                        sanphamId: sp.id,
                        operation: 'decrement',
                        slchogiao: decValue,
                        slton: decValue,
                        reason: `DADAT→DAGIAO for order ${data.madonhang}`
                    });
                }
                await this.tonkhoManager.updateTonkhoAtomic(tonkhoOpsGiao);
                const maphieuNew = `PX-${data.madonhang}`;
                const existingPhieu = await prisma.phieuKho.findUnique({
                    where: { maphieu: maphieuNew }
                });
                if (!existingPhieu) {
                    await prisma.phieuKho.create({
                        data: {
                            maphieu: maphieuNew,
                            ngay: new Date(data.ngaygiao),
                            type: 'xuat',
                            khoId: DEFAUL_KHO_ID,
                            ghichu: data.ghichu || 'Phiếu xuất hàng cho đơn hàng',
                            isActive: data.isActive ?? true,
                            sanpham: {
                                create: data.sanpham.map((sp) => ({
                                    sanphamId: sp.id,
                                    soluong: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                                    ghichu: sp.ghichu,
                                })),
                            },
                        },
                    });
                }
                return prisma.donhang.update({
                    where: { id },
                    data: {
                        ...data,
                        status: 'dagiao',
                        ngaygiao: new Date(data.ngaygiao),
                        sanpham: {
                            updateMany: data.sanpham.map((sp) => ({
                                where: { idSP: sp.id },
                                data: {
                                    slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                                    ghichu: sp.ghichu,
                                },
                            })),
                        },
                    },
                });
            }
            if (oldDonhang.status === 'dagiao' && data.status === 'danhan') {
                const tonkhoOpsNhan = [];
                const shortageItems = [];
                for (const item of data.sanpham) {
                    const receivedQty = parseFloat((item.slnhan ?? 0).toFixed(3));
                    const shippedQty = parseFloat((item.slgiao ?? 0).toFixed(3));
                    if (receivedQty < shippedQty) {
                        const shortage = shippedQty - receivedQty;
                        tonkhoOpsNhan.push({
                            sanphamId: item.id,
                            operation: 'increment',
                            slton: shortage,
                            reason: `Shortage return for order ${data.madonhang}: ${shortage.toFixed(3)}`
                        });
                        shortageItems.push({
                            sanphamId: item.id,
                            soluong: shortage,
                            ghichu: item.ghichu
                                ? `${item.ghichu}; thiếu ${shortage.toFixed(3)}`
                                : `Thiếu ${shortage.toFixed(3)}`,
                        });
                    }
                }
                if (tonkhoOpsNhan.length > 0) {
                    await this.tonkhoManager.updateTonkhoAtomic(tonkhoOpsNhan);
                }
                if (shortageItems.length > 0) {
                    const maphieuNhap = `PN-${data.madonhang}-RET-${this.formatDateForFilename()}`;
                    await prisma.phieuKho.create({
                        data: {
                            maphieu: maphieuNhap,
                            ngay: new Date(data.ngaygiao),
                            type: 'nhap',
                            khoId: DEFAUL_KHO_ID,
                            ghichu: 'Phiếu nhập hàng trả về do thiếu hàng khi nhận',
                            isActive: data.isActive ?? true,
                            sanpham: {
                                create: shortageItems,
                            },
                        },
                    });
                }
                return prisma.donhang.update({
                    where: { id },
                    data: {
                        ...data,
                        status: 'danhan',
                        sanpham: {
                            updateMany: data.sanpham.map((sp) => ({
                                where: { idSP: sp.id },
                                data: {
                                    slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                                    ghichu: sp.ghichu,
                                },
                            })),
                        },
                    },
                });
            }
            if (oldDonhang.status === 'danhan' && data.status === 'hoanthanh') {
                return prisma.donhang.update({
                    where: { id },
                    data: {
                        status: 'hoanthanh',
                    },
                });
            }
            if (data.status === 'huy') {
                const tonkhoOpsCancel = [];
                if (oldDonhang.status === 'dadat') {
                    for (const sp of oldDonhang.sanpham) {
                        const incValue = parseFloat((sp.sldat ?? 0).toFixed(3));
                        tonkhoOpsCancel.push({
                            sanphamId: sp.idSP,
                            operation: 'decrement',
                            slchogiao: incValue,
                            reason: `Cancel order ${oldDonhang.madonhang} from DADAT`
                        });
                    }
                }
                else if (oldDonhang.status === 'dagiao') {
                    for (const sp of oldDonhang.sanpham) {
                        const incValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
                        tonkhoOpsCancel.push({
                            sanphamId: sp.idSP,
                            operation: 'increment',
                            slchogiao: incValue,
                            slton: incValue,
                            reason: `Cancel order ${oldDonhang.madonhang} from DAGIAO`
                        });
                    }
                }
                if (tonkhoOpsCancel.length > 0) {
                    await this.tonkhoManager.updateTonkhoAtomic(tonkhoOpsCancel);
                }
                const maphieu = `PX-${oldDonhang.madonhang}`;
                const existingPhieu = await prisma.phieuKho.findUnique({
                    where: { maphieu }
                });
                if (existingPhieu) {
                    await prisma.phieuKhoSanpham.deleteMany({
                        where: { phieuKhoId: existingPhieu.id }
                    });
                    await prisma.phieuKho.delete({
                        where: { id: existingPhieu.id }
                    });
                }
                return prisma.donhang.update({
                    where: { id },
                    data: {
                        status: 'huy',
                        ghichu: data.ghichu || 'Đơn hàng đã hủy',
                    },
                });
            }
            if (!data.status || data.status === oldDonhang.status) {
                const updatedDonhang = await prisma.donhang.update({
                    where: { id },
                    data: {
                        title: data.title,
                        type: data.type,
                        ngaygiao: new Date(data.ngaygiao),
                        khachhangId: data.khachhangId,
                        banggiaId: data.banggiaId,
                        vat: data.vat ? parseFloat(data.vat.toString()) : undefined,
                        isActive: data.isActive,
                        order: data.order,
                        ghichu: data.ghichu,
                        status: data.status,
                    },
                    include: {
                        sanpham: true,
                    },
                });
                if (data.sanpham || data.vat) {
                    const sanphamForCalculation = data.sanpham || updatedDonhang.sanpham.map(sp => ({
                        giaban: sp.giaban,
                        slnhan: sp.slnhan
                    }));
                    const vatRate = data.vat ? parseFloat(data.vat.toString()) : parseFloat(updatedDonhang.vat.toString());
                    const { tongvat, tongtien } = this.calculateDonhangTotals(sanphamForCalculation, vatRate);
                    await prisma.donhang.update({
                        where: { id },
                        data: {
                            tongvat,
                            tongtien,
                        },
                    });
                }
                return updatedDonhang;
            }
            throw new Error(`Invalid status transition from ${oldDonhang.status} to ${data.status}`);
        });
    }
    async danhan(id, data) {
        return this.update(id, { ...data, status: 'danhan' });
    }
    async dagiao(id, data) {
        return this.update(id, { ...data, status: 'dagiao' });
    }
    async updatePhieugiao(id, data) {
        try {
            return await this.prisma.$transaction(async (prisma) => {
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
                        isshowvat: data.isshowvat,
                    },
                    include: {
                        sanpham: true,
                    },
                });
                const currentSanpham = await prisma.donhangsanpham.findMany({
                    where: { donhangId: id },
                    select: { idSP: true }
                });
                const currentSanphamIds = currentSanpham.map(sp => sp.idSP);
                const newSanphamIds = data.sanpham.map((sp) => sp.id);
                const sanphamToDelete = currentSanphamIds.filter(spId => !newSanphamIds.includes(spId));
                if (sanphamToDelete.length > 0) {
                    await prisma.donhangsanpham.deleteMany({
                        where: {
                            donhangId: id,
                            idSP: {
                                in: sanphamToDelete
                            }
                        }
                    });
                }
                for (const sp of data.sanpham) {
                    await prisma.donhangsanpham.updateMany({
                        where: {
                            donhangId: id,
                            idSP: sp.id
                        },
                        data: {
                            ghichu: sp.ghichu,
                            sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                            slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                            ttdat: parseFloat((sp.ttdat ?? 0).toFixed(3)),
                            ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
                            ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(3)),
                            vat: parseFloat((sp.vat ?? 0).toFixed(3)),
                            ttsauvat: parseFloat((sp.ttsauvat ?? 0).toFixed(3)),
                        },
                    });
                }
                return updatedDonhang;
            });
        }
        catch (error) {
            console.error('Error updating phieugiao:', error);
            throw error;
        }
    }
    async updateBulk(ids, status) {
        return this.prisma.$transaction(async (prisma) => {
            let success = 0;
            let fail = 0;
            for (const id of ids) {
                try {
                    const oldDonhang = await prisma.donhang.findUnique({
                        where: { id },
                        include: { sanpham: true },
                    });
                    if (!oldDonhang) {
                        fail++;
                        continue;
                    }
                    if (oldDonhang.status === 'dadat' && status === 'danhan') {
                        for (const sp of oldDonhang.sanpham) {
                            const decValue = parseFloat((sp.sldat ?? 0).toFixed(3));
                            await prisma.tonKho.update({
                                where: { sanphamId: sp.idSP },
                                data: {
                                    slchogiao: { decrement: decValue },
                                    slton: { decrement: decValue },
                                },
                            });
                        }
                        const uniqueSanpham = oldDonhang.sanpham.reduce((acc, sp) => {
                            const existing = acc.find((item) => item.sanphamId === sp.idSP);
                            if (existing) {
                                existing.soluong += parseFloat((sp.sldat ?? 0).toFixed(3));
                            }
                            else {
                                acc.push({
                                    sanphamId: sp.idSP,
                                    soluong: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                    ghichu: sp.ghichu,
                                });
                            }
                            return acc;
                        }, []);
                        const maphieuNew = `PX-${oldDonhang.madonhang}-${this.formatDateForFilename()}`;
                        const phieuPayload = {
                            ngay: oldDonhang.ngaygiao
                                ? new Date(oldDonhang.ngaygiao)
                                : new Date(),
                            type: 'xuat',
                            khoId: DEFAUL_KHO_ID,
                            ghichu: oldDonhang.ghichu || 'Xuất kho hàng loạt',
                            isActive: true,
                        };
                        const existingPhieu = await prisma.phieuKho.findUnique({
                            where: { maphieu: maphieuNew },
                            include: { sanpham: true },
                        });
                        if (existingPhieu) {
                            await prisma.phieuKhoSanpham.deleteMany({
                                where: { phieuKhoId: existingPhieu.id },
                            });
                            await prisma.phieuKho.update({
                                where: { maphieu: maphieuNew },
                                data: {
                                    ngay: phieuPayload.ngay,
                                    type: phieuPayload.type,
                                    khoId: phieuPayload.khoId,
                                    ghichu: phieuPayload.ghichu,
                                    isActive: phieuPayload.isActive,
                                    sanpham: {
                                        create: uniqueSanpham,
                                    },
                                },
                            });
                        }
                        else {
                            await prisma.phieuKho.create({
                                data: {
                                    maphieu: maphieuNew,
                                    ngay: phieuPayload.ngay,
                                    type: phieuPayload.type,
                                    khoId: phieuPayload.khoId,
                                    ghichu: phieuPayload.ghichu,
                                    isActive: phieuPayload.isActive,
                                    sanpham: {
                                        create: uniqueSanpham,
                                    },
                                },
                            });
                        }
                        await prisma.donhang.update({
                            where: { id },
                            data: {
                                status: 'danhan',
                                sanpham: {
                                    updateMany: oldDonhang.sanpham.map((sp) => ({
                                        where: { idSP: sp.idSP },
                                        data: {
                                            slgiao: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                            slnhan: parseFloat((sp.sldat ?? 0).toFixed(3)),
                                        },
                                    })),
                                },
                            },
                        });
                        success++;
                    }
                    else {
                        fail++;
                    }
                }
                catch (error) {
                    console.error(`Error updating donhang ${id}:`, error);
                    fail++;
                }
            }
            return { success, fail };
        });
    }
    async remove(id) {
    }
    async removeBulk(ids) {
        return this.prisma.$transaction(async (prisma) => {
            let success = 0;
            let fail = 0;
            for (const id of ids) {
                try {
                    const donhang = await prisma.donhang.findUnique({
                        where: { id },
                        include: { sanpham: true },
                    });
                    if (!donhang) {
                        fail++;
                        continue;
                    }
                    for (const sp of donhang.sanpham) {
                        const sldat = parseFloat((sp.sldat ?? 0).toFixed(3));
                        if (donhang.status === 'dagiao' || donhang.status === 'danhan') {
                            const slgiao = parseFloat((sp.slgiao ?? 0).toFixed(3));
                            await prisma.tonKho.update({
                                where: { sanphamId: sp.idSP },
                                data: {
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
                    const maphieuXuat = `PX-${donhang.madonhang}-${this.formatDateForFilename()}`;
                    const maphieuNhap = `PN-${donhang.madonhang}-RET-${this.formatDateForFilename()}`;
                    const phieuXuat = await prisma.phieuKho.findUnique({
                        where: { maphieu: maphieuXuat },
                    });
                    if (phieuXuat) {
                        await prisma.phieuKhoSanpham.deleteMany({
                            where: { phieuKhoId: phieuXuat.id },
                        });
                        await prisma.phieuKho.delete({ where: { maphieu: maphieuXuat } });
                    }
                    const phieuNhap = await prisma.phieuKho.findUnique({
                        where: { maphieu: maphieuNhap },
                    });
                    if (phieuNhap) {
                        await prisma.phieuKhoSanpham.deleteMany({
                            where: { phieuKhoId: phieuNhap.id },
                        });
                        await prisma.phieuKho.delete({ where: { maphieu: maphieuNhap } });
                    }
                    await prisma.donhang.delete({ where: { id } });
                    success++;
                }
                catch (error) {
                    fail++;
                }
            }
            return { success, fail };
        });
    }
    async findByProductId(idSP) {
        const donhangs = await this.prisma.donhang.findMany({
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
                khachhang: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return donhangs.map((donhang) => ({
            ...donhang,
            sanpham: donhang.sanpham.find((item) => item.idSP === idSP),
        }));
    }
    async findOrdersByStatus(params) {
        try {
            const data = await this.prisma.donhang.findMany({
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
                    khachhang: {
                        select: {
                            id: true,
                            name: true,
                            makh: true
                        }
                    }
                }
            });
            return data || [];
        }
        catch (error) {
            console.error('Error finding orders by status:', error);
            return [];
        }
    }
    async completeDonhang(id, data) {
        try {
            return await this.prisma.$transaction(async (prisma) => {
                const donhang = await prisma.donhang.findUnique({
                    where: { id },
                    include: { sanpham: true }
                });
                if (!donhang) {
                    return { success: false, message: 'Đơn hàng không tồn tại' };
                }
                await prisma.donhang.update({
                    where: { id },
                    data: {
                        status: 'danhan',
                        ghichu: data.ghichu,
                        updatedAt: new Date()
                    }
                });
                for (const sp of donhang.sanpham) {
                    await prisma.donhangsanpham.update({
                        where: { id: sp.id },
                        data: {
                            slnhan: data.slnhan,
                            ghichu: data.ghichu
                        }
                    });
                    const oldSlgiao = parseFloat((sp.slgiao || 0).toString());
                    const newSlnhan = parseFloat(data.slnhan.toString());
                    const shortage = oldSlgiao - newSlnhan;
                    await this.updateTonKhoSafely(sp.idSP, {
                        slchogiao: { decrement: oldSlgiao },
                        ...(shortage > 0 && { slton: { increment: shortage } })
                    });
                }
                return { success: true, message: 'Hoàn tất đơn hàng thành công' };
            });
        }
        catch (error) {
            console.error('Error completing donhang:', error);
            return { success: false, message: error.message };
        }
    }
    async completePendingDeliveriesForProduct(sanphamId) {
        try {
            const pendingOrders = await this.prisma.donhang.findMany({
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
                    message: 'Không có đơn hàng chờ giao nào'
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
                            slnhan: sp.slgiao,
                            ghichu: (sp.ghichu || '') + ' | Auto-completed for inventory close'
                        }));
                        await prisma.donhang.update({
                            where: { id: order.id },
                            data: {
                                status: 'danhan',
                                ghichu: (order.ghichu || '') + ' | Tự động hoàn tất trước chốt kho',
                                updatedAt: new Date()
                            }
                        });
                        for (const update of sanphamUpdates) {
                            await prisma.donhangsanpham.update({
                                where: { id: update.id },
                                data: {
                                    slnhan: update.slnhan,
                                    ghichu: update.ghichu
                                }
                            });
                        }
                        for (const sp of order.sanpham) {
                            await this.tonkhoManager.updateTonkhoAtomic([{
                                    sanphamId: sp.idSP,
                                    operation: 'decrement',
                                    slchogiao: parseFloat(sp.slgiao.toString()),
                                    reason: `Auto-complete pending delivery for order ${order.madonhang}`
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
                message: `Đã hoàn tất ${totalCompleted} đơn hàng chờ giao`
            };
        }
        catch (error) {
            console.error('Error completing pending deliveries:', error);
            return {
                success: false,
                count: 0,
                message: error.message || 'Lỗi khi hoàn tất đơn hàng chờ giao'
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
    async getPendingOrdersForProduct(sanphamId) {
        try {
            const orders = await this.prisma.donhang.findMany({
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
                    khachhang: {
                        select: {
                            id: true,
                            name: true,
                            makh: true
                        }
                    }
                }
            });
            return orders.map(order => ({
                id: order.id,
                status: order.status,
                khachhang: order.khachhang,
                sanpham: order.sanpham[0],
                createdAt: order.createdAt
            }));
        }
        catch (error) {
            console.error('Error getting pending orders for product:', error);
            return [];
        }
    }
};
exports.DonhangService = DonhangService;
exports.DonhangService = DonhangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        status_machine_service_1.StatusMachineService,
        tonkho_manager_service_1.TonkhoManagerService])
], DonhangService);
//# sourceMappingURL=donhang.service.js.map