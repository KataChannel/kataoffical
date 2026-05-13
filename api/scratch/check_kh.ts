import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const khachhang = await prisma.khachhang.findFirst({
    where: {
      OR: [
        { email: '0977272967' },
        { sdt: '0977272967' }
      ]
    }
  });
  console.log(JSON.stringify(khachhang, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
