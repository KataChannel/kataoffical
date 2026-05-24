const { PrismaClient } = require('../api/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const customerCount = await prisma.khachhang.count();
    const productCount = await prisma.sanpham.count();
    console.log(`Total Customers in database: ${customerCount}`);
    console.log(`Total Products in database: ${productCount}`);
  } catch (err) {
    console.error('Error fetching counts:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
