import { PrismaClient } from '../api/node_modules/@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const tables = await prisma.$queryRawUnsafe(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
    console.log('Tables in public schema:');
    console.log(tables);
    
    // Also check if any other schemas exist
    const schemas = await prisma.$queryRawUnsafe(`SELECT schema_name FROM information_schema.schemata`);
    console.log('\nAvailable schemas:');
    console.log(schemas);
  } catch (err) {
    console.error('Error fetching tables:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
