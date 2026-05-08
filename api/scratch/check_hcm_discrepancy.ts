import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const HCM_KHO_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function main() {
  const products = await prisma.sanphamKho.findMany({
    where: { khoId: HCM_KHO_ID, soluong: { gt: 0 } },
    include: { sanpham: true },
    take: 10
  });

  for (const p of products) {
    const tonkho = await prisma.tonKho.findUnique({ where: { sanphamId: p.sanphamId } });
    console.log(`Product: ${p.sanpham.masp}, HCM Stock: ${p.soluong}, Global Stock: ${tonkho?.slton}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
