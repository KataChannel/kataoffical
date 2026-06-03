import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public'
    }
  }
});

async function main() {
  console.log('=== SEARCHING AUDIT LOGS BY TIMEBOX ===\n');

  // Search logs from 2026-06-02T12:00:00Z to 2026-06-02T15:00:00Z (19:00 to 22:00 VN time)
  const logs = await prisma.auditLog.findMany({
    where: {
      createdAt: {
        gte: new Date('2026-06-02T12:00:00Z'),
        lte: new Date('2026-06-02T15:00:00Z')
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Found ${logs.length} audit logs in this period.\n`);

  for (const log of logs) {
    console.log(`- Time: ${log.createdAt.toISOString()} | Action: ${log.action} | Entity: ${log.entityName}`);
    console.log(`  User: ${log.userEmail || log.userId || 'system'}`);
    console.log(`  Entity ID: ${log.entityId}`);
    if (log.changedFields && log.changedFields.length > 0) {
      console.log(`  Fields:`, log.changedFields);
    }
    console.log(`  New values:`, JSON.stringify(log.newValues));
    console.log('----------------------------------------------------');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
