
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const ckid = '5326f9e7-f362-4a20-8946-a467030032ca';
  const ck = await prisma.chotkho.findUnique({
    where: { id: ckid },
    include: {
        detail: {
            where: {
                sanpham: { masp: 'I100128' }
            }
        }
    }
  });

  if (!ck) return console.log('Chotkho not found');
  console.log(`Chotkho: ${ck.title} (Id: ${ck.id})`);
  console.log(`Detail for I100128: ${JSON.stringify(ck.detail)}`);
  
  // Let's check if anyone else did a chotkho today but it was not identified as "Master"
  const detailsToday = await prisma.chotkhodetail.findMany({
    where: {
        ngaychot: {
            gte: new Date('2026-03-08T00:00:00Z'),
            lte: new Date('2026-03-08T23:59:59Z')
        },
        sanpham: { masp: 'I100128' }
    },
    include: {
        chotkho: { include: { user: true } }
    }
  });
  console.log(`\nFound ${detailsToday.length} Chotkho details for I100128 today:`);
  detailsToday.forEach(d => {
      console.log(`[${d.ngaychot.toLocaleString('vi-VN')}] SL: ${d.sltonthucte} User: ${d.chotkho?.user?.email}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
