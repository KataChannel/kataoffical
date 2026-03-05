import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Searching for I100479 in PhieuKho ghichu or PhieuKhoSanpham...');

  const results = await prisma.phieuKho.findMany({
    where: {
      OR: [
        { ghichu: { contains: 'I100479' } },
        { sanpham: { some: { sanpham: { masp: 'I100479' } } } }
      ],
      createdAt: {
        gte: new Date(new Date().setHours(0,0,0,0))
      }
    },
    include: {
      sanpham: {
        where: { sanpham: { masp: 'I100479' } },
        include: { sanpham: true }
      }
    }
  });

  console.log(`Found ${results.length} phieukhos mentioning I100479 today.`);
  for (const pk of results) {
    console.log(`- ${pk.maphieu} | ${pk.title} | ${pk.createdAt}`);
    console.log(`  Items match: ${JSON.stringify(pk.sanpham, null, 2)}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
