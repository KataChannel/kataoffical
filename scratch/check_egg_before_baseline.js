const { PrismaClient } = require('/home/kata/Coding/rausachfinal/api/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
    }
  }
});

async function main() {
  const masp = 'I100275'; // Trứng vịt muối
  const product = await prisma.sanpham.findUnique({
    where: { masp }
  });

  if (!product) {
    console.log(`Product ${masp} not found!`);
    return;
  }

  console.log(`Product: ${product.title} (ID: ${product.id})`);

  // Find all chotkhodetail for this product in May 21st sessions
  const details21 = await prisma.chotkhodetail.findMany({
    where: {
      sanphamId: product.id,
      chotkho: {
        createdAt: {
          gte: new Date('2026-05-20T00:00:00Z'),
          lt: new Date('2026-05-22T00:00:00Z')
        }
      }
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

  console.log(`\nAll stock closing detail records for May 20-21:`);
  details21.forEach(d => {
    console.log(`- Session: "${d.chotkho.title}" | ID: ${d.chotkho.id} | CreatedAt: ${d.chotkho.createdAt.toISOString()}`);
    console.log(`  HT: ${d.sltonhethong} | TT: ${d.sltonthucte} | Huy: ${d.slhuy} | Lệch: ${d.chenhlech} | Ghi chú: "${d.ghichu || ''}"`);
  });

  // Let's also check if there are any audit logs or stock logs for this product on May 21st
  // First, let's see what logging tables are in the prisma client
  const models = Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$'));
  console.log('\nPrisma models in DB:', models);
}

main().catch(console.error).finally(() => prisma.$disconnect());
