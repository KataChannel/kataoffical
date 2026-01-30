
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const kh = await prisma.khachhang.findFirst({
    where: {
      name: {
        contains: 'BÒ TƠ BÌNH THẠNH',
        mode: 'insensitive'
      }
    }
  });

  if (kh) {
    console.log('Customer Found:', kh.name);
    
    const start = new Date('2025-12-31T17:00:00Z'); // 1st local
    const end15 = new Date('2026-01-15T16:59:59Z'); // 15th local end

    const orders = await prisma.donhang.findMany({
      where: {
        khachhangId: kh.id,
        ngaygiao: {
          gte: start,
          lte: end15
        },
        status: { in: ['danhan', 'hoanthanh'] }
      },
      include: {
        sanpham: true
      }
    });

    function calculateOrderTotal(donhang: any) {
      let tong = 0;
      for (const sp of donhang.sanpham) {
        const slnhan = Number(sp.slnhan) || 0;
        if (slnhan === 0) continue;
        const giaban = Number(sp.giaban) || 0;
        tong += slnhan * giaban;
      }
      const vatRate = donhang.isshowvat ? (Number(donhang.vat) || 0) : 0;
      return tong * (1 + vatRate);
    }

    let total = 0;
    orders.forEach(o => {
      total += calculateOrderTotal(o);
    });
    
    console.log('System Sum (01-15):', total);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
