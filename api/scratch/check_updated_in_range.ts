import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const targetSpId = 'bf93ef1b-31d6-40ca-affe-1a98a55f07e0'; // Product: I100008 (Bắp mỹ trái (Loại 1))
  const startTime = new Date('2026-06-16T10:45:35.756Z');
  const endTime = new Date('2026-06-17T08:40:10.110Z');

  // Find all Donhangsanpham for this product where donhang was updated between startTime and endTime
  const exports = await prisma.donhangsanpham.findMany({
    where: {
      idSP: targetSpId,
      donhang: {
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        updatedAt: { gt: startTime, lte: endTime }
      }
    },
    include: {
      donhang: true
    }
  });

  console.log(`Exports updated in range count: ${exports.length}`);
  let totalQty = 0;
  exports.forEach((x: any) => {
    const qty = Number(x.slnhan || x.slgiao || x.sldat || 0);
    totalQty += qty;
    console.log(`- ${x.donhang.madonhang} (qty: ${qty}): status: ${x.donhang.status}, ngayHoanThanhThucte: ${x.donhang.ngayHoanThanhThucte?.toISOString()}, ngaygiao: ${x.donhang.ngaygiao?.toISOString()}, updatedAt: ${x.donhang.updatedAt.toISOString()}`);
  });
  console.log(`Total Qty: ${totalQty}`);
}

main()
  .catch((e) => {
    console.error('❌ Error executing script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
