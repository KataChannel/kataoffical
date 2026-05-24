const XLSX = require('xlsx');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 24-5.xlsx';
const workbook = XLSX.readFile(filePath);
const sheet1 = workbook.Sheets['sheet1'];
const data = XLSX.utils.sheet_to_json(sheet1);

console.log('=== SEARCHING EXCEL FOR masp I100480 WITH TRIM ===');
let foundCount = 0;
data.forEach((row, idx) => {
    const rawMasp = row.masp ? String(row.masp).trim() : '';
    if (rawMasp === 'I100480') {
        console.log(`FOUND exactly at Row ${idx + 2}:`, row);
        foundCount++;
    }
});

if (foundCount === 0) {
    console.log('Definitely NOT found in Excel sheet1, even with trimming!');
}
