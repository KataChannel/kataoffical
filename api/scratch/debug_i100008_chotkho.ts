import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const targetSpId = 'bf93ef1b-31d6-40ca-affe-1a98a55f07e0'; // I100008
  const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
  const khoId = KHO_TONG_ID;
  const targetNgayChot = new Date('2026-06-17T08:40:10.110Z');

  console.log('=== DEBUG I100008 CHOTKHO CALCULATION ===');
  console.log(`Target product ID: ${targetSpId}`);
  console.log(`Target ngaychot: ${targetNgayChot.toISOString()}`);

  // 1. Find last chotkho
  const lastChot = await prisma.chotkho.findFirst({
    where: {
      khoId,
      isActive: true,
      ngaychot: { lt: targetNgayChot }
    },
    orderBy: { ngaychot: 'desc' },
    include: { details: true }
  });

  const startTime = lastChot ? lastChot.ngaychot : new Date(0);
  console.log(`\n--- Last Chotkho ---`);
  console.log(`Title: ${lastChot?.title}`);
  console.log(`ngaychot: ${lastChot?.ngaychot?.toISOString()}`);
  console.log(`startTime: ${startTime.toISOString()}`);

  // Find initial qty for this product
  let initialQty = 0;
  if (lastChot && lastChot.details) {
    for (const d of lastChot.details) {
      if (d.sanphamId === targetSpId) {
        initialQty = Number(d.sltonthucte) || 0;
        console.log(`Initial qty (sltonthucte from last chot): ${initialQty}`);
        break;
      }
    }
  }

  // 2. Exports (Donhangsanpham)
  const isMainWarehouse = khoId === KHO_TONG_ID;
  const exports = await prisma.donhangsanpham.findMany({
    where: {
      idSP: targetSpId,
      donhang: {
        ...(isMainWarehouse ? {} : { khoId }),
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        OR: [
          { ngayHoanThanhThucte: { gt: startTime, lte: targetNgayChot } },
          { ngayHoanThanhThucte: null, ngaygiao: { gt: startTime, lte: targetNgayChot } }
        ]
      }
    },
    include: { donhang: true }
  });

  console.log(`\n--- Exports (Donhangsanpham) ---`);
  console.log(`Total export records: ${exports.length}`);
  let totalExport = 0;
  for (const x of exports) {
    const qty = Number(x.slnhan || x.slgiao || x.sldat || 0);
    totalExport += qty;
    console.log(`  ${(x as any).donhang?.madonhang} | qty=${qty} | ngayHTTT=${(x as any).donhang?.ngayHoanThanhThucte?.toISOString() ?? 'null'} | ngaygiao=${(x as any).donhang?.ngaygiao?.toISOString()}`);
  }
  console.log(`Total export qty: ${totalExport}`);

  // 3. Imports (Dathangsanpham)
  const imports = await prisma.dathangsanpham.findMany({
    where: {
      idSP: targetSpId,
      dathang: {
        ...(isMainWarehouse ? {} : { khoId }),
        status: 'danhan',
        OR: [
          { ngayHoanThanhThucte: { gt: startTime, lte: targetNgayChot } },
          { ngayHoanThanhThucte: null, ngaynhan: { gt: startTime, lte: targetNgayChot } }
        ]
      }
    },
    include: { dathang: true }
  });

  console.log(`\n--- Imports (Dathangsanpham) ---`);
  console.log(`Total import records: ${imports.length}`);
  let totalImport = 0;
  for (const n of imports) {
    const qty = Number(n.slnhan || n.slgiao || n.sldat || 0);
    totalImport += qty;
    console.log(`  ${(n as any).dathang?.title || (n as any).dathang?.id} | qty=${qty}`);
  }
  console.log(`Total import qty: ${totalImport}`);

  // 4. Calculate
  const calculatedStock = initialQty + totalImport - totalExport;
  console.log(`\n=== FINAL CALCULATION ===`);
  console.log(`Initial (sltonthucte from last chot): ${initialQty}`);
  console.log(`+ Imports: ${totalImport}`);
  console.log(`- Exports: ${totalExport}`);
  console.log(`= Calculated sltonhethong: ${calculatedStock}`);
  console.log(`\nStored sltonhethong in DB: 89`);
  console.log(`Difference: ${calculatedStock - 89}`);

  // 5. Check if any other chotkho between startTime and targetNgayChot (from other kho)
  const intermediateChotKhos = await prisma.chotkhodetail.findMany({
    where: {
      sanphamId: targetSpId,
      ngaychot: { gt: startTime, lt: targetNgayChot },
      chotkho: {
        isActive: true
      }
    },
    include: { chotkho: true }
  });
  
  console.log(`\n--- Intermediate Chotkho details (between startTime and targetNgayChot) ---`);
  console.log(`Count: ${intermediateChotKhos.length}`);
  for (const ck of intermediateChotKhos) {
    console.log(`  ${ck.chotkho.title} | khoId=${ck.chotkho.khoId} | sltonhethong=${ck.sltonhethong} | sltonthucte=${ck.sltonthucte} | ngaychot=${ck.ngaychot.toISOString()}`);
  }

  // 6. Check if the PREVIOUS chotkho's details had the right data
  if (lastChot) {
    console.log(`\n--- Last Chotkho Details (all products in the session) ---`);
    console.log(`Total details: ${lastChot.details.length}`);
    const targetDetail = lastChot.details.find(d => d.sanphamId === targetSpId);
    if (targetDetail) {
      console.log(`Product I100008 detail:`);
      console.log(`  sltonhethong: ${targetDetail.sltonhethong}`);
      console.log(`  sltonthucte: ${targetDetail.sltonthucte}`);
      console.log(`  chenhlech: ${targetDetail.chenhlech}`);
      console.log(`  ghichu: ${targetDetail.ghichu}`);
    } else {
      console.log(`⚠️ Product I100008 NOT FOUND in the last chotkho details!`);
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
