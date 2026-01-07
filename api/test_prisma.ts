import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  console.log(Object.keys(prisma).filter(k => !k.startsWith('_')));
}

main();
