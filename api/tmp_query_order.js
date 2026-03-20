const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const order = await prisma.donhang.findUnique({
    where: { madonhang: 'TG-AA33110' },
    include: { sanpham: { include: { sanpham: true } } }
  });
  console.log(JSON.stringify(order, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
