const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const ordersWithoutPhieu = await prisma.donhang.findMany({
      where: {
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        NOT: {
          PhieuKho: {
            some: {}
          }
        }
      },
      select: { madonhang: true, status: true, ngaygiao: true }
    });

    console.log("Orders (dagiao/danhan/hoanthanh) WITHOUT PhieuKho:");
    console.log(JSON.stringify(ordersWithoutPhieu, null, 2));

    const purchaseWithoutPhieu = await prisma.dathang.findMany({
      where: {
        status: { in: ['danhan', 'hoanthanh'] },
        NOT: {
          PhieuKho: {
            some: {}
          }
        }
      },
      select: { madncc: true, status: true, ngaynhan: true }
    });

    console.log("Purchase Orders (danhan/hoanthanh) WITHOUT PhieuKho:");
    console.log(JSON.stringify(purchaseWithoutPhieu, null, 2));

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
