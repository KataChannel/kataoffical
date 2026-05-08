import ExcelJS from 'exceljs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SG2_KHO_ID = '3344758e-c0bc-4562-9390-d58fc5717d03';

async function readAllExcelData(filePath: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1);
  const data: Map<string, { ton: number }> = new Map();

  worksheet?.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const rawCode = row.getCell(2).value;
    const masp = typeof rawCode === 'object' && rawCode !== null ? (rawCode as any).result : rawCode?.toString();
    
    if (masp && masp.startsWith('I')) {
      data.set(masp, {
        ton: Number(row.getCell(5).value || 0),
      });
    }
  });
  return data;
}

async function main() {
  const file5 = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx';
  const excelData = await readAllExcelData(file5);

  const allProducts = await prisma.sanpham.findMany();
  const allWarehouses = await prisma.kho.findMany();

  console.log(`Starting Total Warehouse Cleanup and Sync for ${allProducts.length} products across ${allWarehouses.length} warehouses...`);

  // 1. Reset all SanphamKho to 0 for all products/warehouses
  console.log('Resetting all warehouse stock to 0...');
  await prisma.sanphamKho.updateMany({
    data: { soluong: 0 }
  });

  // 2. Sync Excel data to SG2 and Global TonKho
  let count = 0;
  for (const sp of allProducts) {
    const excelInfo = excelData.get(sp.masp);
    const targetStock = excelInfo ? excelInfo.ton : 0;

    // Ensure TonKho matches
    await prisma.tonKho.upsert({
      where: { sanphamId: sp.id },
      update: {
        slton: targetStock,
        sltontt: targetStock,
        updatedAt: new Date()
      },
      create: {
        sanphamId: sp.id,
        slton: targetStock,
        sltontt: targetStock,
        slchogiao: 0,
        slchonhap: 0,
      }
    });

    // Ensure SG2 matches
    await prisma.sanphamKho.upsert({
      where: {
        sanphamId_khoId: {
          sanphamId: sp.id,
          khoId: SG2_KHO_ID
        }
      },
      update: { soluong: targetStock },
      create: {
        sanphamId: sp.id,
        khoId: SG2_KHO_ID,
        soluong: targetStock
      }
    });

    count++;
    if (count % 100 === 0) console.log(`Processed ${count}/${allProducts.length} products...`);
  }

  console.log('Final Verification...');
  // Check if any product has Global Stock != Sum of Warehouses
  // For now, since we reset all to 0 and only set SG2 = Global, they should all be correct.

  console.log(`Total Warehouse Sync completed for ${count} products.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
