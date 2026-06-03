"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const xlsx_js_style_1 = require("xlsx-js-style");
const moment_1 = require("moment");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
async function main() {
    const Batdau = new Date('2026-01-01T00:00:00Z');
    const Ketthuc = new Date('2026-05-31T23:59:59Z');
    console.log('1. Querying supplier orders (đặt hàng NCC) from database for period 1/1/2026 to 31/5/2026...');
    const orders = await prisma.dathang.findMany({
        where: {
            ngaynhan: {
                gte: Batdau,
                lte: Ketthuc
            },
            status: {
                in: ['danhan', 'hoanthanh']
            }
        },
        orderBy: [
            { nhacungcap: { name: 'asc' } },
            { ngaynhan: 'asc' }
        ],
        select: {
            id: true,
            madncc: true,
            ngaynhan: true,
            ghichu: true,
            sanpham: {
                select: {
                    slnhan: true,
                    ttnhan: true,
                    gianhap: true,
                    slhuy: true,
                    ghichu: true,
                    sanpham: {
                        select: {
                            masp: true,
                            title: true,
                            dvt: true,
                        }
                    }
                }
            },
            nhacungcap: {
                select: {
                    id: true,
                    mancc: true,
                    name: true,
                    diachi: true,
                    email: true,
                    isshowvat: true,
                    NhomNcc: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });
    console.log(`Retrieved ${orders.length} supplier orders. Processing...`);
    if (orders.length === 0) {
        console.log('No supplier orders found to export!');
        return;
    }
    const rawData = JSON.parse(JSON.stringify(orders));
    const workbook = xlsx_js_style_1.default.utils.book_new();
    const borderThin = {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } }
    };
    const styleHeaderYellow = {
        fill: { fgColor: { rgb: 'FFFF00' } },
        font: { bold: true, name: 'Calibri' },
        alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
        border: borderThin
    };
    const styleHeaderGray = {
        fill: { fgColor: { rgb: 'D9D9D9' } },
        font: { bold: true, name: 'Calibri' },
        alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
        border: borderThin
    };
    const styleHeaderBlue = {
        fill: { fgColor: { rgb: '1F4E78' } },
        font: { bold: true, color: { rgb: 'FFFFFF' }, name: 'Calibri' },
        alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
        border: borderThin
    };
    const styleData = {
        font: { name: 'Calibri' },
        alignment: { vertical: 'center' },
        border: borderThin
    };
    const styleNumber = {
        ...styleData,
        alignment: { horizontal: 'right', vertical: 'center' },
        numFmt: '#,##0.00'
    };
    const styleTitle = {
        font: { bold: true, size: 16, name: 'Calibri' },
        alignment: { horizontal: 'center', vertical: 'center' }
    };
    const styleSubTitle = {
        font: { bold: true, italic: true, name: 'Calibri' },
        alignment: { horizontal: 'center', vertical: 'center' }
    };
    rawData.forEach(order => {
        const orderItems = (order.sanpham || []).filter((it) => Number(it.slnhan) > 0);
        let orderTotalNhap = 0;
        orderItems.forEach((item) => {
            const ttNhap = (Number(item.slnhan) || 0) * (Number(item.gianhap) || 0);
            orderTotalNhap += ttNhap;
        });
        order.calculatedTotalNhap = orderTotalNhap;
    });
    console.log('Generating Sheet 1 (Tổng Hợp Công Nợ NCC)...');
    const summaryRows = [];
    summaryRows.push(['TỔNG HỢP CÔNG NỢ PHẢI TRẢ NHÀ CUNG CẤP']);
    summaryRows.push(['Tài khoản: 331', '', '', '', '', '', 'Từ ngày ' + (0, moment_1.default)(Batdau).format('DD/MM/YYYY') + ' Đến ngày ' + (0, moment_1.default)(Ketthuc).format('DD/MM/YYYY')]);
    summaryRows.push(['NHÓM NCC', 'Tên Nhà Cung Cấp', 'TK công nợ', 'Số dư đầu kỳ', 'Phát sinh tăng\n(TỔNG MUA HÀNG)', 'Phát sinh giảm', 'Số dư cuối kỳ', 'Trong đó', '']);
    summaryRows.push(['', '', '', '', '', '', '', 'Tháng ' + (0, moment_1.default)(Ketthuc).format('MM/YYYY'), '']);
    const summarySheet = xlsx_js_style_1.default.utils.aoa_to_sheet(summaryRows);
    summarySheet['A1'].s = styleTitle;
    summarySheet['A2'].s = styleSubTitle;
    summarySheet['G2'].s = styleSubTitle;
    ['A3', 'B3', 'E3'].forEach(c => {
        if (summarySheet[c])
            summarySheet[c].s = styleHeaderYellow;
    });
    ['C3', 'D3', 'F3', 'G3', 'H3', 'I3', 'H4', 'I4'].forEach(c => {
        if (summarySheet[c])
            summarySheet[c].s = styleHeaderGray;
    });
    const supplierGroupsMap = new Map();
    rawData.forEach(order => {
        const supplierId = order.nhacungcap?.id || 'unknown';
        if (!supplierGroupsMap.has(supplierId)) {
            supplierGroupsMap.set(supplierId, {
                groupName: (order.nhacungcap?.NhomNcc && order.nhacungcap.NhomNcc.length > 0)
                    ? order.nhacungcap.NhomNcc[0].name
                    : 'Chưa phân nhóm',
                supplierName: order.nhacungcap?.name || 'Chưa tên',
                mancc: order.nhacungcap?.mancc || '',
                increase: 0,
                decrease: 0,
            });
        }
        const group = supplierGroupsMap.get(supplierId);
        group.increase += order.calculatedTotalNhap;
    });
    let currentRowIdx = 4;
    const sortedSuppliers = Array.from(supplierGroupsMap.values()).sort((a, b) => a.groupName.localeCompare(b.groupName));
    const mergesSummary = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
        { s: { r: 1, c: 6 }, e: { r: 1, c: 8 } },
        { s: { r: 2, c: 0 }, e: { r: 3, c: 0 } },
        { s: { r: 2, c: 1 }, e: { r: 3, c: 1 } },
        { s: { r: 2, c: 2 }, e: { r: 3, c: 2 } },
        { s: { r: 2, c: 3 }, e: { r: 3, c: 3 } },
        { s: { r: 2, c: 4 }, e: { r: 3, c: 4 } },
        { s: { r: 2, c: 5 }, e: { r: 3, c: 5 } },
        { s: { r: 2, c: 6 }, e: { r: 3, c: 6 } },
        { s: { r: 2, c: 7 }, e: { r: 2, c: 8 } },
    ];
    let lastGroupName = '';
    let groupStartRow = currentRowIdx;
    sortedSuppliers.forEach((supp, idx) => {
        const row = [
            supp.groupName,
            supp.supplierName,
            '331',
            0,
            supp.increase,
            0,
            supp.increase,
            supp.increase,
            ''
        ];
        xlsx_js_style_1.default.utils.sheet_add_aoa(summarySheet, [row], { origin: currentRowIdx });
        for (let c = 0; c <= 8; c++) {
            const cellRef = xlsx_js_style_1.default.utils.encode_cell({ r: currentRowIdx, c: c });
            summarySheet[cellRef].s = (c >= 3) ? styleNumber : styleData;
        }
        if (supp.groupName !== lastGroupName) {
            if (idx > 0 && currentRowIdx - groupStartRow > 1) {
                mergesSummary.push({ s: { r: groupStartRow, c: 0 }, e: { r: currentRowIdx - 1, c: 0 } });
            }
            lastGroupName = supp.groupName;
            groupStartRow = currentRowIdx;
        }
        currentRowIdx++;
    });
    if (currentRowIdx - groupStartRow > 1) {
        mergesSummary.push({ s: { r: groupStartRow, c: 0 }, e: { r: currentRowIdx - 1, c: 0 } });
    }
    summarySheet['!merges'] = mergesSummary;
    summarySheet['!cols'] = [
        { wch: 25 }, { wch: 35 }, { wch: 12 }, { wch: 15 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }
    ];
    applyBorders(summarySheet, borderThin);
    xlsx_js_style_1.default.utils.book_append_sheet(workbook, summarySheet, 'Tổng Hợp');
    console.log('Generating Sheet 2 (Chi Tiết Công Nợ NCC)...');
    const detailHeaders = [
        'Ngày Nhận', 'Mã NCC', 'Tên Nhà Cung Cấp', 'Mã Đặt Hàng', 'Mã Hàng', 'Tên Hàng', 'ĐVT',
        'Số Lượng Nhận', 'Giá Nhập', 'Thành Tiền', 'Ghi Chú', 'SL Hủy',
        'Tổng Tiền Đơn Hàng', 'Tổng Cộng NCC'
    ];
    const detailRows = [detailHeaders];
    const detailSheet = xlsx_js_style_1.default.utils.aoa_to_sheet(detailRows);
    for (let c = 0; c < detailHeaders.length; c++) {
        const cellRef = xlsx_js_style_1.default.utils.encode_cell({ r: 0, c: c });
        detailSheet[cellRef].s = styleHeaderBlue;
    }
    let detailRowIdx = 1;
    const mergesDetail = [];
    const supplierGrandTotals = new Map();
    rawData.forEach(order => {
        const suppId = order.nhacungcap?.id;
        supplierGrandTotals.set(suppId, (supplierGrandTotals.get(suppId) || 0) + order.calculatedTotalNhap);
    });
    rawData.forEach(order => {
        const items = (order.sanpham || []).filter((it) => Number(it.slnhan) > 0);
        if (items.length === 0)
            return;
        const startRow = detailRowIdx;
        const suppId = order.nhacungcap?.id;
        items.forEach((item, idx) => {
            const gianhap = Number(item.gianhap) || 0;
            const slnhan = Number(item.slnhan) || 0;
            const thanhtien = slnhan * gianhap;
            const rowDataArr = [
                (0, moment_1.default)(order.ngaynhan).format('DD/MM/YYYY'),
                order.nhacungcap?.mancc || '',
                order.nhacungcap?.name || '',
                order.madncc || '',
                item.sanpham?.masp || '',
                item.sanpham?.title || '',
                item.sanpham?.dvt || '',
                slnhan,
                gianhap,
                thanhtien,
                item.ghichu || '',
                Number(item.slhuy) || 0,
                idx === 0 ? order.calculatedTotalNhap : '',
                idx === 0 ? supplierGrandTotals.get(suppId) : ''
            ];
            xlsx_js_style_1.default.utils.sheet_add_aoa(detailSheet, [rowDataArr], { origin: detailRowIdx });
            for (let c = 0; c < rowDataArr.length; c++) {
                const cellRef = xlsx_js_style_1.default.utils.encode_cell({ r: detailRowIdx, c: c });
                const isNumber = [7, 8, 9, 11, 12, 13].includes(c);
                detailSheet[cellRef].s = isNumber ? styleNumber : styleData;
            }
            detailRowIdx++;
        });
        if (items.length > 0) {
            [0, 1, 2, 3, 12, 13].forEach(c => {
                mergesDetail.push({ s: { r: startRow, c }, e: { r: detailRowIdx - 1, c } });
            });
        }
    });
    detailSheet['!merges'] = mergesDetail;
    detailSheet['!cols'] = detailHeaders.map(() => ({ wch: 18 }));
    applyBorders(detailSheet, borderThin);
    xlsx_js_style_1.default.utils.book_append_sheet(workbook, detailSheet, 'Chi Tiết');
    console.log('Writing file to disk...');
    const reportDir = '/home/kata/Coding/rausachfinal/docs/report';
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }
    const finalFilePath = path.join(reportDir, 'CongnoNCC_01_01_2026_31_05_2026.xlsx');
    const excelBuffer = xlsx_js_style_1.default.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    fs.writeFileSync(finalFilePath, excelBuffer);
    console.log(`SUCCESS: Exported supplier debt report to ${finalFilePath}`);
}
function applyBorders(ws, borderThin) {
    if (!ws || !ws['!ref'])
        return;
    const range = xlsx_js_style_1.default.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell_address = { c: C, r: R };
            const cell_ref = xlsx_js_style_1.default.utils.encode_cell(cell_address);
            if (!ws[cell_ref])
                ws[cell_ref] = { t: 'z', v: '' };
            if (!ws[cell_ref].s)
                ws[cell_ref].s = {};
            ws[cell_ref].s.border = borderThin;
        }
    }
}
main()
    .catch(err => {
    console.error('CRITICAL ERROR:', err);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=export-congno-ncc.js.map