
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  const details = await prisma.phieuKhoSanpham.findMany({
    where: { 
        sanphamId: sanpham.id, 
        createdAt: { gte: new Date('2026-03-08T00:00:00Z') }
    },
    include: { phieuKho: true },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Lịch sử thay đổi kho I100128 hôm nay (Chi tiết Tồn):\n`);
  details.forEach(d => {
      console.log(`[${d.createdAt.toLocaleString('vi-VN')}] Phiếu: ${d.phieuKho?.maphieu || d.phieuKho?.madonhang || 'N/A'}`);
      console.log(`   Thay đổi: -${d.soluong}, Tồn SAU thay đổi: ${d.sltonm}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
