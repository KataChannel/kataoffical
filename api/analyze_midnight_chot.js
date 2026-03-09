
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const t1 = new Date('2026-03-07T17:00:30Z'); // 00:00:30 VN
  const t2 = new Date('2026-03-07T17:00:35Z'); // 00:00:35 VN

  const chots = await prisma.chotkho.findMany({
    where: {
      createdAt: { gte: t1, lte: t2 }
    },
    include: {
        details: {
            include: { sanpham: true }
        }
    }
  });

  console.log(`Analyzing midnight Chotkho records:`);
  chots.forEach(c => {
      console.log(`[${c.createdAt.toLocaleString('vi-VN')}] Title: ${c.title}`);
      c.details.forEach(d => {
          console.log(`   SP: ${d.sanpham?.masp} (${d.sanpham?.title}), Thật: ${d.sltonthucte}, HT: ${d.sltonht}`);
      });
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
