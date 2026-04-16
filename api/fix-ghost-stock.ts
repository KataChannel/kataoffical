import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("Starting global TonKho recalculation...");
  
  // Get all product IDs that have TonKho records
  const tonKhos = await prisma.tonKho.findMany({
    select: { sanphamId: true }
  });
  
  const sanphamIds = tonKhos.map(tk => tk.sanphamId);
  console.log(`Found ${sanphamIds.length} products to recalculate.`);

  // We can't easily call the service method without NestJS context, 
  // so we'll implement the logic here directly since it's simple.
  
  let fixedCount = 0;
  // Process in batches
  const batchSize = 100;
  for (let i = 0; i < sanphamIds.length; i += batchSize) {
    const currentBatch = sanphamIds.slice(i, i + batchSize);
    
    const sanphams = await prisma.sanpham.findMany({
      where: { id: { in: currentBatch } },
      include: {
        Donhangsanpham: {
          where: { donhang: { status: { in: ['dadat', 'dagiao'] } } }
        },
        Dathangsanpham: {
          where: { dathang: { status: { in: ['dadat', 'dagiao'] } } }
        }
      }
    });

    for (const sp of sanphams) {
      const pendingOut = sp.Donhangsanpham.reduce((sum, item) => sum + Number(item.slgiao || item.sldat || 0), 0);
      const pendingIn = sp.Dathangsanpham.reduce((sum, item) => sum + Number(item.slgiao || item.sldat || 0), 0);
      
      const slchogiao = Math.round(pendingOut * 1000) / 1000;
      const slchonhap = Math.round(pendingIn * 1000) / 1000;

      await prisma.tonKho.update({
        where: { sanphamId: sp.id },
        data: {
          slchogiao,
          slchonhap
        }
      });
      fixedCount++;
    }
    console.log(`Progress: ${fixedCount}/${sanphamIds.length}`);
  }

  console.log("Done! Total fixed:", fixedCount);
}

main().catch(console.error).finally(() => prisma.$disconnect());
