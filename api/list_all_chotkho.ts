import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Listing ALL isChotkho phieus from today...');

  const pks = await prisma.phieuKho.findMany({
    where: {
      isChotkho: true,
      createdAt: {
        gte: new Date(new Date().setHours(0,0,0,0))
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Found ${pks.length} chotkho phieus.`);
  for (const pk of pks) {
    console.log(`${pk.maphieu} | ${pk.title} | ${pk.createdAt} | ${pk.isActive}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
