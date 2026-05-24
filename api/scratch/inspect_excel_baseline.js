const XLSX = require('xlsx');
const path = require('path');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 15-5.xlsx';
const workbook = XLSX.readFile(filePath);

workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log(`\n--- Sheet: ${sheetName} ---`);
    data.slice(0, 10).forEach((row, i) => {
        console.log(`${i}: ${JSON.stringify(row)}`);
    });
});
