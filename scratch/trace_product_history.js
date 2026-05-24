const { PrismaClient } = require('/home/kata/Coding/rausachfinal/api/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
    }
  }
});

async function main() {
  const masp = 'I100051'; // Cải thảo
  
  console.log(`=== Tracing history of ${masp} ===`);
  
  // 1. Get Product ID
  const product = await prisma.sanpham.findUnique({
    where: { masp: masp }
  });
  
  if (!product) {
    console.log('Product not found!');
    return;
  }
  
  console.log(`Product: ${product.title} (ID: ${product.id})`);
  
  // 2. Get stock level in previous sessions
  const detail21 = await prisma.chotkhodetail.findFirst({
    where: {
      sanphamId: product.id,
      chotkho: {
        title: { contains: '21-05-2026' }
      }
    },
    include: { chotkho: true }
  });
  
  if (detail21) {
    console.log(`Baseline 21/05 stock level:`);
    console.log(`- Session Title: "${detail21.chotkho.title}"`);
    console.log(`- HT: ${detail21.sltonhethong}`);
    console.log(`- TT (Thực Tế): ${detail21.sltonthucte}`);
    console.log(`- Huy: ${detail21.slhuy}`);
    console.log(`- Chenhlech: ${detail21.chenhlech}`);
  } else {
    console.log('No Baseline 21/05 record found for this product.');
  }

  // 3. Get transactions (or orders) created on May 22nd
  // Note: Local cutoff was 22/05 17:00, but let's check sales between 21/05 17:00 and 22/05 17:00
  const prevCutoff = new Date('2026-05-21T17:00:00+07:00');
  const currCutoff = new Date('2026-05-22T17:00:00+07:00');
  
  console.log(`Sales/Orders between ${prevCutoff.toISOString()} and ${currCutoff.toISOString()}:`);
  
  // Get all order items for this product
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
  
  console.log(`Total active order items in this period: ${orderItems.length}`);
  let totalSoldDat = 0;
  let totalSoldGiao = 0;
  let totalSoldNhan = 0;
  orderItems.forEach(item => {
    console.log(`- Order: ${item.donhang.madonhang} | Status: ${item.donhang.status} | sldat: ${item.sldat} | slgiao: ${item.slgiao} | slnhan: ${item.slnhan} | CreatedAt: ${item.donhang.createdAt.toISOString()}`);
    totalSoldDat += Number(item.sldat || 0);
    totalSoldGiao += Number(item.slgiao || 0);
    totalSoldNhan += Number(item.slnhan || 0);
  });
  console.log(`Total sldat sold: ${totalSoldDat}`);
  console.log(`Total slgiao sold: ${totalSoldGiao}`);
  console.log(`Total slnhan sold: ${totalSoldNhan}`);

  // Let's also fetch sales for TODAY (after 17:00 yesterday until now)
  const afterYesterdayCutoff = new Date('2026-05-21T17:00:00+07:00');
  const salesToday = await prisma.donhangsanpham.findMany({
    where: {
      idSP: product.id,
      donhang: {
        createdAt: {
          gte: afterYesterdayCutoff
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

  console.log(`\nActive orders after yesterday's 17:00 cutoff: ${salesToday.length}`);
  let totalTodayDat = 0;
  salesToday.forEach(item => {
    console.log(`- Order: ${item.donhang.madonhang} | Status: ${item.donhang.status} | sldat: ${item.sldat} | slgiao: ${item.slgiao} | slnhan: ${item.slnhan} | CreatedAt: ${item.donhang.createdAt.toISOString()}`);
    totalTodayDat += Number(item.sldat || 0);
  });
  console.log(`Total sldat today: ${totalTodayDat}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
