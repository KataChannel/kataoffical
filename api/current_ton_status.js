
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  const ton = await prisma.tonKho.findUnique({ where: { sanphamId: sanpham.id }});
  console.log(`Product: ${sanpham.title}`);
  console.log(`Current Stock (sltontt): ${ton.sltontt}`);
  console.log(`Last Updated: ${ton.updatedAt.toLocaleString('vi-VN')}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
