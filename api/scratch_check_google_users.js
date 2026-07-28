const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Querying all google provider users...');
  
  const users = await prisma.user.findMany({
    where: {
      provider: 'google'
    },
    select: {
      id: true,
      email: true,
      name: true,
      providerId: true,
      isActive: true
    }
  });

  console.log(`Found ${users.length} google users:`);
  users.forEach(u => {
    console.log(JSON.stringify(u, null, 2));
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
