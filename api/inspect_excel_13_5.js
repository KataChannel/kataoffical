const XLSX = require('xlsx');
const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 13-5.xlsx';

try {
  const workbook = XLSX.readFile(filePath);
  const sheetNames = workbook.SheetNames;
  console.log('Sheet Names:', sheetNames);
  
  const sheetName = sheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);
  
  if (data.length > 0) {
    console.log('First row keys:', Object.keys(data[0]));
    console.log('Sample data (first 3 rows):', data.slice(0, 3));
  } else {
    console.log('Sheet is empty.');
  }
} catch (error) {
  console.error('Error reading Excel:', error.message);
}
