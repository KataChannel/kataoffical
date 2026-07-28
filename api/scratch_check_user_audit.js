const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'contact.rausachtrangia@gmail.com';
  console.log(`Checking AuditLogs for user: ${email}`);
  
  const logs = await prisma.auditLog.findMany({
    where: {
      userEmail: {
        equals: email,
        mode: 'insensitive'
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 50
  });

  if (logs.length === 0) {
    console.log(`No logs found for ${email}`);
    return;
  }

  console.log(`Found ${logs.length} logs:`);
  logs.forEach(log => {
    console.log(`- [${log.createdAt.toISOString()}] Action: ${log.action} | Status: ${log.status} | Entity: ${log.entityName} | Details: ${JSON.stringify(log.errorDetails || log.metadata)}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
