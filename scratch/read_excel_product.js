const XLSX = require('xlsx');

const workbook = XLSX.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 4-5.xlsx');
const sheet1 = XLSX.utils.sheet_to_json(workbook.Sheets['sheet1']);

console.log('Total items in sheet1:', sheet1.length);
const topItems = sheet1.filter(r => r.slton > 0 || r.slhuy > 0).slice(0, 20);
console.log('Sample items with stock/waste:');
console.log(JSON.stringify(topItems, null, 2));
