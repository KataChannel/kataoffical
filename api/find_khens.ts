
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const customers = await prisma.khachhang.findMany({
    where: {
      name: {
        contains: 'KHÈN',
        mode: 'insensitive'
      }
    }
  });

  console.log('Customers Found:', JSON.stringify(customers, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
