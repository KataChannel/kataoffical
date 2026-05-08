import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const masps = ['I100270', 'I100213', 'I100625']; // Examples
  for (const masp of masps) {
    const sp = await prisma.sanpham.findUnique({
      where: { masp },
      include: {
        TonKho: true,
        SanphamKho: { include: { kho: true } }
      }
    });
    console.log(`Product: ${masp} (${sp?.title})`);
    console.log(`  Global Slton: ${sp?.TonKho?.slton}`);
    sp?.SanphamKho.forEach(sk => {
      console.log(`  - Warehouse ${sk.kho.name}: ${sk.soluong}`);
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
