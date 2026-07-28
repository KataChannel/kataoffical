
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const khId = "beee52e8-d6e0-4228-a46c-da8487e47ca4"; // BÒ TƠ BÌNH THẠNH (REAL)
  
  // Check 01-15 Jan
  const start1 = new Date('2025-12-31T17:00:00Z'); 
  const end1 = new Date('2026-01-15T16:59:59Z');

  // Check 16-25 Jan
  const start2 = new Date('2026-01-15T17:00:00Z');
  const end2 = new Date('2026-01-25T16:59:59Z');

  async function getOrders(start: Date, end: Date, label: string) {
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
      console.log(`--- ${label} ---`);
      orders.forEach(o => {
        const t = calculateOrderTotal(o);
        total += t;
        console.log(`${o.madonhang} | ${o.ngaygiao?.toISOString().split('T')[0]} | ${t.toLocaleString('en-US')}`);
      });
      console.log(`TOTAL ${label}:`, total.toLocaleString('en-US'));
      return total;
  }

  await getOrders(start1, end1, "01-15 JAN");
  await getOrders(start2, end2, "16-25 JAN");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
