import ExcelJS from 'exceljs';

async function findProduct() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx');
  const worksheet = workbook.worksheets[0];

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      const val = String(cell.value || '');
      if (val.includes('I100470') || val.includes('Dưa lưới')) {
        console.log(`Found at Row ${rowNumber}, Col ${colNumber}: ${val}`);
        console.log(`Row values: ${JSON.stringify(row.values)}`);
      }
    });
  });
}

findProduct().catch(console.error);
