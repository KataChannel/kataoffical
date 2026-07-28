const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const startDate = new Date('2026-04-13');
  const endDate = new Date('2026-04-24'); // Current is 23rd

  const chotkhos = await prisma.chotkho.findMany({
    where: {
      ngaychot: {
        gte: startDate,
        lt: endDate
      }
    },
    include: {
      kho: true,
      _count: {
        select: { details: true }
      }
    },
    orderBy: { ngaychot: 'asc' }
  });

  console.log('--- Stock Closing Sessions (April 13 - 23) ---');
  chotkhos.forEach(c => {
    console.log(`Date: ${c.ngaychot.toISOString()}, Title: ${c.title}, Kho: ${c.kho?.name}, Details: ${c._count.details}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
