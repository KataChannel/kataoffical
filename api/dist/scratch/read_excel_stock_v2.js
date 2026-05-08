"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
async function readStock(filePath) {
    const workbook = new exceljs_1.default.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    let data = null;
    worksheet?.eachRow((row, rowNumber) => {
        const rawCode = row.getCell(2).value;
        const masp = typeof rawCode === 'object' && rawCode !== null ? rawCode.result : rawCode?.toString();
        if (masp === 'I100270') {
            data = {
                title: row.getCell(3).value?.result || row.getCell(3).value,
                masp: masp,
                ton: row.getCell(5).value,
                huy: row.getCell(6).value,
            };
        }
    });
    return data;
}
async function main() {
    const file4 = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 4-5.xlsx';
    const file5 = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx';
    const data4 = await readStock(file4);
    const data5 = await readStock(file5);
    console.log('--- Trứng bắc thảo (I100270) ---');
    console.log('Ngày 4-5:', data4);
    console.log('Ngày 5-5:', data5);
}
main().catch(console.error);
//# sourceMappingURL=read_excel_stock_v2.js.map