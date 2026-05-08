import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listEntities() {
  const result = await prisma.auditLog.groupBy({
    by: ['entityName'],
    _count: { _all: true }
  });
  console.log(JSON.stringify(result, null, 2));
}

listEntities().catch(console.error).finally(() => prisma.$disconnect());
