
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tonKhoId = '7dfabacc-8b16-4c8b-9903-c70e423e2e2a';
  
  const logs = await prisma.auditLog.findMany({
    where: { 
        OR: [
            { entityId: tonKhoId },
            { oldValues: { path: ['id'], equals: tonKhoId } },
            { newValues: { path: ['id'], equals: tonKhoId } }
        ]
    },
    orderBy: { createdAt: 'desc' },
    take: 100
  });

  console.log(`Checking ALL audit logs for TonKho ID: ${tonKhoId}`);
  logs.forEach(l => {
      console.log(`[${l.createdAt.toLocaleString('vi-VN')}] Action: ${l.action}, User: ${l.userEmail}`);
      console.log(`   Old: ${JSON.stringify(l.oldValues)}`);
      console.log(`   New: ${JSON.stringify(l.newValues)}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
