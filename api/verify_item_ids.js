
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

  if (!order) {
    console.log('Order not found');
    return;
  }

  console.log(`Order: ${order.madonhang}`);
  console.log(`Items: ${order.sanpham.length}`);
  
  order.sanpham.forEach((item, idx) => {
    if (item.sanpham.masp === 'I100060') {
      console.log(`Item ${idx}: RecID=${item.id}, ProdID=${item.sanpham.id}, masp=${item.sanpham.masp}`);
    }
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
