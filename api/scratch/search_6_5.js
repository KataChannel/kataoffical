
const xlsx = require('xlsx');
const workbook = xlsx.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 6-5.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

const target = data.find(row => 
    Object.values(row).some(val => val && val.toString().includes('Mãng Cầu Xiêm')) ||
    Object.values(row).some(val => val && val.toString().includes('I100727'))
);

console.log(JSON.stringify(target, null, 2));
