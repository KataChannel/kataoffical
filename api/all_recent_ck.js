
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const allCK = await prisma.chotkho.findMany({
    orderBy: { ngaychot: 'desc' },
    take: 50,
    include: {
      user: { include: { profile: true } }
    }
  });

  allCK.forEach(ck => {
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
