"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
async function findProduct() {
    const workbook = new exceljs_1.default.Workbook();
    await workbook.xlsx.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx');
    const worksheet = workbook.worksheets[0];
    worksheet.eachRow((row, rowNumber) => {
        const maspCell = row.getCell(3);
        const masp = typeof maspCell.value === 'object' && maspCell.value !== null && 'result' in maspCell.value
            ? maspCell.value.result
            : maspCell.value;
        if (masp === 'I100470') {
            console.log(`Found I100470 at row ${rowNumber}:`, JSON.stringify(row.values));
        }
    });
}
findProduct().catch(console.error);
//# sourceMappingURL=find_I100470_excel.js.map