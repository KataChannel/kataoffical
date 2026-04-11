import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const masps = [
    'I100207', 'I100164', 'I100256', 'I100166', 'I100003',
    'I100233', 'I100479', 'I100113', 'I100004', 'I100002', 'I100165'
  ];

  console.log('--- PRODUCT STATUS ---');
  const products = await prisma.sanpham.findMany({
    where: { masp: { in: masps } },
    include: {
      TonKho: true,
      chotkhodetail: {
        orderBy: { ngaychot: 'desc' },
        take: 3,
        include: { chotkho: true }
      }
    }
  });

  for (const p of products) {
    console.log(`Product: ${p.masp} (${p.title})`);
    console.log(`  Current slton (Sanpham model): ${p.soluong}`);
    console.log(`  Current slton (TonKho model): ${p.TonKho?.slton}`);
    console.log(`  Current sltontt (TonKho model): ${p.TonKho?.sltontt}`);
    
    console.log('  Recent ChotKho Details:');
    for (const detail of p.chotkhodetail) {
      console.log(`    - Date: ${detail.ngaychot.toLocaleString()} | ID: ${detail.chotkhoId}`);
      console.log(`      System: ${detail.sltonhethong} | Reality: ${detail.sltonthucte} | Diff: ${detail.chenhlech}`);
      console.log(`      Title: ${detail.title} | Note: ${detail.ghichu}`);
    }
    console.log('------------------------');
  }

  // Also check the latest Chotkho sessions
  const latestChotkho = await prisma.chotkho.findMany({
    orderBy: { ngaychot: 'desc' },
    take: 5
  });
  console.log('--- LATEST CHOTKHO SESSIONS ---');
  for (const c of latestChotkho) {
    console.log(`${c.ngaychot.toLocaleString()} | ${c.title} | ID: ${c.id}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
