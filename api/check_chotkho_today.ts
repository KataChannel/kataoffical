import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Checking all Chotkho records from today...');

  const chotkhos = await prisma.chotkho.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0,0,0,0))
      }
    },
    include: {
      details: true,
      kho: true
    }
  });

  console.log(`Found ${chotkhos.length} Chotkho records today.`);
  console.log(JSON.stringify(chotkhos, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
