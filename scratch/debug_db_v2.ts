import { PrismaClient } from '../api/node_modules/@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const dbName = await prisma.$queryRawUnsafe(`SELECT current_database()`);
    console.log('Current Database:', dbName);

    const allTables = await prisma.$queryRawUnsafe(`SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('information_schema', 'pg_catalog')`);
    console.log('\nAll tables (excluding system):');
    console.log(allTables);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
