import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDuaHau() {
  const masp = 'I100479';
  const sanpham = await prisma.sanpham.findFirst({
    where: { masp },
    include: {
      SanphamKho: {
        include: { kho: true }
      },
      TonKho: true,
      chotkhodetail: {
        orderBy: { ngaychot: 'desc' },
        take: 1,
        include: { chotkho: true }
      }
    }
  });

  if (!sanpham) {
    console.log('Product not found');
    return;
  }

  console.log('--- PRODUCT INFO ---');
  console.log(`ID: ${sanpham.id}`);
  console.log(`Title: ${sanpham.title}`);
  console.log(`Masp: ${sanpham.masp}`);

  console.log('\n--- TONKHO (Global) ---');
  console.log(JSON.stringify(sanpham.TonKho, null, 2));

  console.log('\n--- STOCK PER WAREHOUSE ---');
  if (sanpham.SanphamKho) {
    sanpham.SanphamKho.forEach((sk: any) => {
      console.log(`${sk.kho.name} (${sk.kho.makho}): ${sk.soluong}`);
    });
  }

  console.log('\n--- LATEST CLOSING ---');
  if (sanpham.chotkhodetail && sanpham.chotkhodetail.length > 0) {
    console.log(JSON.stringify(sanpham.chotkhodetail[0], null, 2));
  } else {
    console.log('No closing found');
  }

  await prisma.$disconnect();
}

checkDuaHau();
