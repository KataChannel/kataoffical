import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sp = await prisma.sanpham.findUnique({
    where: { masp: "I100270" },
    include: {
      TonKho: true,
      SanphamKho: {
        include: {
          kho: true
        }
      }
    }
  });
  console.log(JSON.stringify(sp, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
