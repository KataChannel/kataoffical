import ExcelJS from 'exceljs';

async function readExcel() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx');
  const worksheet = workbook.worksheets[0];

  const headers: any[] = [];
  worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
    headers[colNumber] = cell.value;
  });

  console.log('Headers:', JSON.stringify(headers));

  // Also print first row of data
  const firstRow: any[] = [];
  worksheet.getRow(2).eachCell({ includeEmpty: true }, (cell, colNumber) => {
    firstRow[colNumber] = cell.value;
  });
  console.log('First Row:', JSON.stringify(firstRow));
}

readExcel().catch(console.error);
