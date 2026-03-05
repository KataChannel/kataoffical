import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Searching for failed phieukho imports in ImportHistory...');

  const failedImports = await prisma.importHistory.findMany({
    where: {
      type: 'phieukho_error',
      createdAt: {
        gte: new Date(new Date().setHours(0,0,0,0))
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`Found ${failedImports.length} failed imports today.`);

  for (const imp of failedImports) {
    console.log(`--- Import ID: ${imp.id} at ${imp.createdAt} ---`);
    const detail = imp.caseDetail as any;
    if (detail && detail.inputData) {
      if (detail.inputData.includes('I100479') || detail.inputData.includes('649')) {
        console.log('MATCH FOUND in inputData!');
        console.log(detail.inputData);
      } else {
        console.log('No match for I100479 in this failed import.');
      }
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
