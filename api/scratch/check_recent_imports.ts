import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkRecentImports() {
  const latestChot = await prisma.chotkho.findFirst({
    orderBy: { ngaychot: 'desc' }
  });
  
  const startTime = new Date('2026-04-10T00:00:00Z');
  const imports = await prisma.dathangsanpham.findMany({
    where: {
      dathang: {
        updatedAt: { gte: startTime },
        status: 'danhan'
      }
    },
    include: { dathang: true, sanpham: true }
  });

  console.log(`\n=== RECENT IMPORTS (Since 10/04) ===`);
  console.log(`Current ChotKho KhoId: ${latestChot?.khoId}`);
  
  for (const im of imports) {
    const isKhoMatch = im.dathang.khoId === latestChot?.khoId;
    console.log(`- SP: ${im.sanpham.masp} | Qty: ${im.slnhan} | KhoId: ${im.dathang.khoId} | Match: ${isKhoMatch} | UpdatedAt: ${im.dathang.updatedAt?.toLocaleString()}`);
  }
}

checkRecentImports()
  .finally(() => prisma.$disconnect());
