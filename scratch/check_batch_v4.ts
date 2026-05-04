import { PrismaClient } from '../api/node_modules/@prisma/client';

const DATABASE_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';
const prisma = new PrismaClient({
  datasources: {
    postgres: {
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
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  console.log(`--- KIỂM TRA CHI TIẾT TỒN KHO & ĐƠN HÀNG (${today.toISOString().split('T')[0]}) ---`);
  
  for (const masp of productIds) {
    const sp = await prisma.sanpham.findUnique({
      where: { masp },
      include: {
        TonKho: true,
        SanphamKho: { include: { kho: true } },
        Donhangsanpham: {
          where: {
            donhang: {
              ngaygiao: { gte: today, lte: tomorrow },
              status: { in: ['dadat', 'dagiao', 'danhan', 'hoanthanh'] }
            }
          },
          include: { donhang: true }
        }
      }
    });

    if (!sp) {
      console.log(`\nProduct ${masp}: NOT FOUND`);
      continue;
    }

    // Calculate khachdat and khachgiao like the frontend
    let khachdat = 0;
    let khachgiao = 0;
    
    sp.Donhangsanpham.forEach(item => {
      if (item.donhang.status === 'dadat') {
        khachdat += Number(item.sldat || 0);
      } else {
        // dagiao, danhan, hoanthanh
        const slThucGiao = Number(item.slnhan || 0) > 0 ? Number(item.slnhan) : Number(item.sldat || 0);
        khachgiao += slThucGiao;
      }
    });

    const slton = sp.TonKho ? Number(sp.TonKho.slton) : 0;
    const sltontt = sp.TonKho ? Number(sp.TonKho.sltontt) : 0;
    const tongkho = sltontt; // Simplify for now, assuming no incoming NCC orders for today in this check
    
    const goiy = khachdat + khachgiao - tongkho;

    console.log(`\n--- ${sp.title} (${sp.masp}) ---`);
    console.log(`  📊 Tồn Kho: HT=${slton.toFixed(2)}, TT=${sltontt.toFixed(2)}`);
    console.log(`  🛒 Đơn hàng: Đặt=${khachdat.toFixed(2)}, Đã giao=${khachgiao.toFixed(2)}`);
    console.log(`  💡 Gợi ý (UI): ${goiy.toFixed(2)}  (Công thức: Đặt + Giao - Tổng tồn)`);
    
    if (Math.abs(slton - sltontt) > 0.01) {
      console.log(`  ⚠️ CẢNH BÁO: Lệch sổ sách ${ (slton - sltontt).toFixed(2) }`);
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
