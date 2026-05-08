import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const khoId = '3344758e-c0bc-4562-9390-d58fc5717d03'; // SG2
  
  const [phieukhoCount, dathangCount, donhangCount] = await Promise.all([
    prisma.phieuKho.count({ where: { khoId } }),
    prisma.dathang.count({ where: { khoId } }),
    prisma.donhang.count({ where: { khoId } })
  ]);

  console.log(`SG2 Statistics:`);
  console.log(`- PhieuKho records: ${phieukhoCount}`);
  console.log(`- Dathang records: ${dathangCount}`);
  console.log(`- Donhang records: ${donhangCount}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
