import { PrismaClient } from '@prisma/client';

async function main() {
  const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
  const prisma = new PrismaClient({ datasourceUrl: prodUrl });

  try {
    const tonkhoId = '4be34d75-b03a-4587-bff6-9e5c14bb8161';
    console.log(`🔍 Querying AuditLog for TonKho ID ${tonkhoId} for the last 30 days...`);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await prisma.auditLog.findMany({
      where: {
        entityId: tonkhoId,
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${logs.length} audit logs:`);
    for (const log of logs) {
      console.log(`- Time: ${log.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
      console.log(`  Action: ${log.action} | User: ${log.userEmail || 'System/Null'}`);
      console.log(`  Changed: ${JSON.stringify(log.changedFields)}`);
      console.log(`  Old: ${JSON.stringify(log.oldValues)}`);
      console.log(`  New: ${JSON.stringify(log.newValues)}`);
      console.log(`  Metadata: ${JSON.stringify(log.metadata)}`);
      console.log('----------------------------------------------------');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
