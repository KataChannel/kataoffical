
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const last100 = await prisma.chotkhodetail.findMany({
    take: 100,
    orderBy: { ngaychot: 'desc' },
    include: { sanpham: true }
  });

  last100.forEach(c => {
      console.log(`[${c.ngaychot.toLocaleString('vi-VN')}] Masp: ${c.sanpham?.masp}, SL Chốt: ${c.sltonthucte}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
