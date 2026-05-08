
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixAllNegativeStock() {
  try {
    const negativeItems = await prisma.tonKho.findMany({
      where: {
        OR: [
          { slton: { lt: 0 } },
          { sltontt: { lt: 0 } }
        ]
      },
      include: {
        sanpham: true
      }
    });

    console.log(`Found ${negativeItems.length} items with negative stock to fix.`);

    for (const item of negativeItems) {
      console.log(`Fixing ${item.sanpham.masp} (${item.sanpham.title}): slton=${item.slton}, sltontt=${item.sltontt} -> 0`);
      
      await prisma.tonKho.update({
        where: { id: item.id },
        data: {
          slton: 0,
          sltontt: 0,
          updatedAt: new Date()
        }
      });

      // Also fix in SanphamKho for KHO_TONG
      await prisma.sanphamKho.upsert({
        where: {
          sanphamId_khoId: {
            sanphamId: item.sanphamId,
            khoId: '4cc01811-61f5-4bdc-83de-a493764e9258'
          }
        },
        create: {
          sanphamId: item.sanphamId,
          khoId: '4cc01811-61f5-4bdc-83de-a493764e9258',
          soluong: 0
        },
        update: {
          soluong: 0
        }
      });
    }

    console.log('All negative stock items have been reset to 0.');
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAllNegativeStock();
