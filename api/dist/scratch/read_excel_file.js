"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExcelJS = require("exceljs");
async function searchExcel() {
    const filePath = '/mnt/chikiet/kata2025/rausachfinal/doisoat/dieuchinh/Mẫu Tồn Kho (1).xlsx';
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    if (!worksheet) {
        console.log('Sheet1 not found');
        return;
    }
    const searchMasp = ['I100260', 'I100738', 'I100256', 'I100094', 'I100263', 'I100785', 'I100542', 'I100007'];
    console.log('--- SEARCH RESULTS IN EXCEL ---');
    worksheet.eachRow((row, rowNumber) => {
        const masp = row.getCell(1).value?.toString();
        if (masp && searchMasp.includes(masp)) {
            console.log(`Found ${masp} at Row ${rowNumber}:`, row.values);
        }
    });
    console.log('--- ALL ITEMS IN EXCEL ---');
    let count = 0;
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1)
            return;
        const masp = row.getCell(1).value?.toString();
        if (masp && masp !== 'Mã hàng') {
            count++;
        }
    });
    console.log(`Total items in Excel: ${count}`);
}
searchExcel().catch(console.error);
//# sourceMappingURL=read_excel_file.js.map