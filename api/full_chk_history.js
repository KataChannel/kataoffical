
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  if (!sanpham) return console.log('Product not found');

  const history = await prisma.chotkhodetail.findMany({
    where: { sanphamId: sanpham.id },
    orderBy: { ngaychot: 'desc' },
    include: {
      chotkho: {
        include: { user: true }
      }
    }
  });

  console.log(`History for ${sanpham.title} (${masp}):`);
  history.forEach(h => {
     console.log(`[${h.ngaychot.toLocaleString('vi-VN')}] SL: ${h.sltonthucte} User: ${h.chotkho?.user?.email}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
