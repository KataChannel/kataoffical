
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

  if (log && log.newValues) {
    console.log(`Log at ${log.createdAt.toISOString()}`);
    // Check sanpham in newValues if it's there
    // Wait, update method might not include all products in newValues in AuditLog
    // unless includeResponse: true is set and it's returning the full object.
    console.log(`New Values: ${JSON.stringify(log.newValues).substring(0, 1000)}`);
  } else {
     console.log('Log not found or no newValues');
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
