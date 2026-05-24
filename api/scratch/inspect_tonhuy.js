const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 14-5.xlsx';

if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    process.exit(1);
}

const workbook = XLSX.readFile(filePath);
workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log(`Sheet: ${sheetName}`);
    // Log first 20 rows to see structure
    data.slice(0, 20).forEach((row, i) => {
        console.log(`${i}: ${JSON.stringify(row)}`);
    });
});
