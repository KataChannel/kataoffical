import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const khoId = '4cc01811-61f5-4bdc-83de-a493764e9258'; // KHO TỔNG - HCM
  
  const [phieukhoCount, dathangCount, donhangCount] = await Promise.all([
    prisma.phieuKho.count({ where: { khoId } }),
    prisma.dathang.count({ where: { khoId } }),
    prisma.donhang.count({ where: { khoId } })
  ]);

  console.log(`KHO TỔNG - HCM Statistics:`);
  console.log(`- PhieuKho records: ${phieukhoCount}`);
  console.log(`- Dathang records: ${dathangCount}`);
  console.log(`- Donhang records: ${donhangCount}`);

  // Check recent Donhang as examples
  const recentDonhangs = await prisma.donhang.findMany({
    where: { khoId },
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  console.log('\nRecent Donhang in HCM:', recentDonhangs.map(d => d.madonhang));
}

main().catch(console.error).finally(() => prisma.$disconnect());
