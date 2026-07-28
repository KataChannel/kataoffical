const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const targetDate = new Date('2026-04-13');
  const nextDate = new Date('2026-04-14');

  const chotkhos = await prisma.chotkho.findMany({
    where: {
      ngaychot: {
        gte: targetDate,
        lt: nextDate
      }
    },
    include: {
      details: {
        include: {
          sanpham: true
        }
      }
    }
  });

  console.log(JSON.stringify(chotkhos, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
