import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258'; // KHO - HCM
const TARGET_THOM_XANH_MASP = 'I100220'; // Thơm trái xanh

import * as XLSX from 'xlsx';

async function processSession(chotkhoId: string, excelFilePath: string | null, isLatestSession: boolean) {
  console.log(`\n=== Recalculating and Applying Rules for Session: ${chotkhoId} ===`);

  // 1. Fetch the chotkho record
  const chot = await prisma.chotkho.findUnique({
    where: { id: chotkhoId },
    include: { details: { include: { sanpham: true } } }
  });

  if (!chot) {
    console.error(`❌ Chotkho ${chotkhoId} not found!`);
    return;
  }

  console.log(`Loaded chotkho: ${chot.title} (${chot.id}) with ${chot.details.length} details.`);

  // 2. For each detail, recalculate the correct system stock (sltonhethong)
  console.log('Recalculating system stock from last baseline logs...');
  const recalculatedDetails = [];

  for (const detail of chot.details) {
    const sp = detail.sanpham;
    if (!sp) continue;

    // Find the last baseline chotkhodetail before this chotkho's ngaychot
    const lastChotDetail = await prisma.chotkhodetail.findFirst({
      where: {
        sanphamId: sp.id,
        chotkho: {
          isActive: true,
          ngaychot: { lt: chot.ngaychot }
        }
      },
      orderBy: { ngaychot: 'desc' },
      include: { chotkho: true }
    });

    const startTime = lastChotDetail ? lastChotDetail.ngaychot : new Date(0);
    const initialQty = lastChotDetail ? Number(lastChotDetail.sltonthucte) : 0;

    // Fetch exports (Donhangsanpham)
    const exports = await prisma.donhangsanpham.findMany({
      where: {
        idSP: sp.id,
        donhang: {
          status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
          OR: [
            { ngayHoanThanhThucte: { gt: startTime, lte: chot.ngaychot } },
            { ngayHoanThanhThucte: null, updatedAt: { gt: startTime, lte: chot.ngaychot } }
          ]
        }
      }
    });

    // Fetch imports (Dathangsanpham)
    const imports = await prisma.dathangsanpham.findMany({
      where: {
        idSP: sp.id,
        dathang: {
          status: 'danhan',
          OR: [
            { ngayHoanThanhThucte: { gt: startTime, lte: chot.ngaychot } },
            { ngayHoanThanhThucte: null, updatedAt: { gt: startTime, lte: chot.ngaychot } }
          ]
        }
      }
    });

    const totalExports = exports.reduce((sum, x) => sum + Number(x.slnhan || x.slgiao || x.sldat || 0), 0);
    const totalImports = imports.reduce((sum, n) => sum + Number(n.slnhan || n.slgiao || n.sldat || 0), 0);

    const calculatedSystemStock = initialQty + totalImports - totalExports;

    recalculatedDetails.push({
      detail,
      sp,
      calculatedSystemStock
    });
  }

  // 3. Load Excel data if file path is provided
  const excelData = new Map<string, { slton: number; slhuy: number }>();
  if (excelFilePath) {
    console.log(`Loading Excel data from: ${excelFilePath}`);
    const workbook = XLSX.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelRows = XLSX.utils.sheet_to_json(sheet) as any[];

    excelRows.forEach((row: any) => {
      if (row.masp) {
        excelData.set(String(row.masp).trim(), {
          slton: parseFloat(row.slton) || 0,
          slhuy: parseFloat(row.slhuy) || 0
        });
      }
    });
    console.log(`Loaded ${excelData.size} products from Excel.`);
  }

  // 4. Classify and apply baseline rules
  const processedDetails = new Map();

  for (const item of recalculatedDetails) {
    const { detail, sp, calculatedSystemStock } = item;
    const title = sp.title.toLowerCase();
    const masp = sp.masp.trim();

    // Check if it was in the Excel
    const inExcel = excelData.has(masp);
    const excelRow = inExcel ? excelData.get(masp) : null;

    let sltonhethong = calculatedSystemStock;
    let sltonthucte = inExcel && excelRow ? excelRow.slton : 0;
    let slhuy = inExcel && excelRow ? excelRow.slhuy : 0;
    let note = '';

    const isBap = title.includes('bắp') && !title.includes('cải') && !title.includes('chuối') && !title.includes('đậu') && !title.includes('thịt');
    const isAutoCarry = title.includes('dưa hấu') || isBap || title.includes('cải chua') || title.includes('hành tây');
    const isThom = title.includes('thơm') && !title.includes('rau thơm');

    if (inExcel) {
      note = `Cập nhật từ Excel (Áp dụng rule: có trong Excel)`;
      if (sltonhethong < 0) {
        sltonhethong = 0;
        note = `Cập nhật từ Excel (Tồn hệ thống âm tự động reset về 0)`;
      }
    } else if (sltonhethong < 0) {
      sltonhethong = 0;
      sltonthucte = 0;
      slhuy = 0;
      note = 'Tự động reset kho âm về 0 (Rules.md)';
    } else {
      if (isAutoCarry) {
        sltonthucte = sltonhethong;
        note = 'Tự động đưa qua (không có trong Excel - Auto-carried)';
      } else if (isThom) {
        const isThomXanh = masp === TARGET_THOM_XANH_MASP;
        const isThomGot = title.includes('gọt');

        if (isThomXanh || isThomGot) {
          sltonthucte = sltonhethong;
          note = 'Tự động đưa qua (Thơm trái xanh/Thơm gọt - Auto-carried)';
        } else {
          sltonthucte = 0;
          slhuy = 0;
          note = 'Thơm khác reset về 0 (không có trong Excel - Rules.md)';
        }
      } else {
        sltonthucte = 0;
        slhuy = 0;
        note = 'Reset về 0 (không có trong Excel - Rules.md)';
      }
    }

    processedDetails.set(sp.id, {
      id: detail.id,
      sanphamId: sp.id,
      masp,
      title: sp.title,
      isThom,
      titleLower: title,
      sltonhethong,
      sltonthucte,
      slhuy,
      ghichu: note,
      originalDetail: detail
    });
  }

  // 4. Pineapple Consolidation
  let targetThomXanh: any = null;
  for (const p of processedDetails.values()) {
    if (p.masp === TARGET_THOM_XANH_MASP) {
      targetThomXanh = p;
      break;
    }
  }

  if (targetThomXanh) {
    let extraActual = 0;
    let extraSystem = 0;
    let extraHuy = 0;

    for (const p of processedDetails.values()) {
      if (p.isThom && p.masp !== TARGET_THOM_XANH_MASP) {
        const isThomGot = p.titleLower.includes('gọt');
        if (!isThomGot) {
          extraActual += p.sltonthucte;
          extraSystem += p.sltonhethong;
          extraHuy += p.slhuy;

          p.sltonhethong = 0;
          p.sltonthucte = 0;
          p.slhuy = 0;
          p.ghichu = `Quy đổi tồn kho về Thơm trái xanh [${TARGET_THOM_XANH_MASP}] (Rules.md)`;
        }
      }
    }

    if (extraActual > 0 || extraSystem > 0 || extraHuy > 0) {
      targetThomXanh.sltonthucte += extraActual;
      targetThomXanh.sltonhethong += extraSystem;
      targetThomXanh.slhuy += extraHuy;
      targetThomXanh.ghichu += ` (Nhận quy đổi từ các loại thơm khác: +${extraActual} thực tế, +${extraSystem} hệ thống, +${extraHuy} hủy)`;
      console.log(`[Thơm Consolidation] Consolidated to Thơm trái xanh [${TARGET_THOM_XANH_MASP}]: extraActual=+${extraActual}, extraSystem=+${extraSystem}, extraHuy=+${extraHuy}`);
    }
  }

  // 5. Database updates (optimized and sequential to avoid deadlocks)
  console.log('Starting DB Updates...');
  let updatedCount = 0;

  for (const p of processedDetails.values()) {
    const orig = p.originalDetail;
    const chenhlech = p.sltonhethong - p.sltonthucte - p.slhuy;

    const hasDetailChange = 
      Number(orig.sltonhethong) !== p.sltonhethong ||
      Number(orig.sltonthucte) !== p.sltonthucte ||
      Number(orig.slhuy) !== p.slhuy ||
      orig.ghichu !== p.ghichu;

    const hasStockChange = isLatestSession || Number(orig.sltonthucte) !== p.sltonthucte;

    if (!hasDetailChange && !hasStockChange) {
      continue;
    }

    if (hasDetailChange) {
      // A. Update Chotkhodetail record
      await prisma.chotkhodetail.update({
        where: { id: p.id },
        data: {
          sltonhethong: new Prisma.Decimal(p.sltonhethong),
          sltonthucte: new Prisma.Decimal(p.sltonthucte),
          slhuy: new Prisma.Decimal(p.slhuy),
          chenhlech: new Prisma.Decimal(chenhlech),
          ghichu: p.ghichu
        }
      });
    }

    if (hasStockChange) {
      // B. Update SanphamKho for KHO_TONG_ID
      await prisma.sanphamKho.upsert({
        where: { sanphamId_khoId: { sanphamId: p.sanphamId, khoId: KHO_TONG_ID } },
        create: { sanphamId: p.sanphamId, khoId: KHO_TONG_ID, soluong: new Prisma.Decimal(p.sltonthucte) },
        update: { soluong: new Prisma.Decimal(p.sltonthucte), updatedAt: new Date() }
      });

      // C. Update TonKho (global)
      await prisma.tonKho.upsert({
        where: { sanphamId: p.sanphamId },
        create: { sanphamId: p.sanphamId, slton: new Prisma.Decimal(p.sltonthucte), sltontt: new Prisma.Decimal(p.sltonthucte) },
        update: { slton: new Prisma.Decimal(p.sltonthucte), sltontt: new Prisma.Decimal(p.sltonthucte), updatedAt: new Date() }
      });
    }

    updatedCount++;
  }

  // D. Reset virtual sub-warehouses
  await prisma.sanphamKho.updateMany({
    where: { NOT: { khoId: KHO_TONG_ID } },
    data: { soluong: 0, updatedAt: new Date() }
  });

  console.log(`Updated ${updatedCount} products in DB.`);

  console.log(`--- Recalculation complete for session: ${chotkhoId} ---`);
}

async function main() {
  console.log('--- RECALCULATING SYSTEM STOCK AND RE-APPLYING RULES FOR TODAY (JUNE 11) ---');
  
  // Today's Excel closing session:
  await processSession(
    '778eb33a-0ad9-4b80-9644-0b62fe67fe98', 
    '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 11-6.xlsx', 
    true
  );

  console.log('\n--- ALL SESSIONS COMPLETED ---');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
