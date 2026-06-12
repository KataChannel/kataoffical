const XLSX = require('xlsx');
const path = require('path');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 10-6.xlsx';

async function main() {
    const workbook = XLSX.readFile(filePath);
    const sheetName = 'sheet1';
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    const allKeys = new Set();
    data.forEach(row => {
        Object.keys(row).forEach(key => allKeys.add(key));
    });
    console.log('Unique columns in sheet1:', Array.from(allKeys));
}

main().catch(console.error);
