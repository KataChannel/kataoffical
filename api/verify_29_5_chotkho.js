const { PrismaClient } = require('@prisma/client');

const DB_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';

async function main() {
  const prisma = new PrismaClient({ datasources: { postgres: { url: DB_URL } } });

  try {
    console.log('--- Verifying Chotkho baseline on rausachfinal database ---');
    
    // 1. Fetch latest Chotkho
    const latestChot = await prisma.chotkho.findFirst({
      where: {
        title: {
          contains: '29-05-2026'
        }
      },
      include: {
        _count: {
          select: { details: true }
        }
      }
    });

    if (!latestChot) {
      console.log('❌ Could not find a Chotkho record for 29-05-2026!');
      return;
    }

    console.log('\n✅ Found Chotkho Record:');
    console.log(`- ID: ${latestChot.id}`);
    console.log(`- Title: ${latestChot.title}`);
    console.log(`- Code ID: ${latestChot.codeId}`);
    console.log(`- Ghi chú: ${latestChot.ghichu}`);
    console.log(`- Ngaychot: ${latestChot.ngaychot.toISOString()}`);
    console.log(`- Created At: ${latestChot.createdAt.toISOString()}`);
    console.log(`- Total Detail Items: ${latestChot._count.details}`);

    // 2. Fetch some samples of Chotkhodetail
    const detailsSample = await prisma.chotkhodetail.findMany({
      where: { chotkhoId: latestChot.id },
      take: 5,
      include: {
        sanpham: {
          select: { masp: true, title: true }
        }
      }
    });

    console.log('\n📋 Sample details inserted:');
    detailsSample.forEach((det, idx) => {
      console.log(`[Sample ${idx + 1}] SP: ${det.sanpham.masp} - ${det.sanpham.title}`);
      console.log(`  System Stock: ${det.sltonhethong}`);
      console.log(`  Actual Stock: ${det.sltonthucte}`);
      console.log(`  Huy Stock: ${det.slhuy}`);
      console.log(`  Discrepancy: ${det.chenhlech}`);
      console.log(`  Note: ${det.ghichu}`);
    });

    // 3. Verify target products from Excel
    const targetMasps = ['I100405', 'I100172', 'I100101'];
    console.log(`\n🔍 Verifying target products ${JSON.stringify(targetMasps)} in database:`);
    for (const masp of targetMasps) {
      const sp = await prisma.sanpham.findUnique({
        where: { masp },
        include: {
          SanphamKho: { where: { khoId: '4cc01811-61f5-4bdc-83de-a493764e9258' } },
          TonKho: true
        }
      });
      if (sp) {
        console.log(`- Product ${sp.masp} (${sp.title}):`);
        console.log(`  - SanphamKho Stock: ${sp.SanphamKho[0]?.soluong}`);
        console.log(`  - TonKho.slton: ${sp.TonKho?.slton}`);
        console.log(`  - TonKho.sltontt: ${sp.TonKho?.sltontt}`);
        console.log(`  - TonKho.slchogiao: ${sp.TonKho?.slchogiao}`);
        console.log(`  - TonKho.slchonhap: ${sp.TonKho?.slchonhap}`);
      } else {
        console.log(`- Product ${masp} not found in DB`);
      }
    }

  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
