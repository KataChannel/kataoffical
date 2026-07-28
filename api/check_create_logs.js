
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const startTime = new Date('2026-03-11T16:54:00.000Z');
  const endTime = new Date('2026-03-11T16:56:00.000Z');
  
  const logs = await prisma.auditLog.findMany({
    where: {
      createdAt: { gte: startTime, lte: endTime },
      action: 'CREATE'
    }
  });

  console.log(`Found ${logs.length} CREATE logs.`);
  logs.forEach(log => {
    console.log(`[${log.createdAt.toISOString()}] ${log.entityName} - User: ${log.userId}`);
    if (log.metadata) console.log(`  Endpoint: ${log.metadata.endpoint}`);
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
