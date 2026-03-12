
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Checking AuditLogs around creation time...');
  
  const startTime = new Date('2026-03-11T16:50:00.000Z'); // Adjust for UTC
  const endTime = new Date('2026-03-11T17:00:00.000Z');
  
  const logs = await prisma.auditLog.findMany({
    where: {
      createdAt: {
        gte: startTime,
        lte: endTime
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Found ${logs.length} logs.`);
  logs.forEach(log => {
    console.log(`[${log.createdAt.toISOString()}] ${log.action} ${log.entityName} (${log.entityId}) - User: ${log.userId}`);
    if (log.metadata && log.metadata.endpoint) console.log(`  Endpoint: ${log.metadata.endpoint}`);
    if (log.entityName === 'Import Donhang Cu' || log.entityName === 'Import Donhang') {
       // console.log(`  Values: ${JSON.stringify(log.newValues).substring(0, 500)}`);
    }
    if (log.entityId === 'f568a61d-91fe-4c12-935d-eb4bc21cb437') {
      console.log('  *** THIS IS OUR ORDER ***');
      // console.log(`  New Values: ${JSON.stringify(log.newValues)}`);
    }
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
