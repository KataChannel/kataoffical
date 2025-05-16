import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function truncateHoadonchitiet() {
  try {
    // Use executeRawUnsafe for raw SQL. Make sure your DB supports TRUNCATE ... CASCADE.
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "HoadonChitiet" CASCADE;');
    console.log('✅ Successfully truncated HoadonChitiet table with cascade');
  } catch (error) {
    console.error('⚠️ Error truncating HoadonChitiet:', error.message);
  }
}
async function main() {
  await truncateHoadonchitiet();
  await prisma.$disconnect();
}

main();
