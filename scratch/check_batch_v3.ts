import { PrismaClient } from '../api/node_modules/@prisma/client';

// Use the production database explicitly to avoid empty testdata
const DATABASE_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';
const prisma = new PrismaClient({
  datasources: {
    postgres: { // Fix: use 'postgres' instead of 'db'
      url: DATABASE_URL,
    },
  },
});

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

async function main() {
  console.log('--- KIỂM TRA HÀNG LOẠT SẢN PHẨM (DATABASE: RAUSACHFINAL) ---');
  
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
      console.log(`\nProduct ${masp}: NOT FOUND`);
      continue;
    }

    console.log(`\n--- SẢN PHẨM: ${sp.title} (${sp.masp}) ---`);
    if (sp.TonKho) {
      console.log(`  HT (slton): ${Number(sp.TonKho.slton)}`);
      console.log(`  TT (sltontt): ${Number(sp.TonKho.sltontt)}`);
      console.log(`  Chờ giao: ${Number(sp.TonKho.slchogiao)}`);
      console.log(`  Chờ nhập: ${Number(sp.TonKho.slchonhap)}`);
      
      const chenhlech = Number(sp.TonKho.slton) - Number(sp.TonKho.sltontt);
      if (Math.abs(chenhlech) > 0.01) {
        console.log(`  ⚠️ LỆCH SỔ SÁCH: ${chenhlech.toFixed(3)}`);
      }
    } else {
      console.log(`  HT (slton): CHƯA CÓ DỮ LIỆU TỒN KHO`);
    }

    const totalKho = sp.SanphamKho.reduce((acc, sk) => acc + Number(sk.soluong), 0);
    console.log(`  Tổng các kho (vật lý): ${totalKho}`);
    sp.SanphamKho.forEach(sk => {
      console.log(`    - ${sk.kho.name} (${sk.kho.makho}): ${Number(sk.soluong)}`);
    });
    
    // Check if totalKho matches sltontt
    if (sp.TonKho && Math.abs(totalKho - Number(sp.TonKho.sltontt)) > 0.01) {
      console.log(`  ⚠️ LỆCH TỔNG KHO VẬT LÝ VS SLTONTT: ${(totalKho - Number(sp.TonKho.sltontt)).toFixed(3)}`);
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
