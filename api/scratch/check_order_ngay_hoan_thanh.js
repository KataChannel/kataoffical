const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function run() {
  const orderId = '0044bf00-1932-43cc-a488-009e5abea366';
  const audits = await prisma.auditLog.findMany({
    where: { entityId: { contains: orderId } },
    orderBy: { createdAt: 'desc' }
  });

  console.log('=== AUDIT LOGS FOR ORDER ===');
  console.log(JSON.stringify(audits, null, 2));
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
