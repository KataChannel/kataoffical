const XLSX = require('xlsx');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 24-5.xlsx';
const workbook = XLSX.readFile(filePath);
const sheet1 = workbook.Sheets['sheet1'];
const data = XLSX.utils.sheet_to_json(sheet1);

console.log('=== SEARCHING EXCEL FOR VALUE 1.8 ===');
data.forEach((row, idx) => {
    const slton = parseFloat(row.slton) || 0;
    const slhuy = parseFloat(row.slhuy) || 0;

    if (Math.abs(slton - 1.8) < 0.0001 || Math.abs(slhuy - 1.8) < 0.0001) {
        console.log(`Row ${idx + 2}:`, row);
    }
});
