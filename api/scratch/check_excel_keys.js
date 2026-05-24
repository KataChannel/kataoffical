const XLSX = require('xlsx');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 24-5.xlsx';
const workbook = XLSX.readFile(filePath);
const sheet1 = workbook.Sheets['sheet1'];
const data = XLSX.utils.sheet_to_json(sheet1);

console.log('=== PRINTING ALL CODES IN EXCEL SHEET1 STARTING WITH I1004 ===');
data.forEach(row => {
    const masp = row.masp ? String(row.masp).trim() : '';
    if (masp.startsWith('I1004')) {
        console.log(`- masp: "${masp}" | title: "${row.title}" | slton: ${row.slton}`);
    }
});
