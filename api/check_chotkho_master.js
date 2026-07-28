
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`--- Chotkho Master Records for Today ---`);
  const today = new Date('2026-03-08');
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  const chotkhos = await prisma.chotkho.findMany({
    where: {
      ngaychot: {
        gte: startOfToday,
        lte: endOfToday
      }
    },
    include: {
      user: {
          include: { profile: true }
      }
    },
    orderBy: {
      ngaychot: 'asc' // Should be desc but user's screenshot showed 09:08
    }
  });

  chotkhos.forEach(ck => {
      const user = ck.user;
      const userName = user?.profile?.name || user?.name || user?.email || 'Unknown';
      console.log(`[${ck.id}] [${ck.ngaychot.toLocaleString('vi-VN')}] User: ${userName}, Title: ${ck.title}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
