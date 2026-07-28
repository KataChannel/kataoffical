
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const khId = "6ac22c7f-f50a-4ebb-b954-d062c6d8c281"; // BÒ TƠ Q10
  
  const start = new Date('2026-01-15T17:00:00Z'); // 16th local
  const end = new Date('2026-01-25T16:59:59Z'); // 25th local

  const orders = await prisma.donhang.findMany({
    where: {
      khachhangId: khId,
      ngaygiao: {
        gte: start,
        lte: end
      }
    },
    include: {
      sanpham: true
    },
    orderBy: {
      ngaygiao: 'asc'
    }
  });

  function calculateBaseTotal(donhang: any) {
    let tong = 0;
    for (const sp of donhang.sanpham) {
      const slnhan = Number(sp.slnhan) || 0;
      if (slnhan === 0) continue;
      const giaban = Number(sp.giaban) || 0;
      tong += slnhan * giaban;
    }
    return tong;
  }

  let totalBase = 0;
  orders.forEach(o => {
    const t = calculateBaseTotal(o);
    totalBase += t;
    console.log(`${o.madonhang} | Base: ${t}`);
  });
  console.log('Total Base Sum:', totalBase);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
