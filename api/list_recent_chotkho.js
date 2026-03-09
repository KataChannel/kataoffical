
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`--- Recent Chotkhodetail Records ---`);
  const recentDetails = await prisma.chotkhodetail.findMany({
    take: 20,
    orderBy: {
      ngaychot: 'desc'
    },
    include: {
      sanpham: {
          select: { title: true, masp: true }
      },
      chotkho: {
        include: {
          user: {
            include: {
              profile: true
            }
          }
        }
      }
    }
  });

  recentDetails.forEach(d => {
      const user = d.chotkho?.user;
      const userName = user?.profile?.name || user?.name || user?.email || 'Unknown';
      console.log(`[${d.ngaychot.toLocaleString('vi-VN')}] SP: ${d.sanpham?.title} (${d.sanpham?.masp}) SL: ${d.sltonthucte} User: ${userName}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
