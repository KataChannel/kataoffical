const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Try to read .env file to print DB URL
try {
  const envContent = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
  console.log(".env content snippet:\n", envContent.split('\n').filter(line => line.includes('DATABASE_URL') || line.includes('DB_URL')).join('\n'));
} catch (e) {
  console.log("Could not read .env file:", e.message);
}

const prisma = new PrismaClient();

async function main() {
  console.log("\n--- DATABASE INVESTIGATION ---");
  const totalProducts = await prisma.sanpham.count();
  console.log("Total products in database:", totalProducts);

  const lastChotkho = await prisma.chotkho.findFirst({
    orderBy: { ngaychot: 'desc' }
  });
  if (lastChotkho) {
    console.log("Last Chotkho session:", {
      id: lastChotkho.id,
      title: lastChotkho.title,
      ngaychot: lastChotkho.ngaychot.toISOString(),
      codeId: lastChotkho.codeId
    });
  } else {
    console.log("No Chotkho sessions found.");
  }

  // Find Chotkho sessions on 31-05-2026
  const chotkhosToday = await prisma.chotkho.findMany({
    where: {
      ngaychot: {
        gte: new Date('2026-05-31T00:00:00+07:00'),
        lte: new Date('2026-05-31T23:59:59+07:00')
      }
    }
  });
  console.log(`Chotkho sessions on 2026-05-31: ${chotkhosToday.length}`);
  chotkhosToday.forEach(c => {
    console.log(`- ID: ${c.id}, Title: ${c.title}, NgayChot: ${c.ngaychot.toISOString()}`);
  });

  console.log("\n--- EXCEL FILE INVESTIGATION ---");
  const excelPath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 31-5.xlsx';
  if (!fs.existsSync(excelPath)) {
    console.log(`Excel file does NOT exist at ${excelPath}`);
    return;
  }
  const workbook = XLSX.readFile(excelPath);
  console.log("Sheets in Excel file:", workbook.SheetNames);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  console.log(`Total rows in first sheet: ${rows.length}`);
  console.log("First 5 rows:");
  rows.slice(0, 5).forEach((r, i) => console.log(`  Row ${i}:`, r));

  // Determine headers
  let headerRowIndex = -1;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row && (row.includes('masp') || row.includes('Mã sản phẩm') || row.includes('title') || row.includes('slton'))) {
      headerRowIndex = i;
      break;
    }
  }
  console.log("Header row index:", headerRowIndex);
  if (headerRowIndex !== -1) {
    const header = rows[headerRowIndex];
    console.log("Header fields:", header);
    const colIdx = {
      masp: header.indexOf('masp'),
      title: header.indexOf('title'),
      slton: header.indexOf('slton'),
      slhuy: header.indexOf('slhuy')
    };
    console.log("Column indices:", colIdx);

    let validRows = 0;
    const sampleRows = [];
    for (let i = headerRowIndex + 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row) continue;
      const masp = row[colIdx.masp];
      if (!masp || masp.toString().trim() === '') continue;
      validRows++;
      if (sampleRows.length < 5) {
        sampleRows.push({
          masp: masp.toString().trim(),
          title: row[colIdx.title],
          slton: parseFloat(row[colIdx.slton]) || 0,
          slhuy: parseFloat(row[colIdx.slhuy]) || 0
        });
      }
    }
    console.log(`Number of rows with valid masp: ${validRows}`);
    console.log("Sample extracted data:", sampleRows);
  } else {
    // try sheet_to_json
    const dataJson = XLSX.utils.sheet_to_json(worksheet);
    console.log(`sheet_to_json parsed rows: ${dataJson.length}`);
    if (dataJson.length > 0) {
      console.log("Keys in first row:", Object.keys(dataJson[0]));
      console.log("First row:", dataJson[0]);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
