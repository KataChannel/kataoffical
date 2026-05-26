const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const vouchers = await prisma.phieuKho.findMany({
      where: {
        maphieu: {
          contains: 'DOISOAT-26052026'
        }
      },
      include: {
        _count: {
          select: { sanpham: true }
        }
      }
    });

    console.log(`Found ${vouchers.length} vouchers with 'DOISOAT-26052026' in maphieu:`);
    vouchers.forEach(v => {
      console.log(`- ID: ${v.id} | maphieu: ${v.maphieu} | type: ${v.type} | Products count: ${v._count.sanpham}`);
    });

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
