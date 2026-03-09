
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  const entries = await prisma.phieuKhoSanpham.findMany({
    where: { 
        sanphamId: sanpham.id, 
        createdAt: { gte: new Date('2026-03-01T00:00:00Z') }
    },
    include: { phieuKho: true },
    orderBy: { createdAt: 'desc' }
  });

  let current = 78; // Start at target
  console.log(`Bắt đầu từ 78 (nay):\n`);
  
  entries.forEach(e => {
      let old = current;
      if (e.phieuKho?.type === 'xuat') current += Number(e.soluong);
      else current -= Number(e.soluong);
      console.log(`[${e.createdAt.toLocaleString('vi-VN')}] ${e.phieuKho?.type} ${e.phieuKho?.maphieu || e.phieuKho?.madonhang || e.phieuKho?.madncc}: ${e.soluong} -> Lùi về: ${current.toFixed(2)}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
