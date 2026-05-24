const { PrismaClient } = require('/home/kata/Coding/rausachfinal/api/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
    }
  }
});

async function main() {
  const sessionId = 'd1d3b0cd-08e4-4bae-af6d-6afa729b78cd';
  const chotkho = await prisma.chotkho.findUnique({
    where: { id: sessionId },
    include: {
      details: {
        take: 5,
        include: {
          sanpham: true
        }
      }
    }
  });

  console.log('Session metadata:', {
    id: chotkho.id,
    title: chotkho.title,
    status: chotkho.status,
    createdAt: chotkho.createdAt,
    updatedAt: chotkho.updatedAt
  });

  console.log('Sample details (first 5):');
  chotkho.details.forEach(d => {
    console.log({
      id: d.id,
      masp: d.sanpham.masp,
      title: d.sanpham.title,
      sltonhethong: d.sltonhethong,
      sltonthucte: d.sltonthucte,
      slhuy: d.slhuy,
      chenhlech: d.chenhlech,
      ghichu: d.ghichu
    });
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
