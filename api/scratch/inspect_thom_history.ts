import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sp = await prisma.sanpham.findUnique({
    where: { masp: 'I101127' }
  });

  if (!sp) {
    console.error('Product not found!');
    return;
  }

  const sanphamId = sp.id;
  console.log(`Product found: ID=${sanphamId}, Code=${sp.masp}, Title=${sp.title}`);

  // Find the last chotkhodetail before June 8
  const lastChot = await prisma.chotkhodetail.findFirst({
    where: {
      sanphamId,
      chotkho: {
        isActive: true,
        ngaychot: { lt: new Date('2026-06-08T00:00:00+07:00') }
      }
    },
    orderBy: { ngaychot: 'desc' },
    include: { chotkho: true }
  });

  if (lastChot) {
    console.log(`Last Chot: session="${lastChot.chotkho?.title}", date=${lastChot.ngaychot.toISOString()}, actual=${lastChot.sltonthucte}`);
  } else {
    console.log('No last chot found');
  }

  const startTime = lastChot ? lastChot.ngaychot : new Date(0);
  const endTime = new Date('2026-06-08T23:59:59+07:00');

  // Fetch exports
  const xuat = await prisma.donhangsanpham.findMany({
    where: {
      idSP: sanphamId,
      donhang: {
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        OR: [
          { ngayHoanThanhThucte: { gt: startTime, lte: endTime } },
          { ngayHoanThanhThucte: null, updatedAt: { gt: startTime, lte: endTime } }
        ]
      }
    },
    include: { donhang: true }
  });

  // Fetch imports
  const nhap = await prisma.dathangsanpham.findMany({
    where: {
      idSP: sanphamId,
      dathang: {
        status: 'danhan',
        OR: [
          { ngayHoanThanhThucte: { gt: startTime, lte: endTime } },
          { ngayHoanThanhThucte: null, updatedAt: { gt: startTime, lte: endTime } }
        ]
      }
    },
    include: { dathang: true }
  });

  console.log(`\nExports found: ${xuat.length}`);
  xuat.forEach(x => {
    console.log(`- Export: Code=${x.donhang.madonhang}, Qty=${x.slnhan || x.slgiao || x.sldat}, Time=${x.donhang.ngayHoanThanhThucte || x.donhang.updatedAt}`);
  });

  console.log(`\nImports found: ${nhap.length}`);
  nhap.forEach(n => {
    console.log(`- Import: Code=${n.dathang.madncc}, Qty=${n.slnhan || n.slgiao}, Time=${n.dathang.ngayHoanThanhThucte || n.dathang.updatedAt}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
