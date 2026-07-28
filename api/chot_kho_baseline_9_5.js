
const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const prisma = new PrismaClient();

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function performBaselineChot() {
  try {
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 9-5.xlsx';
    console.log(`--- Processing file: ${filePath} ---`);
    
    const workbook = XLSX.readFile(filePath);
    const sheetName = 'sheet1'; 
    const worksheet = workbook.Sheets[sheetName];
    const excelRows = XLSX.utils.sheet_to_json(worksheet);
    
    // Map of masp -> { slton, slhuy }
    const excelData = new Map();
    excelRows.forEach(row => {
      if (row.masp) {
        excelData.set(row.masp, {
          slton: Number(row.slton || 0),
          slhuy: Number(row.slhuy || 0)
        });
      }
    });

    console.log(`Excel file loaded with ${excelData.size} products.`);

    // Get all products from DB to map masp to id and get current stock
    const allProducts = await prisma.sanpham.findMany({
      include: {
        TonKho: true,
        SanphamKho: {
          where: { khoId: KHO_TONG_ID }
        }
      }
    });

    console.log(`Processing baseline for ${allProducts.length} total products in database...`);

    // Create Master Chotkho record
    const chotkhoMaster = await prisma.chotkho.create({
      data: {
        ngaychot: new Date('2026-05-09T23:59:59'), // Set to end of day
        title: `Chốt kho Base Line 09-05-2026`,
        ghichu: 'Chốt kho Base Line từ file Ton-Huy 9-5.xlsx',
        khoId: KHO_TONG_ID,
        codeId: `CHOTKHO_BASELINE_0905_${Date.now()}`,
        isActive: true
      }
    });

    console.log(`Created master chotkho record: ${chotkhoMaster.id}`);

    let countExcel = 0;
    let countReset = 0;

    // Use a transaction for the entire operation to ensure integrity
    await prisma.$transaction(async (tx) => {
      for (const sp of allProducts) {
        const hasExcel = excelData.has(sp.masp);
        const excelRow = hasExcel ? excelData.get(sp.masp) : { slton: 0, slhuy: 0 };
        
        const sltonhethong = Number(sp.SanphamKho[0]?.soluong || 0);
        const sltonthucte = excelRow.slton;
        const slhuy = excelRow.slhuy;
        const chenhlech = sltonhethong - sltonthucte - slhuy;

        if (hasExcel) countExcel++;
        else countReset++;

        // 1. Create Chotkhodetail
        await tx.chotkhodetail.create({
          data: {
            chotkhoId: chotkhoMaster.id,
            sanphamId: sp.id,
            sltonhethong: sltonhethong,
            sltonthucte: sltonthucte,
            slhuy: slhuy,
            chenhlech: chenhlech,
            ngaychot: chotkhoMaster.ngaychot
          }
        });

        // 2. Update SanphamKho for KHO_TONG
        await tx.sanphamKho.upsert({
          where: {
            sanphamId_khoId: {
              sanphamId: sp.id,
              khoId: KHO_TONG_ID
            }
          },
          create: {
            sanphamId: sp.id,
            khoId: KHO_TONG_ID,
            soluong: sltonthucte
          },
          update: {
            soluong: sltonthucte,
            updatedAt: new Date()
          }
        });

        // 3. Update TonKho
        await tx.tonKho.upsert({
          where: { sanphamId: sp.id },
          create: {
            sanphamId: sp.id,
            slton: sltonthucte,
            sltontt: sltonthucte,
            slchogiao: 0,
            slchonhap: 0
          },
          update: {
            slton: sltonthucte,
            sltontt: sltonthucte,
            updatedAt: new Date()
          }
        });
      }
    }, {
      timeout: 300000 // 5 minutes for large datasets
    });

    console.log('\nBaseline complete:');
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
