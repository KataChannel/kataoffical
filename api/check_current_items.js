
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orderId = 'f568a61d-91fe-4c12-935d-eb4bc21cb437';
  const order = await prisma.donhang.findUnique({
    where: { id: orderId },
    include: {
      sanpham: {
        include: {
          sanpham: true
        }
      }
    }
  });

  console.log(`Current items in TG-AA31770:`);
  order.sanpham.forEach((item, idx) => {
    console.log(`${idx+1}. ${item.sanpham.masp} - ${item.sanpham.title} (Qty: ${item.sldat})`);
  });
}

main().finally(() => prisma.$disconnect());
