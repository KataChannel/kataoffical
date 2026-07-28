
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const log = await prisma.auditLog.findFirst({
    where: {
      action: 'UPDATE',
      entityId: 'f568a61d-91fe-4c12-935d-eb4bc21cb437',
      entityName: 'Update Donhang'
    },
    orderBy: { createdAt: 'asc' }
  });

  if (log) {
    console.log(`Log at ${log.createdAt.toISOString()}`);
    const chanhId = '3d41818d-cd67-4dcb-9f04-6a811e732b3f';
    const content = JSON.stringify(log.newValues || log.oldValues || log.metadata);
    const count = (content.match(new RegExp(chanhId, 'g')) || []).length;
    console.log(`Chanh không hạt ID appears ${count} times in this log.`);
    
    if (log.newValues && log.newValues.sanpham) {
       console.log(`Products in newValues.sanpham: ${log.newValues.sanpham.length}`);
    }
  } else {
    console.log('Log not found');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
