
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const ids = ['I100242', 'I100883', 'I100128'];
  const sps = await prisma.sanpham.findMany({ where: { masp: { in: ids } } });
  
  sps.forEach(s => {
      console.log(`Masp: ${s.masp}, Title: ${s.title}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
