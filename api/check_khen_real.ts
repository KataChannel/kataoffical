
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const khId = "ffdce0f9-e659-44df-996c-cc9ff0380e73"; // KHÈN
  
  const start = new Date('2026-01-16T00:00:00Z');
  const end = new Date('2026-01-25T23:59:59Z');

  const orders = await prisma.donhang.findMany({
    where: {
      khachhangId: khId,
      ngaygiao: {
        gte: start,
        lte: end
      },
      status: { in: ['danhan', 'hoanthanh'] }
    },
    include: {
      sanpham: true
    },
    orderBy: {
      ngaygiao: 'asc'
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
    const t = calculateOrderTotal(o);
    total += t;
    const gmt7Date = new Date(o.ngaygiao!.getTime() + 7 * 60 * 60 * 1000);
    console.log(`${gmt7Date.toISOString()} | ${o.madonhang}: ${t.toLocaleString()}`);
  });
  console.log('Total Recalculated:', total.toLocaleString());
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
