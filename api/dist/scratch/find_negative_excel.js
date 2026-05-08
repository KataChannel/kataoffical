"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
async function readExcel() {
    const workbook = new exceljs_1.default.Workbook();
    await workbook.xlsx.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx');
    workbook.eachSheet((worksheet, sheetId) => {
        console.log(`Sheet: ${worksheet.name}`);
        const headers = [];
        worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
            headers[colNumber] = cell.value;
        });
        console.log(`  Headers: ${JSON.stringify(headers)}`);
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1)
                return;
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                if (typeof cell.value === 'number' && cell.value < 0) {
                    console.log(`  Row ${rowNumber}, Col ${colNumber} (${headers[colNumber]}): ${cell.value}`);
                }
                else if (cell.value && typeof cell.value === 'object' && 'result' in cell.value) {
                    const res = cell.value.result;
                    if (typeof res === 'number' && res < 0) {
                        console.log(`  Row ${rowNumber}, Col ${colNumber} (${headers[colNumber]}) [Result]: ${res}`);
                    }
                }
            });
        });
    });
}
readExcel().catch(console.error);
//# sourceMappingURL=find_negative_excel.js.map