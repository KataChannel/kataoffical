"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
async function readExcel() {
    const workbook = new exceljs_1.default.Workbook();
    await workbook.xlsx.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx');
    const worksheet = workbook.worksheets[0];
    const headers = [];
    worksheet.getRow(1).eachCell((cell, colNumber) => {
        headers[colNumber] = cell.value;
    });
    console.log('Headers:', headers);
    const negativeRows = [];
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1)
            return;
        const tonChotKhoIdx = headers.indexOf('Tồn Chốt Kho');
        if (tonChotKhoIdx === -1) {
            console.log('Column "Tồn Chốt Kho" not found');
            return;
        }
        const value = row.getCell(tonChotKhoIdx).value;
        if (typeof value === 'number' && value < 0) {
            negativeRows.push({
                row: rowNumber,
                product: row.getCell(headers.indexOf('Tên sản phẩm') || 1).value,
                masp: row.getCell(headers.indexOf('Mã sản phẩm') || 2).value,
                tonChotKho: value,
                tonHeThong: row.getCell(headers.indexOf('Tồn Hệ Thống') || 0).value,
                tonThucTe: row.getCell(headers.indexOf('Tồn Thực Tế') || 0).value,
            });
        }
    });
    console.log('Negative Rows count:', negativeRows.length);
    if (negativeRows.length > 0) {
        console.log('Example Negative Rows:', negativeRows.slice(0, 5));
    }
}
readExcel().catch(console.error);
//# sourceMappingURL=read_excel_stock.js.map