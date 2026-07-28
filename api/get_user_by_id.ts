import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getUserEmail() {
  const userId = '7c0b1f9c-8750-4720-ac9c-39713eb06755';
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  console.log(JSON.stringify(user, null, 2));
}

getUserEmail().finally(() => prisma.$disconnect());
