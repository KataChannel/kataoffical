
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const start = new Date('2026-03-08T02:07:00Z');
  const end = new Date('2026-03-08T02:10:00Z');

  console.log(`Searching AuditLogs between ${start.toISOString()} and ${end.toISOString()}...`);
  const logs = await prisma.auditLog.findMany({
    where: {
      createdAt: { gte: start, lte: end }
    },
    orderBy: { createdAt: 'asc' }
  });

  logs.forEach(l => {
      console.log(`[${l.createdAt.toLocaleString('vi-VN')}] [${l.entityName}] Action: ${l.action}, User: ${l.userEmail}`);
      console.log(`   Detailed:`, JSON.stringify(l.newValues));
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
