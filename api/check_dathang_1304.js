const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dathangs = await prisma.dathang.findMany({
    where: {
      ngaynhan: {
        gte: new Date('2026-04-13'),
        lt: new Date('2026-04-14')
      }
    },
    include: {
      sanpham: {
        include: {
          sanpham: true
        }
      }
    }
  });

  console.log('--- Dathang Records for April 13 ---');
  dathangs.forEach(d => {
    console.log(`Order: ${d.madncc}, Supplier ID: ${d.nhacungcapId}, Status: ${d.status}`);
    d.sanpham.forEach(sp => {
      console.log(`  Masp: ${sp.sanpham.masp}, Dat: ${sp.sldat}, Giao: ${sp.slgiao}, Nhan: ${sp.slnhan}`);
    });
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
