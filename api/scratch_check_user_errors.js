const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Querying ErrorLogs for July 2026 or containing phieugiaohang...');
  
  const logs = await prisma.errorLog.findMany({
    where: {
      OR: [
        {
          timestamp: {
            gte: new Date('2026-07-01T00:00:00Z')
          }
        },
        {
          message: {
            contains: 'phieugiaohang',
            mode: 'insensitive'
          }
        },
        {
          details: {
            path: ['url'],
            string_contains: 'phieugiaohang'
          }
        }
      ]
    },
    orderBy: {
      timestamp: 'desc'
    },
    take: 50
  });

  console.log(`Found ${logs.length} matching error logs:`);
  logs.forEach(log => {
    console.log(`- [${log.timestamp.toISOString()}] Source: ${log.source} | Message: ${log.message}`);
    if (log.details) {
      console.log(`  Details: ${JSON.stringify(log.details)}`);
    }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
