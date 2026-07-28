import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Targeted search for failed phieukho imports...');

  // Using raw query to search JSONB field if PostgreSQL, which is much faster
  const result: any[] = await prisma.$queryRaw`
    SELECT id, "createdAt", "caseDetail"
    FROM "ImportHistory"
    WHERE "type" = 'phieukho_error'
    AND "createdAt" >= CURRENT_DATE
    AND "caseDetail"::text LIKE '%I100479%'
  `;

  console.log(`Found ${result.length} failed imports containing I100479 today.`);

  for (const imp of result) {
    console.log(`--- Import ID: ${imp.id} at ${imp.createdAt} ---`);
    console.log(JSON.stringify(imp.caseDetail, null, 2));
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
