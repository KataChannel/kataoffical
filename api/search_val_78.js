
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`--- Searching for sltonthucte = 78 ---`);
  const detailsByVal = await prisma.chotkhodetail.findMany({
    where: {
      sltonthucte: 78
    },
    include: {
      sanpham: true,
      chotkho: { include: { user: true } }
    },
    orderBy: { ngaychot: 'desc' }
  });

  detailsByVal.forEach(d => {
      console.log(`[${d.ngaychot.toLocaleString('vi-VN')}] SP: ${d.sanpham?.title} (${d.sanpham?.masp}) User: ${d.chotkho?.user?.email}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
