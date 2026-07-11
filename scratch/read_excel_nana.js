const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const fileT7 = '/home/kata/Coding/rausachfinal/docs/kiemtrabanggia/BÁO GIÁ RAU CỦ QUẢ T7.26 - NANA MART.xlsx';
const fileT6 = '/home/kata/Coding/rausachfinal/docs/kiemtrabanggia/BÁO GIÁ RAU CỦ QUẢ T6.26 - NANA MART.xlsx';

function readExcel(filePath) {
    console.log(`\n--- Reading ${path.basename(filePath)} ---`);
    const workbook = XLSX.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    console.log('Sheets:', sheetNames);
    
    // Read the first sheet
    const sheet = workbook.Sheets[sheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    console.log(`Total rows: ${data.length}`);
    if (data.length > 0) {
        console.log('Sample row:', data[0]);
        console.log('Keys in first row:', Object.keys(data[0]));
    }
    return data;
}

const dataT7 = readExcel(fileT7);
const dataT6 = readExcel(fileT6);

// Save sample to json for debugging
fs.writeFileSync('/home/kata/Coding/rausachfinal/scratch/excel_nana_t7.json', JSON.stringify(dataT7.slice(0, 20), null, 2));
console.log('Saved first 20 rows of T7 to scratch/excel_nana_t7.json');
