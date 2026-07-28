
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const imports = await prisma.importHistory.findMany({
    where: {
      OR: [
        { title: { contains: 'daiichi' } },
        { title: { contains: 'TG-AA31072' } }
      ]
    }
  });

  imports.forEach(i => {
      console.log(`[${i.createdAt.toLocaleString('vi-VN')}] Title: ${i.title}, User: ${i.createdBy}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
