import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkImportsAndKho(masp: string) {
  const p = await prisma.sanpham.findUnique({ where: { masp } });
  if (!p) return;

  const imports = await prisma.dathangsanpham.findMany({
    where: { idSP: p.id },
    include: { dathang: true }
  });

  console.log(`\n=== IMPORTS FOR ${masp} ===`);
  for (const im of imports) {
    console.log(`- NCC: ${im.dathang?.madncc} | Qty: ${im.slnhan} | Status: ${im.dathang?.status} | KhoId: ${im.dathang?.khoId} | UpdatedAt: ${im.dathang?.updatedAt?.toLocaleString()}`);
  }

  const latestChot = await prisma.chotkho.findFirst({
    orderBy: { ngaychot: 'desc' }
  });
  console.log(`\nLatest ChotKho ID: ${latestChot?.id} | KhoId: ${latestChot?.khoId} | Title: ${latestChot?.title}`);
}

checkImportsAndKho('I100164')
  .finally(() => prisma.$disconnect());
