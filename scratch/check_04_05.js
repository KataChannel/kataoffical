
const xlsx = require('xlsx');
const workbook = xlsx.readFile('/home/kata/Coding/rausachfinal/doisoat/VanDon_TongHop_04-05-2026_04_05_2026.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

const result = data.find(row => 
    JSON.stringify(row).includes('I100727')
);
console.log(result);
