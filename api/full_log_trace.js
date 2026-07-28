
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orderId = 'f568a61d-91fe-4c12-935d-eb4bc21cb437';
  const logs = await prisma.auditLog.findMany({
    where: { entityId: orderId },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Summary of ${logs.length} logs for order ${orderId}:`);
  logs.forEach(log => {
     console.log(`[${log.createdAt.toISOString()}] ${log.action} ${log.entityName} - User: ${log.userId} - Endpoint: ${log.metadata?.endpoint}`);
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
