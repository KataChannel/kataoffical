import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

async function main() {
  const targetSpId = 'bf93ef1b-31d6-40ca-affe-1a98a55f07e0'; // Product: I100008 (Bắp mỹ trái (Loại 1))
  const chotkhoId = '282585d9-21a7-41ef-9038-da079caae522'; // June 17th Excel chotkho

  console.log(`🚀 Checking exact chotkho calculation details for chotkho: ${chotkhoId}`);

  // Load chotkho master record
  const chotkho = await prisma.chotkho.findUnique({
    where: { id: chotkhoId }
  });

  if (!chotkho) {
    console.error('Chotkho not found!');
    return;
  }

  const khoId = chotkho.khoId;
  const targetNgayChot = chotkho.ngaychot;

  console.log(`Chotkho: ${chotkho.title}, khoId: ${khoId}, ngaychot: ${targetNgayChot.toISOString()}`);

  // Load last chotkho BEFORE targetNgayChot
  const lastChot = await prisma.chotkho.findFirst({
    where: {
      khoId,
      isActive: true,
      ngaychot: { lt: targetNgayChot }
    },
    orderBy: { ngaychot: 'desc' },
    include: {
      details: true
    }
  });

  console.log('Last chotkho:', lastChot ? {
    id: lastChot.id,
    title: lastChot.title,
    ngaychot: lastChot.ngaychot.toISOString(),
  } : 'None');

  const startTime = lastChot ? lastChot.ngaychot : new Date(0);
  console.log(`startTime: ${startTime.toISOString()}`);

  const initialQtyMap = new Map<string, number>();
  if (lastChot && lastChot.details) {
    for (const d of lastChot.details) {
      if (d.sanphamId === targetSpId) {
        initialQtyMap.set(d.sanphamId, Number(d.sltonthucte) || 0);
        console.log(`- Initial stock for I100008: ${d.sltonthucte}`);
      }
    }
  }

  // Load exports
  const exports = await prisma.donhangsanpham.findMany({
    where: {
      idSP: targetSpId,
      donhang: {
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        OR: [
          { ngayHoanThanhThucte: { gt: startTime, lte: targetNgayChot } },
          { ngayHoanThanhThucte: null, ngaygiao: { gt: startTime, lte: targetNgayChot } }
        ]
      }
    },
    include: {
      donhang: true
    }
  });

  console.log(`Exports count: ${exports.length}`);
  let totalExportQty = 0;
  exports.forEach((x: any) => {
    const qty = Number(x.slnhan || x.slgiao || x.sldat || 0);
    totalExportQty += qty;
  });
  console.log(`Total Export Qty: ${totalExportQty}`);

  // Load imports
  const imports = await prisma.dathangsanpham.findMany({
    where: {
      idSP: targetSpId,
      dathang: {
        status: 'danhan',
        OR: [
          { ngayHoanThanhThucte: { gt: startTime, lte: targetNgayChot } },
          { ngayHoanThanhThucte: null, ngaynhan: { gt: startTime, lte: targetNgayChot } }
        ]
      }
    },
    include: {
      dathang: true
    }
  });

  console.log(`Imports count: ${imports.length}`);
  let totalImportQty = 0;
  imports.forEach((n: any) => {
    const qty = Number(n.slnhan || n.slgiao || n.sldat || 0);
    totalImportQty += qty;
  });
  console.log(`Total Import Qty: ${totalImportQty}`);

  // Check the recorded detail in this chotkho
  const recordedDetail = await prisma.chotkhodetail.findFirst({
    where: {
      chotkhoId,
      sanphamId: targetSpId
    }
  });

  console.log('Recorded detail in DB:', recordedDetail ? {
    id: recordedDetail.id,
    sltonhethong: recordedDetail.sltonhethong.toString(),
    sltonthucte: recordedDetail.sltonthucte.toString(),
    ghichu: recordedDetail.ghichu
  } : 'None');
}

main()
  .catch((e) => {
    console.error('❌ Error executing script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
