const XLSX = require('xlsx');
const path = require('path');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 24-5.xlsx';
const workbook = XLSX.readFile(filePath);

console.log('Sheet Names:', workbook.SheetNames);

workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log(`\n--- Sheet: ${sheetName} ---`);
    console.log(`Total Rows: ${data.length}`);
    data.slice(0, 10).forEach((row, i) => {
        console.log(`${i}: ${JSON.stringify(row)}`);
    });
});
