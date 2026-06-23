import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const targetSpId = '3dd7ce1a-320c-4a64-92b3-91eef614a4a3'; // Product: I100009 (Bắp non tươi)
  const khoTongId = '4cc01811-61f5-4bdc-83de-a493764e9258'; // KHO - HCM

  console.log(`🚀 Starting correction for product ID: ${targetSpId}`);

  // 1. Update SanphamKho for KHO-HCM
  const updatedSpKho = await prisma.sanphamKho.updateMany({
    where: {
      sanphamId: targetSpId,
      khoId: khoTongId
    },
    data: {
      soluong: 0,
      updatedAt: new Date()
    }
  });
  console.log(`✅ Updated SanphamKho count: ${updatedSpKho.count}`);

  // 2. Update TonKho
  const updatedTonKho = await prisma.tonKho.updateMany({
    where: {
      sanphamId: targetSpId
    },
    data: {
      slton: 0,
      sltontt: 0,
      updatedAt: new Date()
    }
  });
  console.log(`✅ Updated TonKho count: ${updatedTonKho.count}`);

  console.log('🎉 Stock correction completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error executing script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
