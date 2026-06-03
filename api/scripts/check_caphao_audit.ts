import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public'
    }
  }
});

async function main() {
  console.log('=== AUDITING STOCK CHANGES FOR CÀ PHÁO (I100036) ===\n');

  const sp = await prisma.sanpham.findFirst({
    where: { masp: 'I100036' }
  });

  if (!sp) {
    console.log('Product not found');
    await prisma.$disconnect();
    return;
  }

  // Find audit logs where entityId is sp.id or related to TonKho/SanphamKho of this product
  // Let's get the TonKho and SanphamKho IDs first
  const tk = await prisma.tonKho.findUnique({ where: { sanphamId: sp.id } });
  const sks = await prisma.sanphamKho.findMany({ where: { sanphamId: sp.id } });

  const ids = [sp.id];
  if (tk) ids.push(tk.id);
  sks.forEach(sk => ids.push(sk.id));

  console.log('Searching audit logs for entity IDs:', ids);

  const logs = await prisma.auditLog.findMany({
    where: {
      entityId: { in: ids }
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  console.log(`Found ${logs.length} audit log entries.\n`);

  logs.forEach(log => {
    console.log(`- Time: ${log.createdAt.toISOString()}`);
    console.log(`  Action: ${log.action} | Entity: ${log.entityName}`);
    console.log(`  User: ${log.userEmail || log.userId || 'system'}`);
    console.log(`  Old values:`, JSON.stringify(log.oldValues));
    console.log(`  New values:`, JSON.stringify(log.newValues));
    console.log('----------------------------------------');
  });

  await prisma.$disconnect();
}

main().catch(console.error);
