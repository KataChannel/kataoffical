
const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const prisma = new PrismaClient();

async function listNonZeroStockNotInExcel() {
  try {
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 6-5.xlsx';
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelRows = XLSX.utils.sheet_to_json(worksheet);
    
    // Create a set of masp from Excel for fast lookup
    const excelMaspSet = new Set(excelRows.map(row => row.masp).filter(Boolean));
    console.log(`Excel file contains ${excelMaspSet.size} unique product codes.`);

    // Query DB for all items with non-zero stock
    const nonZeroItems = await prisma.tonKho.findMany({
      where: {
        OR: [
          { slton: { not: 0 } },
          { sltontt: { not: 0 } }
        ]
      },
      include: {
        sanpham: {
          select: {
            masp: true,
            title: true,
            dvt: true
          }
        }
      }
    });

    console.log(`Found ${nonZeroItems.length} non-zero stock items in the database.`);

    // Filter items NOT in Excel
    const extraItems = nonZeroItems.filter(item => !excelMaspSet.has(item.sanpham?.masp));

    if (extraItems.length === 0) {
      console.log('No extra non-zero stock items found.');
      return;
    }

    console.log(`\nFound ${extraItems.length} items with non-zero stock NOT in Excel:\n`);
    console.log('Mã SP | Tên Sản Phẩm | DVT | SL Tồn | Tồn Thực Tế');
    console.log('--------------------------------------------------');
    
    extraItems.forEach(item => {
      console.log(`${item.sanpham?.masp || 'N/A'} | ${item.sanpham?.title || 'N/A'} | ${item.sanpham?.dvt || ''} | ${item.slton} | ${item.sltontt}`);
    });

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

listNonZeroStockNotInExcel();
