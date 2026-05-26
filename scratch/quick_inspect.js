const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const fs = require('fs');

const prisma = new PrismaClient();
const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function main() {
  try {
    const excelPath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 26-5.xlsx';
    console.log(`Reading Excel file: ${excelPath}`);
    const workbook = XLSX.readFile(excelPath);
    
    // Let's list sheet names
    console.log("Sheet names:", workbook.SheetNames);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelRows = XLSX.utils.sheet_to_json(worksheet);
    
    const excelMap = new Map();
    excelRows.forEach(row => {
      if (row.masp) {
        excelMap.set(String(row.masp).trim(), {
          slton: parseFloat(row.slton) || 0,
          slhuy: parseFloat(row.slhuy) || 0,
          title: row.tensp || row.title || ''
        });
      }
    });

    console.log(`Loaded ${excelMap.size} products from Excel.`);

    // Codes in the user's report image:
    const targetCodes = [
      'I100270', 'I100479', 'I100233', 'I100103', 'I100014', 
      'I100105', 'I100220', 'I100102', 'I100815', 'I100612', 
      'I100090', 'I101266', 'I100120', 'I100507', 'I100204', 
      'I100208', 'I100405', 'I100171', 'I100168', 'I100028', 
      'I100142', 'I100064'
    ];

    console.log(`Querying DB for ${targetCodes.length} target products...`);
    const dbProducts = await prisma.sanpham.findMany({
      where: {
        masp: { in: targetCodes }
      },
      include: {
        SanphamKho: {
          where: { khoId: KHO_TONG_ID }
        },
        TonKho: true
      }
    });

    // Find the latest Chotkho for May 26th
    const latestChotkho = await prisma.chotkho.findFirst({
      where: {
        ngaychot: {
          gte: new Date('2026-05-26T00:00:00+07:00'),
          lte: new Date('2026-05-26T23:59:59+07:00')
        }
      },
      orderBy: { createdAt: 'desc' },
      include: {
        details: true
      }
    });

    console.log("Latest Chotkho details:");
    if (latestChotkho) {
      console.log(`ID: ${latestChotkho.id}, Title: ${latestChotkho.title}, Date: ${latestChotkho.ngaychot}`);
      console.log(`Total details in this chotkho: ${latestChotkho.details.length}`);
    } else {
      console.log("No Chotkho found for 2026-05-26!");
    }

    const results = [];
    
    dbProducts.forEach(sp => {
      const masp = sp.masp;
      const excelRow = excelMap.get(masp);
      
      const dbSoluongKho = sp.SanphamKho && sp.SanphamKho[0] ? parseFloat(sp.SanphamKho[0].soluong) : 0;
      const dbTonKhoSlton = sp.TonKho ? parseFloat(sp.TonKho.slton) : 0;
      const dbTonKhoSltontt = sp.TonKho ? parseFloat(sp.TonKho.sltontt) : 0;

      // Find in Chotkho details
      let chotDetail = null;
      if (latestChotkho) {
        chotDetail = latestChotkho.details.find(d => d.sanphamId === sp.id);
      }

      results.push({
        masp,
        title: sp.title,
        dvt: sp.dvt,
        excel_slton: excelRow ? excelRow.slton : '#N/A',
        excel_slhuy: excelRow ? excelRow.slhuy : '#N/A',
        db_sanphamkho: dbSoluongKho,
        db_tonkho_slton: dbTonKhoSlton,
        db_tonkho_sltontt: dbTonKhoSltontt,
        chot_sltonhethong: chotDetail ? parseFloat(chotDetail.sltonhethong) : 'N/A',
        chot_sltonthucte: chotDetail ? parseFloat(chotDetail.sltonthucte) : 'N/A',
        chot_chenhlech: chotDetail ? parseFloat(chotDetail.chenhlech) : 'N/A',
        chot_ghichu: chotDetail ? chotDetail.ghichu : 'N/A'
      });
    });

    console.log("\n--- COMPARISON RESULTS ---");
    console.table(results);

    // Save to file for further study
    fs.writeFileSync('/home/kata/Coding/rausachfinal/scratch/inspect_2605_results.json', JSON.stringify(results, null, 2));
    console.log("Saved results to scratch/inspect_2605_results.json");

  } catch (error) {
    console.error("Error in main:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
