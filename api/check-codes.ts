import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const dh = await prisma.donhang.findFirst({ select: { madonhang: true } });
  const dt = await prisma.dathang.findFirst({ select: { madncc: true } });
  console.log("Donhang prefix:", dh?.madonhang);
  console.log("Dathang prefix:", dt?.madncc);
}
main().catch(console.error).finally(() => prisma.$disconnect());
