
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listNegativeStock() {
  try {
    const negativeItems = await prisma.tonKho.findMany({
      where: {
        OR: [
          { slton: { lt: 0 } },
          { sltontt: { lt: 0 } }
        ]
      },
      include: {
        sanpham: {
          select: {
            masp: true,
            title: true,
            dvt: true
          }
        }
      },
      orderBy: {
        slton: 'asc'
      }
    });

    if (negativeItems.length === 0) {
      console.log('No negative stock items found.');
      return;
    }

    console.log(`Found ${negativeItems.length} items with negative stock:\n`);
    console.log('Mã SP | Tên Sản Phẩm | DVT | SL Tồn | Tồn Thực Tế');
    console.log('--------------------------------------------------');
    
    negativeItems.forEach(item => {
      console.log(`${item.sanpham?.masp || 'N/A'} | ${item.sanpham?.title || 'N/A'} | ${item.sanpham?.dvt || ''} | ${item.slton} | ${item.sltontt}`);
    });

  } catch (error) {
    console.error('Error fetching negative stock:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listNegativeStock();
