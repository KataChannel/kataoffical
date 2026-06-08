const { PrismaClient } = require('@prisma/client');
const DB_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';

async function main() {
  const prisma = new PrismaClient({ datasources: { postgres: { url: DB_URL } } });
  
  try {
    const id = '75fc2a82-539a-4c9f-a095-fa423c8ebab8';
    
    console.log(`🔎 Measuring query execution time for Dathang ID: ${id}`);
    const start = Date.now();
    
    const dathang = await prisma.dathang.findUnique({
      where: { id },
      include: {
        sanpham: {
          include: {
            sanpham: {
              include: {
                TonKho: true,
              },
            },
          },
        },
        nhacungcap: true,
        kho: true,
      },
    });
    
    const duration = Date.now() - start;
    console.log(`⏱️ Query took: ${duration} ms`);
    
    if (!dathang) {
      console.log('❌ Order not found in database!');
      return;
    }

    console.log('\n--- Order Info ---');
    console.log(`Mã: ${dathang.madncc}`);
    console.log(`Title: ${dathang.title}`);
    console.log(`Status: ${dathang.status}`);
    console.log(`Số lượng sản phẩm trong đơn (relations): ${dathang.sanpham.length}`);

    // Inspect first few items
    console.log('\n--- First 3 items: ---');
    dathang.sanpham.slice(0, 3).forEach(item => {
      console.log(`- ItemID: ${item.id} | Product: ${item.sanpham?.title} (${item.sanpham?.masp}) | sldat: ${item.sldat} | slgiao: ${item.slgiao} | slnhan: ${item.slnhan}`);
    });

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
