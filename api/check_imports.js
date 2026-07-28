
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`--- ImportHistory Records Recent ---`);
  const imports = await prisma.importHistory.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  imports.forEach(i => {
      console.log(`[${i.createdAt.toLocaleString('vi-VN')}] Title: ${i.title}, User: ${i.createdBy}, Status: ${i.status}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
