import { PrismaClient } from '../api/node_modules/@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const tonkhoCount = await prisma.tonKho.count();
  console.log('TonKho count:', tonkhoCount);

  const productIds = [
    'I100233',
    'I100479',
    'I100164',
    'I100165',
    'I100166',
    'I100003',
    'I100002',
    'I100113',
    'I100207',
    'I100004',
    'I100256'
  ];

  for (const masp of productIds) {
    const sp = await prisma.sanpham.findUnique({
      where: { masp },
      include: {
        TonKho: true,
        SanphamKho: {
          include: { kho: true }
        }
      }
    });

    if (!sp) {
      console.log(`Product ${masp}: NOT FOUND`);
      continue;
    }

    console.log(`\n--- SẢN PHẨM: ${sp.title} (${sp.masp}) ---`);
    if (sp.TonKho) {
      console.log(`  HT (slton): ${Number(sp.TonKho.slton)}`);
      console.log(`  TT (sltontt): ${Number(sp.TonKho.sltontt)}`);
      console.log(`  Chờ giao: ${Number(sp.TonKho.slchogiao)}`);
      console.log(`  Chờ nhập: ${Number(sp.TonKho.slchonhap)}`);
    } else {
      console.log(`  HT (slton): CHƯA CÓ DỮ LIỆU TỒN KHO`);
    }

    const totalKho = sp.SanphamKho.reduce((acc, sk) => acc + Number(sk.soluong), 0);
    console.log(`  Tổng các kho (vật lý): ${totalKho}`);
    sp.SanphamKho.forEach(sk => {
      console.log(`    - ${sk.kho.name}: ${Number(sk.soluong)}`);
    });
  }

  await prisma.$disconnect();
}

main().catch(console.error);
