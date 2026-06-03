const { PrismaClient } = require('@prisma/client');

const DB_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public&connection_limit=25&pool_timeout=60&connect_timeout=20';
const prisma = new PrismaClient({ datasources: { postgres: { url: DB_URL } } });

async function main() {
  console.log("\n--- RAUSACHFINAL DATABASE INVESTIGATION ---");
  const totalProducts = await prisma.sanpham.count();
  console.log("Total products in rausachfinal:", totalProducts);

  const lastChotkho = await prisma.chotkho.findFirst({
    orderBy: { ngaychot: 'desc' }
  });
  if (lastChotkho) {
    console.log("Last Chotkho session in rausachfinal:", {
      id: lastChotkho.id,
      title: lastChotkho.title,
      ngaychot: lastChotkho.ngaychot.toISOString(),
      codeId: lastChotkho.codeId
    });
  } else {
    console.log("No Chotkho sessions found in rausachfinal.");
  }

  // Find Chotkho sessions on 31-05-2026
  const chotkhosToday = await prisma.chotkho.findMany({
    where: {
      ngaychot: {
        gte: new Date('2026-05-31T00:00:00+07:00'),
        lte: new Date('2026-05-31T23:59:59+07:00')
      }
    }
  });
  console.log(`Chotkho sessions on 2026-05-31: ${chotkhosToday.length}`);
  chotkhosToday.forEach(c => {
    console.log(`- ID: ${c.id}, Title: ${c.title}, NgayChot: ${c.ngaychot.toISOString()}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
