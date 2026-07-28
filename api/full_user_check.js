
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { email: 'ekr2411z@gmail.com' }
  });
  console.log(`User: ${JSON.stringify(users, null, 2)}`);
  
  // Try to find in profile table specifically
  const profiles = await prisma.profile.findMany({
    where: { user: { email: 'ekr2411z@gmail.com' } }
  });
  console.log(`Profile: ${JSON.stringify(profiles, null, 2)}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
