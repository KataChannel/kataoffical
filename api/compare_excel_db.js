
const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const prisma = new PrismaClient();

async function compareExcelWithDB() {
  try {
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 6-5.xlsx';
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelRows = XLSX.utils.sheet_to_json(worksheet);

    console.log(`Excel file loaded: ${excelRows.length} items.\n`);

    const discrepancies = [];
    const matched = [];
    const notFound = [];

    for (const row of excelRows) {
      const masp = row.masp;
      const excelQty = Number(row.slton || 0);

      const dbTonKho = await prisma.tonKho.findFirst({
        where: {
          sanpham: {
            masp: masp
          }
        },
        include: {
          sanpham: true
        }
      });

      if (!dbTonKho) {
        notFound.push({ masp, title: row.title, excelQty });
        continue;
      }

      const dbQty = Number(dbTonKho.slton);
      const dbQtyTT = Number(dbTonKho.sltontt);

      if (dbQty === excelQty && dbQtyTT === excelQty) {
        matched.push({ masp, title: row.title, excelQty });
      } else {
        discrepancies.push({
          masp,
          title: row.title,
          excelQty,
          dbQty,
          dbQtyTT
        });
      }
    }

    console.log(`Summary:`);
    console.log(`- Matched: ${matched.length}`);
    console.log(`- Discrepancies: ${discrepancies.length}`);
    console.log(`- Not Found in DB: ${notFound.length}\n`);

    if (discrepancies.length > 0) {
      console.log('DISCREPANCIES:');
      console.log('Mã SP | Tên SP | Excel | DB (Sổ sách) | DB (Thực tế)');
      console.log('------------------------------------------------------');
      discrepancies.forEach(d => {
        console.log(`${d.masp} | ${d.title} | ${d.excelQty} | ${d.dbQty} | ${d.dbQtyTT}`);
      });
    }

    if (notFound.length > 0) {
      console.log('\nNOT FOUND IN DB:');
      notFound.forEach(n => console.log(`${n.masp} | ${n.title}`));
    }

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

compareExcelWithDB();
