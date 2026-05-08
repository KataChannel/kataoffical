import ExcelJS from 'exceljs';

async function readStock(filePath: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1);
  let data: any = null;

  worksheet?.eachRow((row, rowNumber) => {
    const rawCode = row.getCell(2).value;
    const masp = typeof rawCode === 'object' && rawCode !== null ? (rawCode as any).result : rawCode?.toString();
    
    if (masp === 'I100270') {
      data = {
        title: (row.getCell(3).value as any)?.result || row.getCell(3).value,
        masp: masp,
        ton: row.getCell(5).value, // SL Tồn
        huy: row.getCell(6).value, // SL Hủy
      };
    }
  });
  return data;
}

async function main() {
  const file4 = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 4-5.xlsx';
  const file5 = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx';

  const data4 = await readStock(file4);
  const data5 = await readStock(file5);

  console.log('--- Trứng bắc thảo (I100270) ---');
  console.log('Ngày 4-5:', data4);
  console.log('Ngày 5-5:', data5);
}

main().catch(console.error);
