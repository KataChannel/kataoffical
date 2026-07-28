const XLSX = require('xlsx');

const excelPath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 21-5.xlsx';

try {
  console.log(`--- Inspecting CODE sheet in ${excelPath} ---`);
  const workbook = XLSX.readFile(excelPath);
  const codeSheetName = 'CODE';
  if (!workbook.SheetNames.includes(codeSheetName)) {
    console.log("CODE sheet does not exist!");
    process.exit(0);
  }
  const worksheet = workbook.Sheets[codeSheetName];
  const rows = XLSX.utils.sheet_to_json(worksheet);
  console.log(`Total rows in CODE sheet: ${rows.length}`);
  
  if (rows.length > 0) {
    console.log("Sample rows in CODE sheet (first 5):");
    console.log(rows.slice(0, 5));
  }

  // Check if any row matches our target MASP
  const targetMasp = ['I100676', 'I100815', 'I100613', 'I100891', 'I101133', 'I100129', 'I100508', 'I100470', 'I100316', 'I100030'];
  const matches = rows.filter(r => {
    return Object.values(r).some(val => targetMasp.includes(String(val).trim()));
  });

  console.log(`\nFound ${matches.length} matching rows in CODE sheet:`);
  console.log(matches);

} catch (err) {
  console.error("Error reading file:", err);
}
