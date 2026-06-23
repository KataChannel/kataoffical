import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const targetSpId = '3dd7ce1a-320c-4a64-92b3-91eef614a4a3'; // Product: I100009 (Bắp non tươi)
  
  // Time window from June 14 chotkho to June 15 chotkho
  const startTime = new Date('2026-06-14T07:38:56.405Z');
  const endTime = new Date('2026-06-15T11:18:06.744Z');
  const initialQty = 0.2; // sltonthucte from June 14 chotkho

  console.log(`🔍 Verification window: [${startTime.toISOString()}] -> [${endTime.toISOString()}]`);
  console.log(`📦 Initial quantity: ${initialQty}`);

  // ==================== OLD LOGIC (FALLBACK TO updatedAt) ====================
  const oldImports = await prisma.dathangsanpham.findMany({
    where: {
      idSP: targetSpId,
      dathang: {
        status: 'danhan',
        OR: [
          { ngayHoanThanhThucte: { gt: startTime, lte: endTime } },
          { ngayHoanThanhThucte: null, updatedAt: { gt: startTime, lte: endTime } }
        ]
      }
    }
  });

  const oldExports = await prisma.donhangsanpham.findMany({
    where: {
      idSP: targetSpId,
      donhang: {
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        OR: [
          { ngayHoanThanhThucte: { gt: startTime, lte: endTime } },
          { ngayHoanThanhThucte: null, updatedAt: { gt: startTime, lte: endTime } }
        ]
      }
    }
  });

  const oldImportQty = oldImports.reduce((sum, item) => sum + Number(item.slnhan || item.slgiao || 0), 0);
  const oldExportQty = oldExports.reduce((sum, item) => sum + Number(item.slnhan || item.slgiao || item.sldat || 0), 0);
  const oldCalculated = initialQty + oldImportQty - oldExportQty;

  console.log('\n❌ [OLD LOGIC (updatedAt)]');
  console.log(`   Imports: ${oldImportQty} kg (Count: ${oldImports.length})`);
  console.log(`   Exports: ${oldExportQty} kg (Count: ${oldExports.length})`);
  console.log(`   Calculated System Stock: ${oldCalculated} kg`);

  // ==================== NEW LOGIC (FALLBACK TO ngaynhan/ngaygiao) ====================
  const newImports = await prisma.dathangsanpham.findMany({
    where: {
      idSP: targetSpId,
      dathang: {
        status: 'danhan',
        OR: [
          { ngayHoanThanhThucte: { gt: startTime, lte: endTime } },
          { ngayHoanThanhThucte: null, ngaynhan: { gt: startTime, lte: endTime } }
        ]
      }
    }
  });

  const newExports = await prisma.donhangsanpham.findMany({
    where: {
      idSP: targetSpId,
      donhang: {
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        OR: [
          { ngayHoanThanhThucte: { gt: startTime, lte: endTime } },
          { ngayHoanThanhThucte: null, ngaygiao: { gt: startTime, lte: endTime } }
        ]
      }
    }
  });

  const newImportQty = newImports.reduce((sum, item) => sum + Number(item.slnhan || item.slgiao || 0), 0);
  const newExportQty = newExports.reduce((sum, item) => sum + Number(item.slnhan || item.slgiao || item.sldat || 0), 0);
  const newCalculated = initialQty + newImportQty - newExportQty;

  console.log('\n✅ [NEW LOGIC (ngaynhan/ngaygiao)]');
  console.log(`   Imports: ${newImportQty} kg (Count: ${newImports.length})`);
  console.log(`   Exports: ${newExportQty} kg (Count: ${newExports.length})`);
  console.log(`   Calculated System Stock: ${newCalculated} kg`);

  if (newCalculated === 0.0) {
    console.log('\n🎉 SUCCESS: The new logic correctly evaluates expected stock to 0.0 kg!');
  } else {
    console.log(`\n⚠️ WARNING: Calculated stock under new logic is ${newCalculated} kg, expected 0.0 kg.`);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
