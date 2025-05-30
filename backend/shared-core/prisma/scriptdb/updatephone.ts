import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function importData() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    if (user.SDT) {
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { phone: user.SDT },
        });
        console.log(`✅ Updated phone for user with ID ${user.id}`);
      } catch (error) {
        console.error(`⚠️ Error updating phone for user with ID ${user.id}:`, error.message);
      }
    }
  }

  console.log('✅ Completed updating user phone numbers!');
  await prisma.$disconnect();
}

importData();
