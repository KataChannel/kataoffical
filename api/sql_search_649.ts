import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Searching for any ImportHistory today containing the value 649...');

  const result: any[] = await prisma.$queryRaw`
    SELECT id, "createdAt", "type", "caseDetail"
    FROM "ImportHistory"
    WHERE "createdAt" >= CURRENT_DATE
    AND "caseDetail"::text LIKE '%649%'
  `;

  console.log(`Found ${result.length} imports containing 649 today.`);

  for (const imp of result) {
    console.log(`--- Import ID: ${imp.id} at ${imp.createdAt} (Type: ${imp.type}) ---`);
    console.log(JSON.stringify(imp.caseDetail, null, 2));
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
