
const XLSX = require('xlsx');
const targetFile = '/home/kata/Coding/rausachfinal/doisoat/VanDon_TongHop_04-05-2026_04_05_2026.xlsx';
const workbook = XLSX.readFile(targetFile);
const sheetName = 'Tổng hợp';
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
console.log(JSON.stringify(data[0]));
console.log(JSON.stringify(data[1]));
console.log(JSON.stringify(data[2]));
console.log(JSON.stringify(data[3]));
