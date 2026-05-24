const XLSX = require('xlsx');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 24-5.xlsx';
const workbook = XLSX.readFile(filePath);
const sheet1 = workbook.Sheets['sheet1'];
const data = XLSX.utils.sheet_to_json(sheet1);

const targetCodes = ['I100072', 'I100506', 'I100168', 'I100198', 'I101167', 'I100122'];

console.log('=== SEARCHING EXCEL FOR OTHER CODES ===');
targetCodes.forEach(code => {
    const row = data.find(r => String(r.masp).trim() === code);
    if (row) {
        console.log(`Found ${code}:`, row);
    } else {
        console.log(`${code} NOT found in Excel!`);
    }
});
