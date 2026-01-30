
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const kh = await prisma.khachhang.findFirst({
    where: {
      name: {
        contains: 'KHÈN',
        mode: 'insensitive'
      }
    }
  });

  if (kh) {
    console.log('Customer Found:', kh.name);
    
    const orders = await prisma.donhang.findMany({
      where: {
        khachhangId: kh.id
      },
      include: {
        sanpham: true
      },
      orderBy: {
         ngaygiao: 'asc'
      }
    });

    orders.forEach(o => {
      console.log(`${o.madonhang} | ${o.ngaygiao?.toISOString()} | status: ${o.status}`);
    });
  } else {
    console.log('Customer KHÈN not found');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
