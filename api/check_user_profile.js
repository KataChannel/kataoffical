
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'ekr2411z@gmail.com' },
    include: { profile: true }
  });
  console.log(`User: ${user?.email}`);
  console.log(`Profile Name: ${user?.profile?.name}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
