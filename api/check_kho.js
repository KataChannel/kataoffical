const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkKho() {
  const khos = await prisma.kho.findMany();
  console.log(JSON.stringify(khos, null, 2));
  await prisma.$disconnect();
}

checkKho();
