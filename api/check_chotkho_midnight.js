
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  const chot = await prisma.chotkhodetail.findFirst({
      where: {
          sanphamId: sanpham.id,
          ngaychot: { 
              gte: new Date('2026-03-07T17:00:00Z'), // VN midnight 08/03 is UTF 17:00 07/03
              lte: new Date('2026-03-07T17:01:00Z') 
          }
      }
  });

  if (chot) {
      console.log(`Tìm thấy Chốt Kho cho I100128 lúc rạng sáng:`);
      console.log(`SL Chốt: ${chot.sltonthucte}, SL HT khi đó: ${c.sltonht}`);
  } else {
      console.log(`Không tìm thấy Chốt Kho cho I100128 vào rạng sáng 08/03.`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
