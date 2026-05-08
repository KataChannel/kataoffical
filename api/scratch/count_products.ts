import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.sanpham.count();
  console.log(`Total products in database: ${count}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
