import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Top 5 khách hàng có nhiều đơn hàng nhất
  const result = await prisma.donhang.groupBy({
    by: ['khachhangId'],
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
    take: 5
  });

  for (const r of result) {
    if (r.khachhangId) {
      const kh = await prisma.khachhang.findUnique({
        where: { id: r.khachhangId },
        select: { id: true, name: true, makh: true }
      });
      console.log('KH:', kh?.name, '(', kh?.makh, ') -', r._count.id, 'đơn');
    }
  }

  // Đơn hàng trong tháng 11/2025
  const nov2025 = await prisma.donhang.count({
    where: {
      createdAt: {
        gte: new Date('2025-11-01'),
        lte: new Date('2025-11-30T23:59:59')
      }
    }
  });
  console.log('Đơn hàng tháng 11/2025:', nov2025);

  // Đơn hàng trong tháng 12/2025
  const dec2025 = await prisma.donhang.count({
    where: {
      createdAt: {
        gte: new Date('2025-12-01'),
        lte: new Date('2025-12-31T23:59:59')
      }
    }
  });
  console.log('Đơn hàng tháng 12/2025:', dec2025);
}

main().catch(console.error).finally(async () => {
  await prisma.$disconnect();
});
