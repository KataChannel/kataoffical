
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  const ton = await prisma.$queryRawUnsafe(`SELECT * FROM "TonKho" WHERE "sanphamId" = $1`, sanpham.id);
  console.log(ton[0]);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
