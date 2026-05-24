const XLSX = require('xlsx');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 24-5.xlsx';
const workbook = XLSX.readFile(filePath);
const codeSheet = workbook.Sheets['CODE'];
const data = XLSX.utils.sheet_to_json(codeSheet);

console.log('=== SEARCHING CODE SHEET FOR I100480 ===');
data.forEach((row, idx) => {
    const itemName = row.ItemName ? String(row.ItemName).toLowerCase() : '';
    const itemCode = row.itemcode ? String(row.itemcode).toLowerCase() : '';
    const mappingcode = row.mappingcode ? String(row.mappingcode).toLowerCase() : '';

    if (itemName.includes('dưa hấu') || itemName.includes('không hạt') || itemCode.includes('i100480') || mappingcode.includes('duahau')) {
        console.log(`Row ${idx + 2}:`, row);
    }
});
