import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Checking recent ErrorLogs...');

  const recentErrors = await prisma.errorLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  console.log(JSON.stringify(recentErrors, null, 2));

  // Also check if any Phieukho was created today with 'isChotkho: true'
  const chotkhoPhieus = await prisma.phieuKho.findMany({
    where: {
      isChotkho: true,
      createdAt: {
        gte: new Date(new Date().setHours(0,0,0,0))
      }
    },
    include: {
      sanpham: {
        where: { sanphamId: 'b69aaeb6-f337-4df8-a78a-fa0c84f6faa7' }
      }
    }
  });
  console.log('Chotkho Phieus created today:', JSON.stringify(chotkhoPhieus, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
