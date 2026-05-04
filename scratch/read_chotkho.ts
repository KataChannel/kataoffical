import { PrismaClient } from '../api/node_modules/@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const chotkhoId = 'e59437ab-5f47-45f0-9ae0-9d892af57ada';
  
  const chotkho = await prisma.chotkho.findUnique({
    where: { id: chotkhoId },
    include: {
      details: {
        include: {
          sanpham: {
            select: { masp: true, title: true }
          }
        }
      }
    }
  });

  if (!chotkho) {
    console.log('Chotkho not found');
    return;
  }

  const details = chotkho.details.map(d => ({
    masp: d.sanpham?.masp,
    title: d.sanpham?.title,
    sltonhethong: Number(d.sltonhethong),
    sltonthucte: Number(d.sltonthucte),
    slhuy: Number(d.slhuy),
    chenhlech: Number(d.chenhlech)
  }));

  console.log(JSON.stringify(details));
  await prisma.$disconnect();
}

main().catch(console.error);
