const XLSX = require('/home/kata/Coding/rausachfinal/frontend/node_modules/xlsx/xlsx.js');
const fs = require('fs');

const workbook = XLSX.readFile('/home/kata/Coding/rausachfinal/doisoat/Copy of Ton-Huy 4-5.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

// Standardize column names based on common mapping
const standardizedData = data.map(row => ({
  masp: row['masp'] || row['Mã SP'] || row['MÃ SẢN PHẨM'] || '',
  title: row['title'] || row['Tên SP'] || row['TÊN SẢN PHẨM'] || '',
  slton: parseFloat(row['slton'] || row['Số lượng'] || row['Tồn thực tế'] || row['SỐ LƯỢNG'] || '0'),
  slhuy: parseFloat(row['slhuy'] || row['Hủy'] || row['HỦY'] || '0')
})).filter(row => row.masp);

console.log(JSON.stringify(standardizedData));
