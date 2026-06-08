const { PrismaClient } = require('@prisma/client');
const DB_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';

async function main() {
  const prisma = new PrismaClient({ datasources: { postgres: { url: DB_URL } } });
  
  try {
    const dathangId = '75fc2a82-539a-4c9f-a095-fa423c8ebab8';
    console.log('=== BENCHMARKING DATHANG DETAIL PAGE DB QUERIES ===\n');

    // 1. Dathang findUnique
    let start = Date.now();
    const dathang = await prisma.dathang.findUnique({
      where: { id: dathangId },
      include: {
        sanpham: {
          include: {
            sanpham: {
              include: {
                TonKho: true,
              },
            },
          },
        },
        nhacungcap: true,
        kho: true,
      },
    });
    console.log(`1. Dathang.findUnique: ${Date.now() - start} ms`);

    // 2. Nhacungcap.findMany (page size 99999)
    start = Date.now();
    const nccs = await prisma.nhacungcap.findMany({
      orderBy: { createdAt: 'desc' },
    });
    console.log(`2. Nhacungcap.findMany: ${Date.now() - start} ms (Count: ${nccs.length})`);

    // 3. Kho.findMany (all)
    start = Date.now();
    const khos = await prisma.kho.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
    console.log(`3. Kho.findMany: ${Date.now() - start} ms (Count: ${khos.length})`);

    // 4. Banggia.findMany (all)
    start = Date.now();
    const banggias = await prisma.banggia.findMany({
      orderBy: { createdAt: 'desc' },
    });
    console.log(`4. Banggia.findMany: ${Date.now() - start} ms (Count: ${banggias.length})`);

    // 5. Sanpham.findMany (all, full payload - page size 99999)
    start = Date.now();
    const [sanphams, total] = await prisma.$transaction([
      prisma.sanpham.findMany({
        orderBy: { createdAt: 'desc' },
      }),
      prisma.sanpham.count(),
    ]);
    console.log(`5. Sanpham.findMany (Full - 99999): ${Date.now() - start} ms (Count: ${total})`);

    // 6. Sanpham.findMany (forSelect select only)
    start = Date.now();
    const sanphamForSelect = await prisma.sanpham.findMany({
      select: {
        id: true,
        masp: true,
        title: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log(`6. Sanpham.findMany (forSelect): ${Date.now() - start} ms (Count: ${sanphamForSelect.length})`);

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
