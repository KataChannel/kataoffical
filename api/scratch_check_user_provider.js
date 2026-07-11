const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const id = '92367cf7-eadd-4da1-b638-0867cf287780';
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    console.log('User not found');
    return;
  }

  console.log('User details:');
  console.log(JSON.stringify({
    id: user.id,
    email: user.email,
    SDT: user.SDT,
    name: user.name,
    provider: user.provider,
    providerId: user.providerId,
    isActive: user.isActive,
    createdAt: user.createdAt
  }, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
