const XLSX = require('xlsx');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 22-5.xlsx';

console.log(`--- Inspecting file: ${filePath} ---`);
try {
    const workbook = XLSX.readFile(filePath);
    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(`Sheet: ${sheetName}`);
        // Log first 10 rows to see structure
        data.slice(0, 10).forEach((row, i) => {
            console.log(`${i}: ${JSON.stringify(row)}`);
        });
    });
} catch (error) {
    console.error('Error reading Excel file:', error);
}
