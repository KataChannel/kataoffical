import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkPO() {
  const poCode = 'TGNCC-LN00007';
  const po = await prisma.dathang.findFirst({
    where: { madncc: poCode },
    select: {
      id: true,
      madncc: true,
      poStatus: true,
      status: true
    }
  });

  if (po) {
    console.log('Purchase Order details:');
    console.log(JSON.stringify(po, null, 2));
  } else {
    console.log(`Purchase Order with code ${poCode} not found.`);
  }
}

checkPO()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
