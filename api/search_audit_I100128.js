
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`--- Searching AuditLog for I100128 ---`);
  const logs = await prisma.auditLog.findMany({
    where: {
      OR: [
        { newValues: { path: [], equals: 'I100128' } },
        { oldValues: { path: [], equals: 'I100128' } }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  if (logs.length === 0) {
      // Try search in JSON stringified if Prisma search is limited
      const allLogs = await prisma.auditLog.findMany({
          take: 500,
          orderBy: { createdAt: 'desc' }
      });
      console.log(`Found ${allLogs.length} total logs, checking for keywords...`);
      const filtered = allLogs.filter(l => 
          JSON.stringify(l.newValues).includes('I100128') || 
          JSON.stringify(l.oldValues).includes('I100128') 
      );
      
      filtered.forEach(l => {
          console.log(`[${l.createdAt.toLocaleString('vi-VN')}] Entity: ${l.entityName}, Action: ${l.action}, User: ${l.userEmail}`);
          console.log(`New Values:`, JSON.stringify(l.newValues));
      });
  } else {
      logs.forEach(l => {
          console.log(`[${l.createdAt.toLocaleString('vi-VN')}] Entity: ${l.entityName}, Action: ${l.action}, User: ${l.userEmail}`);
      });
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
