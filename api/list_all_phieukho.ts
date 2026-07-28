import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const startDate = new Date('2026-02-19T13:00:00+07:00');
  const endDate = new Date('2026-02-20T17:00:00+07:00');

  console.log(`🔎 Listing ALL PhieuKho from ${startDate.toISOString()} to ${endDate.toISOString()} VN...`);

  const phieukho = await prisma.phieuKho.findMany({
    where: {
      createdAt: { gte: startDate, lte: endDate }
    },
    include: { kho: true },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`\nFound ${phieukho.length} warehouse receipts:`);
  phieukho.forEach(p => {
    console.log(`- ${p.maphieu} | Type: ${p.type} | Created: ${p.createdAt.toISOString()} | Ghi chu: ${p.ghichu}`);
  });

}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
