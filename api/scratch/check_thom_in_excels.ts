import XLSX from 'xlsx';

function checkFile(filePath: string, dateLabel: string) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows: any[] = XLSX.utils.sheet_to_json(worksheet);

    console.log(`\n--- Check Excel: ${dateLabel} (${filePath}) ---`);
    const found = rows.filter(r => String(r.masp).trim() === 'I101127' || String(r.title).toLowerCase().includes('thơm xanh'));
    if (found.length > 0) {
      found.forEach(f => {
        console.log(`Found: masp=${f.masp}, title=${f.title}, slton=${f.slton}, slhuy=${f.slhuy}`);
      });
    } else {
      console.log('❌ Not found in Excel');
    }
  } catch (err: any) {
    console.error(`Error reading ${filePath}:`, err.message);
  }
}

checkFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 06-6 (1).xlsx', 'June 6');
checkFile('/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 07-6.xlsx', 'June 7');
