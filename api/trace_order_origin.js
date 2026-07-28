
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Searching for logs of order f568a61d-91fe-4c12-935d-eb4bc21cb437...');
  
  const orderId = 'f568a61d-91fe-4c12-935d-eb4bc21cb437';
  
  const logs = await prisma.auditLog.findMany({
    where: {
      OR: [
        { entityId: orderId },
        { 
          newValues: {
            path: ['id'],
            equals: orderId
          }
        },
        {
          newValues: {
            path: ['madonhang'],
            equals: 'TG-AA31770'
          }
        }
      ]
    },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Found ${logs.length} logs for this order.`);
  logs.forEach(log => {
    console.log(`[${log.createdAt.toISOString()}] ${log.action} ${log.entityName} (${log.entityId})`);
    console.log(`  Endpoint: ${log.metadata?.endpoint}`);
    console.log(`  User: ${log.userId}`);
    if (log.newValues) {
      const nv = log.newValues;
      if (nv.sanpham) {
        console.log(`  Products in NewValues: ${nv.sanpham.length}`);
        const chanh = nv.sanpham.filter(p => p.masp === 'I100060' || p.idSP === '3d41818d-cd67-4dcb-9f04-6a811e732b3f');
        if (chanh.length > 0) {
          console.log(`    !!! Found ${chanh.length} Chanh không hạt items !!!`);
        }
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
