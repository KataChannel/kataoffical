
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`--- Recent TonKho Updates ---`);
  const logs = await prisma.auditLog.findMany({
    where: {
      entityName: 'TonKho',
      action: 'UPDATE'
    },
    take: 100,
    orderBy: { createdAt: 'desc' }
  });

  logs.forEach(l => {
      console.log(`[${l.createdAt.toLocaleString('vi-VN')}] User: ${l.userEmail}, ID: ${l.entityId}`);
      console.log(`Changes:`, JSON.stringify(l.newValues));
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
