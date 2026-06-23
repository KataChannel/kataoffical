const XLSX = require('xlsx');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 11-6.xlsx';

async function main() {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets['Sheet2'];
    const data = XLSX.utils.sheet_to_json(worksheet);
    console.log('Sheet2 data:');
    console.log(JSON.stringify(data, null, 2));
}

main().catch(console.error);
