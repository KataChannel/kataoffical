import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Connecting to database...');
  const count = await prisma.donhang.count({
    where: {
      ngaygiao: {
        gte: new Date('2026-01-01T00:00:00Z'),
        lte: new Date('2026-05-31T23:59:59Z')
      },
      status: {
        in: ['danhan', 'hoanthanh']
      }
    }
  });
  console.log(`Successfully connected! Total orders found: ${count}`);
}

main()
  .catch(err => {
    console.error('Error running test script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
