const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const chotkhos = await prisma.chotkho.findMany({
    where: {
      ngaychot: {
        gte: new Date('2026-04-13'),
        lt: new Date('2026-04-14')
      }
    },
    include: {
      kho: true
    }
  });

  console.log(chotkhos.map(c => ({ id: c.id, title: c.title, kho: c.kho ? c.kho.name : 'N/A', date: c.ngaychot })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
