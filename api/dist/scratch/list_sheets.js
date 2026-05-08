"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
async function listSheets() {
    const workbook = new exceljs_1.default.Workbook();
    await workbook.xlsx.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx');
    workbook.eachSheet((worksheet) => {
        console.log(`Sheet: ${worksheet.name}`);
        const row1 = worksheet.getRow(1);
        const headers = [];
        row1.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            headers[colNumber] = cell.value;
        });
        console.log(`  Headers: ${JSON.stringify(headers)}`);
    });
}
listSheets().catch(console.error);
//# sourceMappingURL=list_sheets.js.map