import ExcelJS from 'exceljs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function readAllExcelData(filePath: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1);
  const data: Map<string, { title: string, ton: number, huy: number }> = new Map();

  worksheet?.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header
    const rawCode = row.getCell(2).value;
    const masp = typeof rawCode === 'object' && rawCode !== null ? (rawCode as any).result : rawCode?.toString();
    
    if (masp && masp.startsWith('I')) {
      data.set(masp, {
        title: (row.getCell(3).value as any)?.result || row.getCell(3).value?.toString() || '',
        ton: Number(row.getCell(5).value || 0),
        huy: Number(row.getCell(6).value || 0),
      });
    }
  });
  return data;
}

async function main() {
  const file4 = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 4-5.xlsx';
  const file5 = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx';

  console.log('Reading Excel files...');
  const data4 = await readAllExcelData(file4);
  const data5 = await readAllExcelData(file5);

  const allMasp = Array.from(new Set([...data4.keys(), ...data5.keys()]));
  console.log(`Found ${allMasp.length} products to check.`);

  const results: any[] = [];

  for (const masp of allMasp) {
    const d4 = data4.get(masp);
    const d5 = data5.get(masp);

    if (!d4 || !d5) continue; // Only check if in both files for continuity

    // Query DB for transactions between 4-5 and 5-5
    // Note: Excel 4-5 likely end of day 4, Excel 5-5 end of day 5.
    // So we check transactions on May 5th (from 2026-05-05T00:00:00 to 2026-05-05T23:59:59)
    // Actually, TGNCC-VQ00009 was 2026-05-04T23:00, which might be "May 5th" in local time or included in May 5th report.
    // Let's use a wide range to be safe.
    
    const startTime = new Date('2026-05-04T17:00:00Z'); // Roughly end of business day 4
    const endTime = new Date('2026-05-05T17:00:00Z'); // Roughly end of business day 5

    const sp = await prisma.sanpham.findUnique({ where: { masp } });
    if (!sp) continue;

    const receivedAgg = await prisma.dathangsanpham.aggregate({
      where: {
        idSP: sp.id,
        dathang: {
          status: 'danhan',
          updatedAt: { gte: startTime, lte: endTime }
        }
      },
      _sum: { slnhan: true }
    });

    const deliveredAgg = await prisma.donhangsanpham.aggregate({
      where: {
        idSP: sp.id,
        donhang: {
          status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
          updatedAt: { gte: startTime, lte: endTime }
        }
      },
      _sum: { slnhan: true, sldat: true }
    });

    const received = Number(receivedAgg._sum?.slnhan || 0);
    const delivered = Number(deliveredAgg._sum?.slnhan || deliveredAgg._sum?.sldat || 0);

    const expected = d4.ton + received - delivered - d5.huy;
    const diff = d5.ton - expected;

    if (Math.abs(diff) > 0.001 || received > 0 || delivered > 0) {
      results.push({
        masp,
        title: d4.title,
        day4: d4.ton,
        received,
        delivered,
        waste: d5.huy,
        expected,
        day5: d5.ton,
        diff
      });
    }
  }

  console.log('--- Inventory Consistency Report ---');
  console.table(results.filter(r => Math.abs(r.diff) > 0.1).slice(0, 20)); // Show top discrepancies
  console.log(`Total checked: ${results.length}`);
  console.log(`Perfect matches: ${allMasp.length - results.filter(r => Math.abs(r.diff) > 0.1).length}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
