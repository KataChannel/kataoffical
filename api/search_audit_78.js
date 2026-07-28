
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const logs = await prisma.auditLog.findMany({
    where: {
      OR: [
        { newValues: { path: ['sltontt'], equals: 78 } },
        { newValues: { path: ['sltonthucte'], equals: 78 } },
        { newValues: { path: ['sltonhuy'], equals: 78 } }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  logs.forEach(l => {
      console.log(`[${l.createdAt.toLocaleString('vi-VN')}] Entity: ${l.entityName}, Action: ${l.action}, User: ${l.userEmail}`);
      console.log(`   NewVals: ${JSON.stringify(l.newValues)}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
