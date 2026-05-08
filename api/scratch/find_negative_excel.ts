import ExcelJS from 'exceljs';

async function readExcel() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx');
  
  workbook.eachSheet((worksheet, sheetId) => {
    console.log(`Sheet: ${worksheet.name}`);
    const headers: any[] = [];
    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
      headers[colNumber] = cell.value;
    });
    console.log(`  Headers: ${JSON.stringify(headers)}`);

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        if (typeof cell.value === 'number' && cell.value < 0) {
          console.log(`  Row ${rowNumber}, Col ${colNumber} (${headers[colNumber]}): ${cell.value}`);
        } else if (cell.value && typeof cell.value === 'object' && 'result' in cell.value) {
            const res = (cell.value as any).result;
            if (typeof res === 'number' && res < 0) {
                console.log(`  Row ${rowNumber}, Col ${colNumber} (${headers[colNumber]}) [Result]: ${res}`);
            }
        }
      });
    });
  });
}

readExcel().catch(console.error);
