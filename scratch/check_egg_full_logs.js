const { PrismaClient } = require('/home/kata/Coding/rausachfinal/api/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
    }
  }
});

async function main() {
  const masp = 'I100275'; // Trứng vịt muối
  const product = await prisma.sanpham.findUnique({
    where: { masp }
  });
  
  if (!product) {
    console.log(`Product ${masp} not found!`);
    return;
  }

  // 1. Get baseline at May 20th
  const detail20 = await prisma.chotkhodetail.findFirst({
    where: {
      sanphamId: product.id,
      chotkho: {
        title: { contains: '20-05-2026' }
      }
    },
    include: { chotkho: true }
  });
  console.log(`--- Tồn Baseline Ngày 20/05 ---`);
  if (detail20) {
    console.log(`HT: ${detail20.sltonhethong} | TT: ${detail20.sltonthucte} | Lệch: ${detail20.chenhlech}`);
  } else {
    console.log('Không tìm thấy.');
  }

  // 2. Fetch all sales between May 20 17h00 and May 21 17h00
  const cutoff20 = new Date('2026-05-20T17:00:00+07:00');
  const cutoff21 = new Date('2026-05-21T17:00:00+07:00');
  const cutoff22 = new Date('2026-05-22T17:00:00+07:00');

  const sales21 = await prisma.donhangsanpham.findMany({
    where: {
      idSP: product.id,
      donhang: {
        createdAt: { gte: cutoff20, lt: cutoff21 },
        status: { notIn: ['huy'] }
      }
    },
    include: { donhang: true }
  });

  console.log(`\n--- Bán Ra Ngày 21/05 (Từ 17h 20/5 đến 17h 21/5) ---`);
  let totalSold21 = 0;
  sales21.forEach(item => {
    console.log(`- Đơn: ${item.donhang.madonhang} | CreatedAt: ${item.donhang.createdAt.toLocaleString('vi-VN')} | Giao: ${item.slgiao}`);
    totalSold21 += Number(item.slgiao || 0);
  });
  console.log(`Tổng bán ngày 21/05 = ${totalSold21}`);

  // 3. Fetch all delivery/import (nhập kho) transactions between May 20 17h00 and May 22 17h00
  // Let's check PhieuKhoSanpham for this product
  const imports = await prisma.phieuKhoSanpham.findMany({
    where: {
      sanphamId: product.id,
      phieuKho: {
        createdAt: { gte: cutoff20, lt: cutoff22 }
      }
    },
    include: { phieuKho: true }
  });

  console.log(`\n--- Nhập/Xuất Kho (PhieuKho) Từ 17h 20/05 Đến 17h 22/05 ---`);
  if (imports.length === 0) {
    console.log('Không có giao dịch nhập/xuất kho (PhieuKho) nào.');
  } else {
    imports.forEach(item => {
      console.log(`- Phiếu: ${item.phieuKho.maphieu} | Kiểu: ${item.phieuKho.type} | CreatedAt: ${item.phieuKho.createdAt.toLocaleString('vi-VN')} | Số lượng: ${item.soluong}`);
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
