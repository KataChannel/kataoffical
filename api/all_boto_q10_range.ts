
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const khId = "6ac22c7f-f50a-4ebb-b954-d062c6d8c281"; // BÒ TƠ Q10
  
  const start = new Date('2026-01-15T17:00:00Z'); // 16th local
  const end = new Date('2026-01-25T16:59:59Z'); // 25th local

  const orders = await prisma.donhang.findMany({
    where: {
      khachhangId: khId,
      ngaygiao: {
        gte: start,
        lte: end
      }
    },
    orderBy: {
      ngaygiao: 'asc'
    }
  });

  orders.forEach(o => {
    console.log(`${o.madonhang} | ${o.ngaygiao?.toISOString()} | status: ${o.status} | tongtien: ${o.tongtien}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
