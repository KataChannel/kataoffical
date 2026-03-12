
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const duplicates = await prisma.$queryRaw`
    SELECT "donhangId", "idSP", COUNT(*) as count
    FROM "Donhangsanpham"
    GROUP BY "donhangId", "idSP"
    HAVING COUNT(*) > 1
  `;

  const orderIds = [...new Set(duplicates.map(d => d.donhangId))];
  
  if (orderIds.length === 0) {
    // Also check TG-AA31770 specifically as it was the main focus
    orderIds.push('f568a61d-91fe-4c12-935d-eb4bc21cb437');
  }

  const orders = await prisma.donhang.findMany({
    where: { id: { in: orderIds } },
    select: {
      madonhang: true,
      ngaygiao: true,
      status: true
    },
    orderBy: { ngaygiao: 'desc' }
  });

  console.log('--- DANH SÁCH ĐƠN HÀNG BỊ TRÙNG LẶP SẢN PHẨM ---');
  orders.forEach((o, i) => {
    const dateStr = o.ngaygiao ? new Date(o.ngaygiao).toLocaleDateString('vi-VN') : 'Không xác định';
    console.log(`${i+1}. ${o.madonhang} | Ngày giao: ${dateStr} | Trạng thái: ${o.status}`);
  });
}

main().finally(() => prisma.$disconnect());
