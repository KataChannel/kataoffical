
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const allImports = await prisma.importHistory.findMany({
    take: 100,
    orderBy: { createdAt: 'desc' }
  });

  allImports.forEach(i => {
      const cd = JSON.stringify(i.caseDetail);
      if (cd.includes('daiichi')) {
          console.log(`[${i.createdAt.toLocaleString('vi-VN')}] JSON Match: ${i.title}, User: ${i.createdBy}`);
      }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
