import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDetail() {
  const detail = await prisma.chotkhodetail.findFirst({
    where: { sanpham: { masp: 'I100470' } },
    orderBy: { ngaychot: 'desc' },
    include: { chotkho: true, sanpham: true }
  });
  console.log(JSON.stringify(detail, null, 2));
}

checkDetail().finally(() => prisma.$disconnect());
