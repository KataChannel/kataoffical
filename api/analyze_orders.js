const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function analyzeOrders() {
  const dates = ['2026-05-12', '2026-05-13', '2026-05-14', '2026-05-15'];
  
  for (const date of dates) {
    const start = new Date(date + 'T00:00:00Z'); // Using UTC for simplicity in query, but careful with local
    const end = new Date(date + 'T23:59:59Z');
    
    const stats = await prisma.donhang.groupBy({
      by: ['status'],
      where: {
        ngaygiao: { gte: start, lte: end }
      },
      _count: true
    });
    
    console.log(`Stats for ${date}:`, JSON.stringify(stats, null, 2));
  }
  
  await prisma.$disconnect();
}

analyzeOrders();
