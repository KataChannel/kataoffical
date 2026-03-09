
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const t1 = new Date('2026-03-07T17:00:00Z'); // 00:00 VN
  const t2 = new Date('2026-03-07T17:01:00Z');

  const logs = await prisma.auditLog.findMany({
    where: {
      createdAt: { gte: t1, lte: t2 },
      action: 'UPDATE'
    }
  });

  console.log(`Kiểm tra các sản phẩm được chốt lúc 00:00 sáng nay:\n`);
  logs.forEach(l => {
      if (l.newValues && l.newValues.sltonthucte === 78) {
          console.log(`[TRÙNG KHỚP 78] Entity: ${l.entityName}, ID: ${l.entityId}`);
      }
  });

  // Check Chotkhodetail directly
  const chot78 = await prisma.chotkhodetail.findMany({
      where: {
          ngaychot: { gte: t1, lte: t2 },
          sltonthucte: 78
      },
      include: { sanpham: true }
  });

  chot78.forEach(c => {
      console.log(`Chốt kho SP ${c.sanpham?.masp} (${c.sanpham?.title}) về số 78`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
