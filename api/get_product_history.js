const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masps = ['I100233', 'I100479', 'I100207', 'I100003', 'I100002', 'I100164', 'I100165', 'I100166', 'I100004', 'I100256', 'I100113'];
  const startDate = new Date('2026-04-13');
  const endDate = new Date('2026-04-24');

  const chotkhos = await prisma.chotkho.findMany({
    where: {
      ngaychot: { gte: startDate, lt: endDate }
    },
    include: {
      details: {
        where: {
          sanpham: { masp: { in: masps } }
        },
        include: { sanpham: true }
      }
    },
    orderBy: { ngaychot: 'asc' }
  });

  const productHistory = {};
  masps.forEach(m => productHistory[m] = []);

  const dates = chotkhos.map(c => c.ngaychot.toISOString().split('T')[0]);

  chotkhos.forEach(c => {
    const date = c.ngaychot.toISOString().split('T')[0];
    c.details.forEach(d => {
      productHistory[d.sanpham.masp].push({
        date,
        actual: Number(d.sltonthucte),
        system: Number(d.sltonhethong),
        diff: Number(d.chenhlech)
      });
    });
  });

  console.log(JSON.stringify({ dates: Array.from(new Set(dates)), history: productHistory }, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
