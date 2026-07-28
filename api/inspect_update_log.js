
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const log = await prisma.auditLog.findFirst({
    where: {
      action: 'UPDATE',
      entityId: 'f568a61d-91fe-4c12-935d-eb4bc21cb437',
      entityName: 'Update Donhang'
    }
  });

  if (log) {
    console.log(`Log info: ${JSON.stringify(log.metadata, null, 2)}`);
    // Check if body is in metadata (some audit implementations put the request body there)
    // Actually, check oldValues if changedFields is empty
    console.log(`New Values: ${JSON.stringify(log.newValues)}`);
    console.log(`Changed Fields: ${JSON.stringify(log.changedFields)}`);
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
