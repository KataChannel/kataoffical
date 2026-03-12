
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Searching for orders with duplicate products...');
  
  const duplicates = await prisma.$queryRaw`
    SELECT "donhangId", "idSP", COUNT(*) as count
    FROM "Donhangsanpham"
    GROUP BY "donhangId", "idSP"
    HAVING COUNT(*) > 1
  `;

  if (duplicates.length === 0) {
    console.log('No orders with duplicate products found.');
  } else {
    console.log(`Found ${duplicates.length} instances of duplication:`);
    for (const dup of duplicates) {
      const order = await prisma.donhang.findUnique({
        where: { id: dup.donhangId },
        select: { madonhang: true }
      });
      console.log(`Order ${order?.madonhang || dup.donhangId}: Product ${dup.idSP} repeated ${dup.count} times`);
    }
  }
}

main().finally(() => prisma.$disconnect());
