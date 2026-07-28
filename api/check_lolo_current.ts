import { PrismaClient } from '@prisma/client';

async function main() {
  const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
  const prisma = new PrismaClient({ datasourceUrl: prodUrl });

  try {
    const masp = 'I100207';
    const product = await prisma.sanpham.findUnique({
      where: { masp },
      include: { 
        TonKho: true,
        SanphamKho: true
      }
    });

    if (!product) {
      console.log('❌ Product not found!');
      return;
    }

    console.log(`Product ID: ${product.id}`);
    console.log(`Product Title: ${product.title}`);
    console.log(`Product soluong (Sanpham table): ${product.soluong}`);
    console.log(`TonKho record:`, product.TonKho);
    console.log(`SanphamKho records:`, product.SanphamKho);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
