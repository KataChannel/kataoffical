const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Querying recent ErrorLogs...');
  
  const logs = await prisma.errorLog.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 50
  });

  console.log(`Found ${logs.length} error logs:`);
  logs.forEach(log => {
    console.log(`- [${log.createdAt.toISOString()}] Source: ${log.source} | Message: ${log.message}`);
    if (log.details) {
      console.log(`  Details: ${JSON.stringify(log.details)}`);
    }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
