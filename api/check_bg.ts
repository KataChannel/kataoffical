
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const bg = await prisma.banggia.findUnique({
    where: { id: "cb030d9b-e607-4d38-9389-5728f7965823" }
  });
  console.log('Banggia:', JSON.stringify(bg, null, 2));

  const khen = await prisma.khachhang.findFirst({
    where: { id: "ffdce0f9-e659-44df-996c-cc9ff0380e73" }
  });
  console.log('KHÈN BanggiaId:', khen?.banggiaId);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
