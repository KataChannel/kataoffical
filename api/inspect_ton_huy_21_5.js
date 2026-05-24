const XLSX = require('xlsx');

const excelPath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 21-5.xlsx';
const targetMasp = [
  'I100676', // Me Hộp
  'I100815', // Hoa décor
  'I100613', // Xoài tứ quý
  'I100891', // Thơm chín
  'I101133', // Kèo nèo bó
  'I100129', // Khoai Tây TQ
  'I100508', // Xoài cát Hòa Lộc
  'I100470', // Dưa lưới
  'I100316', // Chả quế
  'I100030', // Bông so đũa
];

try {
  console.log(`--- Inspecting ${excelPath} ---`);
  const workbook = XLSX.readFile(excelPath);
  console.log("Sheets in file:", workbook.SheetNames);
  
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(worksheet);
  console.log(`Total rows in sheet: ${rows.length}`);

  // Let's check if the headers have 'masp' or similar
  if (rows.length > 0) {
    console.log("First row keys:", Object.keys(rows[0]));
  }

  const found = [];
  const notFound = [];

  targetMasp.forEach(masp => {
    const matchedRow = rows.find(r => r.masp && String(r.masp).trim() === masp);
    if (matchedRow) {
      found.push({ masp, title: matchedRow.title || matchedRow.title2, slton: matchedRow.slton, slhuy: matchedRow.slhuy });
    } else {
      notFound.push(masp);
    }
  });

  console.log("\n--- Products Found in Ton-Huy 21-5.xlsx ---");
  console.table(found);

  console.log("\n--- Products NOT Found in Ton-Huy 21-5.xlsx ---");
  console.log(notFound.join(', '));

} catch (err) {
  console.error("Error reading file:", err);
}
