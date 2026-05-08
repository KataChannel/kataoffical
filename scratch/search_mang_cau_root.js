
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const searchTerms = ['Mãng Cầu Xiêm', 'I100727', 'Mãng cầu xiêm'];
const rootDir = '/home/kata/Coding/rausachfinal';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.xlsx'));

files.forEach(file => {
    console.log(`--- Searching in file: ${file} ---`);
    try {
        const workbook = XLSX.readFile(path.join(rootDir, file));
        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            data.forEach((row, i) => {
                const rowStr = JSON.stringify(row);
                if (searchTerms.some(term => rowStr.includes(term))) {
                    console.log(`File: ${file}, Sheet: ${sheetName}, Row ${i}: ${rowStr}`);
                }
            });
        });
    } catch (e) {
        console.log(`Error reading ${file}: ${e.message}`);
    }
});
