const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`
    SELECT k.name, k.makho, SUM(sk.soluong)::float as total_qty, COUNT(sk.id)::int as product_count
    FROM "SanphamKho" sk
    JOIN "Kho" k ON sk."khoId" = k.id
    GROUP BY k.name, k.makho
    ORDER BY total_qty DESC
  `;
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
