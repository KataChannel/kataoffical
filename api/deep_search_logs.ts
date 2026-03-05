import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const masp = 'I100479';
  console.log(`Checking history for product: ${masp}`);

  const product = await prisma.sanpham.findUnique({
    where: { masp }
  });

  if (!product) {
    console.log('Product not found');
    return;
  }

  // Find any AuditLog entry that mentions this product id in newValues or changedFields
  // Using raw query or JSON search if possible, but let's try a simple approach first
  const logs = await prisma.auditLog.findMany({
    where: {
      OR: [
        { entityId: product.id },
        { 
          newValues: {
            path: ['sanpham'],
            array_contains: { sanphamId: product.id }
          }
        },
        // Also search in title or ghichu of newValues if it's a Phieukho
        {
          newValues: {
            path: ['ghichu'],
            string_contains: masp
          }
        }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  // Since Prisma's JSON filtering is limited, let's do more robust check
  const allRecentPhieukhoLogs = await prisma.auditLog.findMany({
    where: {
      entityName: { contains: 'Phieukho' },
      createdAt: {
        gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000) // Last 24 hours
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const matchingLogs = allRecentPhieukhoLogs.filter(log => {
    const str = JSON.stringify(log.newValues || {});
    return str.includes(product.id) || str.includes(masp);
  });

  console.log(`Found ${matchingLogs.length} matching logs in the last 24h`);
  console.log(JSON.stringify(matchingLogs, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
