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

  // Get details for sessions in May 20, 21, 22
  const details = await prisma.chotkhodetail.findMany({
    where: {
      sanphamId: product.id,
      chotkho: {
        createdAt: {
          gte: new Date('2026-05-20T00:00:00Z')
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

  console.log(`Found ${details.length} recent stock closing records:`);
  details.forEach(d => {
    console.log(`- Session: "${d.chotkho.title}" | ID: ${d.chotkho.id} | CreatedAt: ${d.chotkho.createdAt.toISOString()}`);
    console.log(`  HT (System): ${d.sltonhethong} | TT (Physical): ${d.sltonthucte} | Huy (Damage): ${d.slhuy} | Lệch (Discrepancy): ${d.chenhlech} | Ghi chú: "${d.ghichu || ''}"`);
  });

  // Query order items for this product created between May 21st 17:00 and May 22nd 17:00
  const prevCutoff = new Date('2026-05-21T17:00:00+07:00');
  const currCutoff = new Date('2026-05-22T17:00:00+07:00');
  
  const orderItems = await prisma.donhangsanpham.findMany({
    where: {
      idSP: product.id,
      donhang: {
        createdAt: {
          gte: prevCutoff,
          lt: currCutoff
        },
        status: {
          notIn: ['huy']
        }
      }
    },
    include: {
      donhang: true
    }
  });
  
  let totalSoldGiao = 0;
  orderItems.forEach(item => {
    totalSoldGiao += Number(item.slgiao || 0);
  });
  console.log(`Transactions May 21 17h -> May 22 17h: Total Sold (slgiao) = ${totalSoldGiao}`);
}

async function main() {
  const masps = ['I100275', 'I100051', 'I100008', 'I100220', 'I100270'];
  for (const masp of masps) {
    await traceProduct(masp);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
