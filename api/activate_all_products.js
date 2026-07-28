
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function activateAllProducts() {
  try {
    const result = await prisma.sanpham.updateMany({
      where: {
        isActive: false
      },
      data: {
        isActive: true,
        updatedAt: new Date()
      }
    });

    console.log(`Successfully activated ${result.count} products.`);
  } catch (error) {
    console.error('Error activating products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

activateAllProducts();
