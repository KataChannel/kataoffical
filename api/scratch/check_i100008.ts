import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

async function main() {
  const targetSpId = 'bf93ef1b-31d6-40ca-affe-1a98a55f07e0'; // Product: I100008 (Bắp mỹ trái (Loại 1))
  const khoId = '4cc01811-61f5-4bdc-83de-a493764e9258'; // Kho chính HCM
  const targetNgayChot = new Date('2026-06-17T08:40:10.110Z');

  console.log(`🚀 Checking stock calculation for product ID: ${targetSpId}`);

  // 1. Tìm phiên chốt kho gần nhất ngay trước targetNgayChot
  const lastChot = await prisma.chotkho.findFirst({
    where: {
      khoId,
      isActive: true,
      ngaychot: { lt: targetNgayChot }
    },
    orderBy: { ngaychot: 'desc' },
    include: {
      details: {
        where: { sanphamId: targetSpId }
      }
    }
  });

  console.log('Last chotkho:', lastChot ? {
    id: lastChot.id,
    title: lastChot.title,
    ngaychot: lastChot.ngaychot,
    detail: lastChot.details[0]
  } : 'None');

  const startTime = lastChot ? lastChot.ngaychot : new Date(0);
  const startQty = lastChot && lastChot.details[0] ? Number(lastChot.details[0].sltonthucte) : 0;

  // 2. Lấy tất cả phiếu xuất (Donhangsanpham) trong khoảng
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
    console.log(`- Export ${x.donhang.madonhang} (status: ${x.donhang.status}): sldat=${x.sldat}, slgiao=${x.slgiao}, slnhan=${x.slnhan}, qty=${qty}, ngayHoanThanhThucte=${x.donhang.ngayHoanThanhThucte}, ngaygiao=${x.donhang.ngaygiao}`);
  });
  console.log(`Total Export Qty: ${totalExportQty}`);

  // 3. Lấy tất cả phiếu nhập (Dathangsanpham) trong khoảng
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
    console.log(`- Import ${n.dathang.id} (${n.dathang.title}, status: ${n.dathang.status}): sldat=${n.sldat}, slgiao=${n.slgiao}, slnhan=${n.slnhan}, qty=${qty}, ngayHoanThanhThucte=${n.dathang.ngayHoanThanhThucte}, ngaynhan=${n.dathang.ngaynhan}`);
  });
  console.log(`Total Import Qty: ${totalImportQty}`);

  const calculatedSystemStock = startQty + totalImportQty - totalExportQty;
  console.log(`Calculated Stock: ${startQty} + ${totalImportQty} - ${totalExportQty} = ${calculatedSystemStock}`);
}

main()
  .catch((e) => {
    console.error('❌ Error executing script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
