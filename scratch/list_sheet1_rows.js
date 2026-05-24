const XLSX = require('/home/kata/Coding/rausachfinal/frontend/node_modules/xlsx/xlsx.js');

async function main() {
  const workbook = XLSX.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 22-5.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const excelData = XLSX.utils.sheet_to_json(worksheet);

  console.log(`Total rows in Excel sheet1: ${excelData.length}`);
  const activeRows = excelData.filter(row => {
    const slton = parseFloat(row['slton'] || '0');
    const slhuy = parseFloat(row['slhuy'] || '0');
    return slton > 0 || slhuy > 0;
  });

  console.log(`Active rows (stock > 0 or damage > 0): ${activeRows.length}`);
  activeRows.slice(0, 50).forEach((row, i) => {
    console.log(`${i+1}: ${row.masp} | ${row.title} | Tồn: ${row.slton} | Hủy: ${row.slhuy}`);
  });
}

main();
