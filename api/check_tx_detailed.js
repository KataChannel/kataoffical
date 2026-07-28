
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  const entries = await prisma.phieuKhoSanpham.findMany({
    where: { 
        sanphamId: sanpham.id, 
        createdAt: { gte: new Date('2026-03-07T00:00:00Z') }
    },
    include: { phieuKho: true },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`Lịch sử Phieukho của I100128 (07/03 -> Nay):\n`);
  entries.forEach(e => {
      console.log(`[${e.createdAt.toLocaleString('vi-VN')}] Title: ${e.phieuKho?.title || e.phieuKho?.madonhang || e.phieuKho?.madncc}, Kiểu: ${e.phieuKho?.type}, SL: ${e.soluong}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
