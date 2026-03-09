
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const t1 = new Date('2026-03-08T02:07:50Z');
  const t2 = new Date('2026-03-08T02:08:15Z');
  
  const logs = await prisma.auditLog.findMany({
    where: { createdAt: { gte: t1, lte: t2 } },
    orderBy: { createdAt: 'asc' }
  });

  logs.forEach(l => {
     console.log(`[${l.createdAt.toLocaleString('vi-VN')}] [${l.entityName}] Action: ${l.action}, User: ${l.userEmail}`);
     if (l.entityId) console.log(`   EntityId: ${l.entityId}`);
     console.log(`   NewVals: ${JSON.stringify(l.newValues)?.substring(0, 500)}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
