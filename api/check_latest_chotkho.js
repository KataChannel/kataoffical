const { PrismaClient } = require('@prisma/client');
const DB_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';

async function main() {
  const prisma = new PrismaClient({ datasources: { postgres: { url: DB_URL } } });
  
  try {
    const records = await prisma.chotkho.findMany({
      where: {
        ngaychot: {
          gte: new Date('2026-06-07T00:00:00+07:00')
        }
      },
      include: {
        kho: true,
        _count: {
          select: { details: true }
        }
      },
      orderBy: { ngaychot: 'desc' }
    });

    console.log(`Found ${records.length} Chotkho records since June 7th:`);
    records.forEach(r => {
      console.log(`- ID: ${r.id}`);
      console.log(`  Title: ${r.title}`);
      console.log(`  ngaychot: ${r.ngaychot.toISOString()}`);
      console.log(`  createdAt: ${r.createdAt.toISOString()}`);
      console.log(`  Warehouse: ${r.kho?.name} (ID: ${r.khoId})`);
      console.log(`  Details count: ${r._count.details}`);
      console.log(`  Ghi chú: ${r.ghichu}`);
      console.log(`  codeId: ${r.codeId}`);
      console.log('---');
    });
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
