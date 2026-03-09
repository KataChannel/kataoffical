
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  const ton = await prisma.tonKho.findUnique({ where: { sanphamId: sanpham.id }});
  
  console.log(`Khoai Tây DL lớn (I100128) - Current TonKho values:`);
  console.log(`sltonht: ${ton.sltonht}`);
  console.log(`sltontt: ${ton.sltontt}`);
  console.log(`sltonm: ${ton.sltonm}`);
  console.log(`Updated at: ${ton.updatedAt.toLocaleString('vi-VN')}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
