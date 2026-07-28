
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  // 1. Find the 10 most recent chotkho for this product
  const recentChots = await prisma.chotkhodetail.findMany({
    where: { sanphamId: sanpham.id },
    orderBy: { ngaychot: 'desc' },
    take: 10,
    include: { chotkho: true }
  });

  console.log(`Lịch sử chốt kho gần nhất của ${masp}:`);
  recentChots.forEach(c => {
      console.log(`[${c.ngaychot.toLocaleString('vi-VN')}] Title: ${c.chotkho?.title}, SL Chốt: ${c.sltonthucte}, SL Trước Chốt (Tồn HT khi đó): ${c.sltonht}`);
  });

  // 2. Check the TonKho record's history if available
  // Some systems have a log of value changes. Let's check logic in tonkho-manager.service.ts
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
