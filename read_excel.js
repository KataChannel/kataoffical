
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const doisoatDir = '/chikiet/kata2025/rausachfinal/doisoat';
const files = fs.readdirSync(doisoatDir).filter(f => f.endsWith('.xlsx'));

files.forEach(file => {
    console.log(`--- Processing file: ${file} ---`);
    const workbook = XLSX.readFile(path.join(doisoatDir, file));
    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(`Sheet: ${sheetName}`);
        // Log first 10 rows to see structure
        data.slice(0, 20).forEach((row, i) => {
            console.log(`${i}: ${JSON.stringify(row)}`);
        });
    });
});
