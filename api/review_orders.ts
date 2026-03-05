import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const startDate = new Date('2026-03-03T17:00:00+07:00');
  const endDate = new Date('2026-03-04T19:00:00+07:00');

  console.log(`Reviewing orders from ${startDate.toISOString()} to ${endDate.toISOString()}...`);

  const donhang = await prisma.donhang.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      khachhang: true,
      sanpham: {
        include: {
          sanpham: true
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  const dathang = await prisma.dathang.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      nhacungcap: true,
      sanpham: {
        include: {
          sanpham: true
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  console.log(`\n============================`);
  console.log(`Found ${donhang.length} Donhang (Sales Orders)`);
  console.log(`============================`);
  donhang.forEach(d => {
    console.log(`- Order: ${d.madonhang} | Customer: ${d.khachhang?.name || 'N/A'} | Total: ${d.tongtien} | Status: ${d.status} | Time: ${d.createdAt.toISOString()}`);
    d.sanpham.forEach(item => {
       console.log(`   * ${item.sanpham?.title} - Qty: ${item.sldat} x Price: ${item.giaban}`);
    });
  });

  console.log(`\n============================`);
  console.log(`Found ${dathang.length} Dathang (Purchase Orders)`);
  console.log(`============================`);
  dathang.forEach(d => {
    console.log(`- PO: ${d.madncc} | Supplier: ${d.nhacungcap?.name || 'N/A'} | Status: ${d.status} | Time: ${d.createdAt.toISOString()}`);
    d.sanpham.forEach(item => {
       console.log(`   * ${item.sanpham?.title} - Qty: ${item.sldat} x Price: ${item.gianhap}`);
    });
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
