"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XLSX = require("xlsx");
const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 4-5 (Sao chép).xlsx';
try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log('--- Headers ---');
    console.log(jsonData[0]);
    console.log('--- Rows with Negative Values ---');
    const rows = jsonData;
    rows.forEach((row, index) => {
        const slton = parseFloat(String(row[4]));
        const slhuy = parseFloat(String(row[5]));
        if (slton < 0 || slhuy < 0) {
            console.log(`Row ${index}:`, row);
        }
    });
    console.log('--- Row for Bắp cải trắng (Detailed) ---');
    const bapCaiRow = rows.find(row => row.some(cell => String(cell).includes('Bắp cải trắng') || String(cell).includes('I100003')));
    console.log(bapCaiRow);
    if (bapCaiRow) {
        console.log('slton value:', bapCaiRow[4], 'Type:', typeof bapCaiRow[4]);
        console.log('slhuy value:', bapCaiRow[5], 'Type:', typeof bapCaiRow[5]);
    }
}
catch (error) {
    console.error('Error reading Excel:', error);
}
//# sourceMappingURL=check_excel.js.map