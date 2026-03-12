
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const khId = '274b8f4c-c9fc-40dc-ab0a-2e153a49fdfe';
  const logs = await prisma.auditLog.findMany({
    where: {
      action: 'CREATE',
      createdAt: {
        gte: new Date('2026-03-11T16:54:00.000Z'),
        lte: new Date('2026-03-11T16:56:00.000Z')
      }
    }
  });

  console.log(`Found ${logs.length} CREATE logs.`);
  logs.forEach(log => {
    if (JSON.stringify(log.newValues).includes(khId)) {
      console.log(`Log [${log.createdAt.toISOString()}] ${log.entityName} contains Customer ID.`);
      const data = log.newValues;
      // If it's ImportDonhangOldConfirmed, newValues is the pendingOrders array?
      // Wait, let's just search for Chanh không hạt product ID: 3d41818d-cd67-4dcb-9f04-6a811e732b3f
      const chanhId = '3d41818d-cd67-4dcb-9f04-6a811e732b3f';
      const count = (JSON.stringify(data).match(new RegExp(chanhId, 'g')) || []).length;
      console.log(`  Chanh không hạt ID appears ${count} times in this log.`);
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
