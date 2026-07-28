
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orderId = 'f568a61d-91fe-4c12-935d-eb4bc21cb437';
  const order = await prisma.donhang.findUnique({
    where: { id: orderId },
    include: { sanpham: true }
  });

  console.log(`Order has ${order.sanpham.length} items.`);
  const chanhItems = order.sanpham.filter(i => i.idSP === '3d41818d-cd67-4dcb-9f04-6a811e732b3f');
  console.log(`Found ${chanhItems.length} Chanh không hạt items by idSP.`);
  
  if (chanhItems.length === 0) {
     console.log('Sample item:', JSON.stringify(order.sanpham[0]));
  }
}

main().finally(() => prisma.$disconnect());
