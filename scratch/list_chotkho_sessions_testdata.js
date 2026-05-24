const { PrismaClient } = require('/home/kata/Coding/rausachfinal/api/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public"
    }
  }
});

async function main() {
  const sessions = await prisma.chotkho.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 10
  });

  console.log('Recent 10 Chotkho sessions in TESTDATA database:');
  sessions.forEach(s => {
    console.log({
      id: s.id,
      title: s.title,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt
    });
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
