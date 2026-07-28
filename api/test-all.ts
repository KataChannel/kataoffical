import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const dathangs = await prisma.dathang.findMany({
    where: { status: { in: ['dadat', 'dagiao'] } },
    take: 5
  });
  console.log("Pending dathangs count:", dathangs.length);
}
main().catch(console.error).finally(() => prisma.$disconnect());
