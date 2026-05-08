import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAudit() {
  const sp = await prisma.sanpham.findUnique({ where: { masp: 'I100470' } });
  if (!sp) return;

  const logs = await prisma.auditLog.findMany({
    where: {
      entityName: 'TonKho',
      entityId: sp.id
    },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  console.log(JSON.stringify(logs, null, 2));
}

checkAudit().finally(() => prisma.$disconnect());
