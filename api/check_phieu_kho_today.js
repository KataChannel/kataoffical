
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`--- PhieuKho Records Today ---`);
  const today = new Date('2026-03-08');
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  const phieukho = await prisma.phieuKho.findMany({
    where: {
      createdAt: {
        gte: startOfToday,
        lte: endOfToday
      }
    },
    include: {
      sanpham: {
        include: {
          sanpham: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  phieukho.forEach(pk => {
      console.log(`[${pk.maphieu}] [${pk.createdAt.toLocaleString('vi-VN')}] Type: ${pk.type}, Title: ${pk.title}`);
      pk.sanpham.forEach(item => {
          if (item.sanpham.masp === 'I100128') {
              console.log(` -> Product: ${item.sanpham.title} (${item.sanpham.masp}) Qty: ${item.soluong}`);
          }
      });
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
