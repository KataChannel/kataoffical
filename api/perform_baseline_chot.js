
const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const prisma = new PrismaClient();

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function performBaselineChot() {
  try {
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 6-5.xlsx';
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelRows = XLSX.utils.sheet_to_json(worksheet);
    
    // Map of masp -> qty from Excel
    const excelData = new Map();
    excelRows.forEach(row => {
      if (row.masp) {
        excelData.set(row.masp, Number(row.slton || 0));
      }
    });

    console.log(`Excel file loaded with ${excelData.size} products.`);

    // Get all products from DB
    const allProducts = await prisma.sanpham.findMany({
      select: { id: true, masp: true, title: true }
    });

    console.log(`Processing baseline for ${allProducts.length} total products in database...`);

    let countExcel = 0;
    let countReset = 0;

    // Use a transaction for batch updates
    // Actually, updateMany is better but we have individual values.
    // We'll process in chunks to avoid overwhelming the DB.
    const chunks = [];
    const chunkSize = 50;
    for (let i = 0; i < allProducts.length; i += chunkSize) {
      chunks.push(allProducts.slice(i, i + chunkSize));
    }

    for (const chunk of chunks) {
      await Promise.all(chunk.map(async (sp) => {
        const targetQty = excelData.has(sp.masp) ? excelData.get(sp.masp) : 0;
        
        if (excelData.has(sp.masp)) countExcel++;
        else countReset++;

        // 1. Update TonKho
        await prisma.tonKho.upsert({
          where: { sanphamId: sp.id },
          create: {
            sanphamId: sp.id,
            slton: targetQty,
            sltontt: targetQty,
            slchogiao: 0,
            slchonhap: 0
          },
          update: {
            slton: targetQty,
            sltontt: targetQty,
            updatedAt: new Date()
          }
        });

        // 2. Update SanphamKho for KHO_TONG
        await prisma.sanphamKho.upsert({
          where: {
            sanphamId_khoId: {
              sanphamId: sp.id,
              khoId: KHO_TONG_ID
            }
          },
          create: {
            sanphamId: sp.id,
            khoId: KHO_TONG_ID,
            soluong: targetQty
          },
          update: {
            soluong: targetQty,
            updatedAt: new Date()
          }
        });
      }));
    }

    console.log('\nBaseline Baseline complete:');
    console.log(`- Products updated from Excel: ${countExcel}`);
    console.log(`- Products reset to 0 (not in Excel): ${countReset}`);
    console.log(`- Total processed: ${allProducts.length}`);

  } catch (error) {
    console.error('Error during baseline chot:', error);
  } finally {
    await prisma.$disconnect();
  }
}

performBaselineChot();
