
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tStart = new Date('2026-03-08T02:07:00Z'); // 09:07 VN
  const tEnd = new Date('2026-03-08T02:09:00Z');   // 09:09 VN

  const logs = await prisma.auditLog.findMany({
    where: {
      createdAt: { gte: tStart, lte: tEnd }
    },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Checking ALL audit logs around 09:08 (±1 min):`);
  logs.forEach(l => {
      console.log(`[${l.createdAt.toLocaleString('vi-VN')}] Entity: ${l.entityName}, Action: ${l.action}, User: ${l.userEmail}`);
      // Only print if relevant to product I100128 or stock 78
      const news = JSON.stringify(l.newValues);
      if (news.includes('f16ada29-af2a-4f25-bb1b-94a9aa8d24f8') || news.includes('78')) {
          console.log(`   !! RELEVANT DATA: ${news.substring(0, 300)}...`);
      }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
