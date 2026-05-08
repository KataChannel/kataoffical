"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
async function readExcel() {
    const workbook = new exceljs_1.default.Workbook();
    await workbook.xlsx.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx');
    const worksheet = workbook.worksheets[0];
    const headers = [];
    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
        headers[colNumber] = cell.value;
    });
    console.log('Headers:', JSON.stringify(headers));
    const firstRow = [];
    worksheet.getRow(2).eachCell({ includeEmpty: true }, (cell, colNumber) => {
        firstRow[colNumber] = cell.value;
    });
    console.log('First Row:', JSON.stringify(firstRow));
}
readExcel().catch(console.error);
//# sourceMappingURL=inspect_excel.js.map