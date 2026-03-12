
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const startTime = new Date('2026-03-11T16:54:00.000Z');
  const endTime = new Date('2026-03-11T16:56:00.000Z');
  
  const logs = await prisma.auditLog.findMany({
    where: {
      createdAt: { gte: startTime, lte: endTime }
    }
  });

  const chanhId = '3d41818d-cd67-4dcb-9f04-6a811e732b3f';
  
  logs.forEach(log => {
    const content = JSON.stringify(log.newValues || {});
    if (content.includes(chanhId)) {
      const count = (content.match(new RegExp(chanhId, 'g')) || []).length;
      console.log(`[${log.createdAt.toISOString()}] ${log.entityName} - Chanh count: ${count}`);
      
      // If it's the Import log, let's see which customer it belongs to
      if (log.newValues && Array.isArray(log.newValues)) {
         log.newValues.forEach(order => {
            const orderChanhCount = (JSON.stringify(order).match(new RegExp(chanhId, 'g')) || []).length;
            if (orderChanhCount > 0) {
               console.log(`  Customer: ${order.khachhangId || order.makh} - Count: ${orderChanhCount}`);
            }
         });
      }
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
