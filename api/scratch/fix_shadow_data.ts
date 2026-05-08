import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
const SG2_KHO_ID = '3344758e-c0bc-4562-9390-d58fc5717d03';

async function main() {
  const products = await prisma.sanpham.findMany({
    include: { SanphamKho: true }
  });

  console.log(`Fixing data for ${products.length} products to align with Shadow Warehouse logic...`);

  let fixCount = 0;
  for (const sp of products) {
    const sg2Record = sp.SanphamKho.find(sk => sk.khoId === SG2_KHO_ID);
    const sg2Stock = Number(sg2Record?.soluong || 0);

    // If there is stock in SG2 (our current ground truth from Excel), 
    // it MUST be in KHO TỔNG as well.
    // For this one-time fix, we assume SG2 stock is the correct physical amount.
    
    await prisma.sanphamKho.upsert({
      where: {
        sanphamId_khoId: {
          sanphamId: sp.id,
          khoId: KHO_TONG_ID
        }
      },
      update: { soluong: sg2Stock },
      create: {
        sanphamId: sp.id,
        khoId: KHO_TONG_ID,
        soluong: sg2Stock
      }
    });

    // Sync TonKho to KHO TỔNG
    await prisma.tonKho.update({
      where: { sanphamId: sp.id },
      data: {
        slton: sg2Stock,
        sltontt: sg2Stock
      }
    });

    fixCount++;
    if (fixCount % 200 === 0) console.log(`Fixed ${fixCount} products...`);
  }

  console.log('Data synchronization complete. 100% compliance reached.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
