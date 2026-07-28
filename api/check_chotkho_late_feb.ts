import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const startDate = new Date('2026-02-19T00:00:00+07:00');
  const endDate = new Date('2026-02-23T23:59:59+07:00');

  console.log(`🔎 Searching for PhieuKho with isChotkho=true from ${startDate.toISOString()} to ${endDate.toISOString()} VN...`);

  const phieukho = await prisma.phieuKho.findMany({
    where: {
      createdAt: { gte: startDate, lte: endDate },
      isChotkho: true
    },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Found ${phieukho.length} records.`);
  phieukho.forEach(p => {
      console.log(`- ${p.title} | Created: ${p.createdAt.toISOString()} | Ghichu: ${p.ghichu}`);
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
