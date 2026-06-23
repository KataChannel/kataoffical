import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const targetSpId = 'bf93ef1b-31d6-40ca-affe-1a98a55f07e0'; // Product: I100008 (Bắp mỹ trái (Loại 1))
  const startTime = new Date('2026-06-16T10:45:35.756Z');
  const endTime = new Date('2026-06-17T08:40:10.110Z');

  // Let's get all Donhangsanpham for this product completed after startTime
  const allExports = await prisma.donhangsanpham.findMany({
    where: {
      idSP: targetSpId,
      donhang: {
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        updatedAt: { gte: new Date('2026-06-16T00:00:00.000Z') }
      }
    },
    include: {
      donhang: true
    }
  });

  console.log(`Total active exports in DB since June 16: ${allExports.length}`);
  allExports.forEach((x: any) => {
    const qty = Number(x.slnhan || x.slgiao || x.sldat || 0);
    const inRange = (x.donhang.ngayHoanThanhThucte && x.donhang.ngayHoanThanhThucte > startTime && x.donhang.ngayHoanThanhThucte <= endTime) ||
                    (!x.donhang.ngayHoanThanhThucte && x.donhang.ngaygiao && x.donhang.ngaygiao > startTime && x.donhang.ngaygiao <= endTime);
    console.log(`- ${x.donhang.madonhang} (qty: ${qty}): ` +
                `status: ${x.donhang.status}, ` +
                `ngayHoanThanhThucte: ${x.donhang.ngayHoanThanhThucte?.toISOString() || 'null'}, ` +
                `ngaygiao: ${x.donhang.ngaygiao?.toISOString() || 'null'}, ` +
                `updatedAt: ${x.donhang.updatedAt.toISOString()}, ` +
                `inRange: ${inRange}`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error executing script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
