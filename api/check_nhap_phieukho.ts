import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const startDate = new Date('2026-02-19T00:00:00+07:00');
  const endDate = new Date('2026-02-21T00:00:00+07:00');

  console.log(`🔎 Searching for 'nhap' type PhieuKho...`);

  const phieukho = await prisma.phieuKho.findMany({
    where: {
      createdAt: { gte: startDate, lte: endDate },
      type: 'nhap'
    },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Found ${phieukho.length} 'nhap' PhieuKho records.`);
  phieukho.forEach(p => {
      console.log(`- ${p.maphieu} | Created: ${p.createdAt.toISOString()} | Ghi chu: ${p.ghichu}`);
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
