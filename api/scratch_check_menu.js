const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Querying Menus in database...');
  
  const menus = await prisma.menu.findMany({
    orderBy: {
      order: 'asc'
    }
  });

  console.log(`Found ${menus.length} menus:`);
  menus.forEach(menu => {
    console.log(`- ID: ${menu.id} | Title: ${menu.title} | Slug: ${menu.slug} | ParentID: ${menu.parentId} | IsActive: ${menu.isActive}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
