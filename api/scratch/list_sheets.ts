import ExcelJS from 'exceljs';

async function listSheets() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx');
  
  workbook.eachSheet((worksheet) => {
    console.log(`Sheet: ${worksheet.name}`);
    const row1 = worksheet.getRow(1);
    const headers: any[] = [];
    row1.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      headers[colNumber] = cell.value;
    });
    console.log(`  Headers: ${JSON.stringify(headers)}`);
  });
}

listSheets().catch(console.error);
