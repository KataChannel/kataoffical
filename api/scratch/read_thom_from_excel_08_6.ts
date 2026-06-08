import * as XLSX from 'xlsx';
import * as path from 'path';

async function main() {
  const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 08-6.xlsx';
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet) as any[];

  console.log(`=== Reading file: ${filePath} (Sheet: ${sheetName}) ===`);
  console.log(`Total rows: ${data.length}`);

  // Find headers and print rows related to "thơm"
  for (const row of data) {
    const values = Object.values(row).map(v => String(v).toLowerCase());
    const hasThom = values.some(v => v.includes('thơm') && !v.includes('rau thơm'));
    if (hasThom) {
      console.log(JSON.stringify(row));
    }
  }
}

main().catch(console.error);
