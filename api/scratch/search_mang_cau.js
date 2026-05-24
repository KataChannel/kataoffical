
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const searchTerms = ['Mãng Cầu Xiêm', 'I100727'];
const targetFile = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 6-5.xlsx';

if (fs.existsSync(targetFile)) {
    console.log(`Searching in ${targetFile}...`);
    const workbook = XLSX.readFile(targetFile);
    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        data.forEach((row, i) => {
            const rowStr = JSON.stringify(row);
            if (searchTerms.some(term => rowStr.includes(term))) {
                console.log(`Sheet: ${sheetName}, Row ${i}: ${rowStr}`);
            }
        });
    });
} else {
    console.log(`File ${targetFile} not found.`);
}
