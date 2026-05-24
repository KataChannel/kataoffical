const { PrismaClient } = require('/home/kata/Coding/rausachfinal/api/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
    }
  }
});

async function main() {
  const sessionId = '1766cc73-632b-4741-9d02-d50d558e9065';
  
  const chotkho = await prisma.chotkho.findUnique({
    where: { id: sessionId },
    include: {
      _count: {
        select: { details: true }
      }
    }
  });

  if (!chotkho) {
    console.log(`Session ${sessionId} NOT found in RAUSACHFINAL database.`);
    return;
  }

  console.log('Successfully verified session in RAUSACHFINAL:');
  console.log({
    id: chotkho.id,
    title: chotkho.title,
    createdAt: chotkho.createdAt,
    detailsCount: chotkho._count.details
  });

  // Verify stock levels for key products (e.g. Trứng vịt muối, Bắp mỹ)
  const masps = ['I100275', 'I100008'];
  for (const masp of masps) {
    const product = await prisma.sanpham.findUnique({
      where: { masp },
      include: {
        SanphamKho: {
          where: { khoId: '4cc01811-61f5-4bdc-83de-a493764e9258' }
        },
        TonKho: true
      }
    });

    console.log(`\nProduct ${masp}: ${product.title}`);
    console.log(`- SanphamKho (HCM) soluong: ${product.SanphamKho[0]?.soluong}`);
    console.log(`- TonKho slton: ${product.TonKho?.slton}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
