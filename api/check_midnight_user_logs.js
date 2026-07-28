
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const t1 = new Date('2026-03-07T17:00:30Z'); // 00:00:30 VN
  const t2 = new Date('2026-03-07T17:00:35Z'); // 00:00:35 VN

  const logs = await prisma.auditLog.findMany({
    where: {
      userEmail: 'ekr2411z@gmail.com',
      createdAt: { gte: t1, lte: t2 }
    }
  });

  console.log(`Analyzing AuditLogs for ekr2411z@gmail.com at midnight:`);
  logs.forEach(l => {
      console.log(`[${l.createdAt.toLocaleString('vi-VN')}] Entity: ${l.entityName}, Action: ${l.action}`);
      const news = JSON.stringify(l.newValues);
      const olds = JSON.stringify(l.oldValues);
      
      // Look for I100128 or its internal ID f16ada29-af2a-4f25-bb1b-94a9aa8d24f8
      if (news.includes('f16ada29-af2a-4f25-bb1b-94a9aa8d24f8') || news.includes('I100128')) {
          console.log(`   FOUND I100128 in this log!`);
      }
      
      // Look for the number 78 in any value
      if (news.includes('78') || olds.includes('78')) {
          console.log(`   Mentioned 78: ${news.substring(0, 200)}...`);
      }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
