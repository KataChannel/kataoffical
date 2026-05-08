import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const warehouses = await prisma.kho.findMany();
  for (const w of warehouses) {
    const count = await prisma.sanphamKho.count({ where: { khoId: w.id } });
    console.log(`${w.name} (${w.id}): ${count} products`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
