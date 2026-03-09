
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const t1 = new Date('2026-03-08T02:08:00Z'); // Vietnam is +7, so 09:08 - 7 is 02:08
  const t2 = new Date('2026-03-08T02:08:10Z');

  const logs = await prisma.auditLog.findMany({
    where: {
      createdAt: { gte: t1, lte: t2 }
    },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Lịch sử AuditLog lúc 09:08:\n`);
  logs.forEach(l => {
      console.log(`[${l.createdAt.toLocaleString('vi-VN')}] Entity: ${l.entityName}, Action: ${l.action}, User: ${l.userEmail}`);
      console.log(`   New: ${JSON.stringify(l.newValues)}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
