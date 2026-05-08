
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkProductTransactions(masp) {
  const product = await prisma.sanpham.findFirst({
    where: { masp },
    include: {
      TonKho: true,
      PhieuKhoSanpham: {
        include: {
          phieuKho: true
        },
        orderBy: {
          phieuKho: {
            ngay: 'desc'
          }
        }
      }
    }
  });

  if (!product) {
    console.log(`Product with masp ${masp} not found`);
    return;
  }

  console.log(`Product: ${product.title} (${product.masp})`);
  console.log(`Current Stock (TonKho): slton=${product.TonKho?.slton}, sltontt=${product.TonKho?.sltontt}`);
  
  console.log('\nRecent Transactions:');
  product.PhieuKhoSanpham.slice(0, 10).forEach(pks => {
    console.log(`${pks.phieuKho.ngay.toISOString()} | ${pks.phieuKho.type.toUpperCase()} | Qty: ${pks.soluong} | Maphieu: ${pks.phieuKho.maphieu} | Ghichu: ${pks.phieuKho.ghichu}`);
  });
}

const masp = process.argv[2] || 'I100639';
checkProductTransactions(masp)
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
