const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
    }
  }
});

async function main() {
  const product = await prisma.sanpham.findFirst({
    where: { masp: 'I100479' },
    include: { Tonkho: true }
  });
  console.log(JSON.stringify(product, null, 2));
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
