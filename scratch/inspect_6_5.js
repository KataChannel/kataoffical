
const xlsx = require('xlsx');
const workbook = xlsx.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 6-5.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

console.log("Sample rows:");
console.log(data.slice(0, 10));

const results = data.filter(row => 
    JSON.stringify(row).toLowerCase().includes('mãng')
);
console.log("Mãng results:");
console.log(results);
