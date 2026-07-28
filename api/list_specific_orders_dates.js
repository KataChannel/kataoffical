
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // We know these IDs because we just processed them in previous steps
  const orderCodes = [
    "TG-AA00835", "TG-AA09660", "TG-AA01805", "TG-AA00972", 
    "TG-AA26991", "TG-AA27504", "TG-AA29390", "TG-AA15269", 
    "TG-AA28872", "TG-AA27874", "TG-AA02257", "TG-AA10005", 
    "TG-AA06267", "TG-AA01915", "TG-AA12068", "TG-AA19626",
    "TG-AA31770"
  ];

  const orders = await prisma.donhang.findMany({
    where: { madonhang: { in: orderCodes } },
    select: {
      madonhang: true,
      ngaygiao: true,
      status: true
    },
    orderBy: { ngaygiao: 'desc' }
  });

  console.log('--- DANH SÁCH CHI TIẾT ĐƠN HÀNG ---');
  orders.forEach((o, i) => {
    const dateStr = o.ngaygiao ? new Date(o.ngaygiao).toLocaleDateString('vi-VN') : 'Không xác định';
    console.log(`${i+1}. ${o.madonhang} | Ngày giao: ${dateStr} | Trạng thái: ${o.status}`);
  });
}

main().finally(() => prisma.$disconnect());
