import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAllWarehouses() {
  const masp = 'I100479';
  const sanpham = await prisma.sanpham.findFirst({ where: { masp } });
  
  if (!sanpham) return;

  const stocks = await prisma.sanphamKho.findMany({
    where: { sanphamId: sanpham.id },
    include: { kho: true }
  });

  console.log(`--- STOCKS FOR ${sanpham.title} (${masp}) ---`);
  stocks.forEach(s => {
    console.log(`${s.kho.name} (${s.kho.makho}): ${s.soluong}`);
  });

  await prisma.$disconnect();
}

checkAllWarehouses();
