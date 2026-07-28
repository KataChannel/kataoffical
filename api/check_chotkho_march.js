
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  const chotDetails = await prisma.chotkhodetail.findMany({
    where: { 
        sanphamId: sanpham.id,
        ngaychot: { gte: new Date('2026-03-01T00:00:00Z') }
    },
    orderBy: { ngaychot: 'desc' },
    include: { chotkho: true }
  });

  console.log(`Lịch sử chốt kho I100128 trong tháng 3:\n`);
  chotDetails.forEach(c => {
      console.log(`[${c.ngaychot.toLocaleString('vi-VN')}] Title: ${c.chotkho?.title}, SL Chốt (Thực): ${c.sltonthucte}, SL HT khi đó: ${c.sltonht}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
