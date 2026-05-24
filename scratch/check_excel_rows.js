const XLSX = require('xlsx');

const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 22-5.xlsx';
const workbook = XLSX.readFile(filePath);
const sheet1 = workbook.Sheets['sheet1'];
const data = XLSX.utils.sheet_to_json(sheet1);

const targetCodes = ['I100275', 'I100260', 'I100051', 'I100207', 'I100229', 'I100220', 'I100270', 'I100008', 'I100043', 'I100208'];

console.log('--- PRODUCTS IN EXCEL FILE ---');
data.forEach(row => {
  if (targetCodes.includes(row.masp)) {
    console.log(`- ${row.masp} | ${row.title.padEnd(30)} | slton: ${row.slton} | slhuy: ${row.slhuy}`);
  }
});
