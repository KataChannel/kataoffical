import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public'
    }
  }
});

async function main() {
  console.log('=== CHECKING CHOTKHO TIMESTAMPS ===\n');

  const ck = await prisma.chotkho.findUnique({
    where: { id: '6feb6646-aab4-4151-a220-a71b0e142887' }
  });

  if (ck) {
    console.log(`Chotkho ID: ${ck.id}`);
    console.log(`Title:      ${ck.title}`);
    console.log(`ngaychot:   ${ck.ngaychot.toISOString()}`);
    console.log(`createdAt:  ${ck.createdAt.toISOString()}`);
    console.log(`updatedAt:  ${ck.updatedAt.toISOString()}`);
  } else {
    console.log('❌ Chotkho not found');
  }

  await prisma.$disconnect();
}

main().catch(console.error);
