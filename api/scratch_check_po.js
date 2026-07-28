const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // 1. Check PO TGNCC-SZ00097
    const po1 = await prisma.dathang.findFirst({
      where: { madncc: 'TGNCC-SZ00097' },
      include: {
        sanpham: {
          include: {
            sanpham: true
          }
        }
      }
    });

    if (po1) {
      console.log(`PO: ${po1.madncc} | Status: ${po1.status} | ngaynhan: ${po1.ngaynhan}`);
      po1.sanpham.forEach(sp => {
        if (sp.sanpham.masp === 'I100263') {
          console.log(`- Product: ${sp.sanpham.masp} | ${sp.sanpham.title} | sldat: ${sp.sldat} | slnhan: ${sp.slnhan} | slgiao: ${sp.slgiao}`);
        }
      });
    } else {
      console.log("PO TGNCC-SZ00097 not found.");
    }

    // 2. Check PO TGNCC-XG00001
    const po2 = await prisma.dathang.findFirst({
      where: { madncc: 'TGNCC-XG00001' },
      include: {
        sanpham: {
          include: {
            sanpham: true
          }
        }
      }
    });

    if (po2) {
      console.log(`PO: ${po2.madncc} | Status: ${po2.status} | ngaynhan: ${po2.ngaynhan}`);
      po2.sanpham.forEach(sp => {
        if (sp.sanpham.masp === 'I100259') {
          console.log(`- Product: ${sp.sanpham.masp} | ${sp.sanpham.title} | sldat: ${sp.sldat} | slnhan: ${sp.slnhan} | slgiao: ${sp.slgiao}`);
        }
      });
    } else {
      console.log("PO TGNCC-XG00001 not found.");
    }

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
