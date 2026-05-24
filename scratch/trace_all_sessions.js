const { PrismaClient } = require('/home/kata/Coding/rausachfinal/api/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
    }
  }
});

async function traceProduct(masp) {
  console.log(`\n================ TRACING ${masp} ===============`);
  const product = await prisma.sanpham.findUnique({
    where: { masp: masp }
  });

  if (!product) {
    console.log(`Product ${masp} not found!`);
    return;
  }
  console.log(`Product: ${product.title} (ID: ${product.id})`);

  // Get all chotkhodetail for this product ordered by session createdAt
  const details = await prisma.chotkhodetail.findMany({
    where: {
      sanphamId: product.id
    },
    include: {
      chotkho: true
    },
    orderBy: {
      chotkho: {
        createdAt: 'asc'
      }
    }
  });

  console.log(`Found ${details.length} stock closing records:`);
  details.forEach(d => {
    console.log(`- Session: "${d.chotkho.title}" | CreatedAt: ${d.chotkho.createdAt.toISOString()}`);
    console.log(`  HT: ${d.sltonhethong} | TT: ${d.sltonthucte} | Huy: ${d.slhuy} | Lệch: ${d.chenhlech} | Ghi chú: "${d.ghichu || ''}"`);
  });
}

async function main() {
  const masps = ['I100275', 'I100051', 'I100008', 'I100220', 'I100270'];
  for (const masp of masps) {
    await traceProduct(masp);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
