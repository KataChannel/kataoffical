
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const log = await prisma.auditLog.findFirst({
    where: {
      action: 'CREATE',
      entityName: 'Import Donhang Cu',
      createdAt: {
        gte: new Date('2026-03-11T16:55:00.000Z'),
        lte: new Date('2026-03-11T16:56:00.000Z')
      }
    }
  });

  if (log) {
    console.log(`Log at ${log.createdAt.toISOString()}`);
    console.log(`Endpoint: ${log.metadata?.endpoint}`);
    // Check if newValues contains the order items
    // console.log(`New Values: ${JSON.stringify(log.newValues).substring(0, 2000)}`);
    
    // Search for TG-AA31770 in the newValues or response
    // if (JSON.stringify(log.newValues).includes('TG-AA31770')) {
    //   console.log('Found order TG-AA31770 in this log!');
    // }
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
