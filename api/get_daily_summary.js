const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masps = ['I100233', 'I100479', 'I100207', 'I100003', 'I100002', 'I100164', 'I100165', 'I100166', 'I100004', 'I100256', 'I100113'];
  const startDate = new Date('2026-04-13T00:00:00Z');
  const endDate = new Date('2026-04-23T00:00:00Z');

  const history = {};

  for (const masp of masps) {
    history[masp] = {};
    const sp = await prisma.sanpham.findFirst({ where: { masp } });
    if (!sp) continue;

    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      const dayStart = new Date(d);
      const dayEnd = new Date(d);
      dayEnd.setDate(dayEnd.getDate() + 1);
      const dateStr = d.toISOString().split('T')[0];

      // SL Nhap
      const nhap = await prisma.dathangsanpham.aggregate({
        where: {
          idSP: sp.id,
          dathang: {
            status: 'danhan',
            updatedAt: { gte: dayStart, lt: dayEnd }
          }
        },
        _sum: { slnhan: true }
      });

      // SL Xuat
      const xuat = await prisma.donhangsanpham.aggregate({
        where: {
          idSP: sp.id,
          donhang: {
            status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
            updatedAt: { gte: dayStart, lt: dayEnd }
          }
        },
        _sum: { slnhan: true, slgiao: true, sldat: true }
      });

      // SL Chot
      const chot = await prisma.chotkhodetail.findFirst({
        where: {
          sanphamId: sp.id,
          ngaychot: { gte: dayStart, lt: dayEnd }
        }
      });

      history[masp][dateStr] = {
        nhap: Number(nhap._sum.slnhan || 0),
        xuat: Number(xuat._sum.slnhan || xuat._sum.slgiao || xuat._sum.sldat || 0),
        chot: chot ? Number(chot.sltonthucte) : null
      };
    }
  }

  console.log(JSON.stringify(history, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
