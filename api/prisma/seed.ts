import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.menu.createMany({
    data: [
      { id: '1', title: 'Dashboard',slug: '/dashboard', order: 1 },
      { id: '2', title: 'Users', slug: '/users', order: 2 },
      { id: '3', title: 'Settings', slug: '/settings', order: 3 },
      { id: '4', title: 'Profile', slug: '/profile', parentId: '3', order: 1 },
      { id: '5', title: 'Security', slug: '/security', parentId: '3', order: 2 },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
