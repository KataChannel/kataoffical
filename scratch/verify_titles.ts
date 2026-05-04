import { PrismaClient } from '../api/node_modules/@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const maspList = ['I100236', 'I100226', 'I100227', 'I100138', 'I100223'];

  const products = await prisma.sanpham.findMany({
    where: { masp: { in: maspList } },
    select: { masp: true, title: true }
  });
  console.log(JSON.stringify(products));
  await prisma.$disconnect();
}

main();
