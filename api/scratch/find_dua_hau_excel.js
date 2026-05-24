const XLSX = require('xlsx');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 24-5.xlsx';
const workbook = XLSX.readFile(filePath);
const sheet1 = workbook.Sheets['sheet1'];
const data = XLSX.utils.sheet_to_json(sheet1);

console.log('=== SEARCHING EXCEL FOR DƯA HẤU ===');
data.forEach((row, idx) => {
    const title = row.title ? String(row.title).toLowerCase() : '';
    const masp = row.masp ? String(row.masp).toLowerCase() : '';
    const mapCode = row.Mapingcode ? String(row.Mapingcode).toLowerCase() : '';

    if (title.includes('dưa hấu') || title.includes('không hạt') || masp.includes('i100480') || mapCode.includes('duahau')) {
        console.log(`Row ${idx + 2}:`, row);
    }
});
