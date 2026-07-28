const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
    const tk = await prisma.tonKho.findFirst({
        where: { sanpham: { masp: 'I100260' } },
        include: { sanpham: true }
    });
    console.log('TonKho:\n', tk);

    const dathangSumRaw = await prisma.$queryRaw`
      SELECT "idSP", CAST(COALESCE(SUM("sldat"::numeric), 0) AS float8) as total
      FROM "Dathangsanpham"
      WHERE "idSP" = ${tk.sanpham.id}
      GROUP BY "idSP"
  `;
    console.log('dathangSumRaw:\n', dathangSumRaw);

    const donhangPendingRaw = await prisma.$queryRaw`
      SELECT "idSP", CAST(COALESCE(SUM("sldat"::numeric), 0) AS float8) as total
      FROM "Donhangsanpham"
      JOIN "Donhang" ON "Donhang".id = "Donhangsanpham"."donhangId"
      WHERE "idSP" = ${tk.sanpham.id} AND "Donhang".status = 'dadat'
      GROUP BY "idSP"
  `;
    console.log('donhangPendingRaw:\n', donhangPendingRaw);

    const donhangDeliveredRaw = await prisma.$queryRaw`
      SELECT "idSP", CAST(COALESCE(SUM("slnhan"::numeric), 0) AS float8) as total
      FROM "Donhangsanpham"
      JOIN "Donhang" ON "Donhang".id = "Donhangsanpham"."donhangId"
      WHERE "idSP" = ${tk.sanpham.id} AND "Donhang".status IN ('dagiao', 'danhan', 'hoanthanh')
      GROUP BY "idSP"
  `;
    console.log('donhangDeliveredRaw:\n', donhangDeliveredRaw);
}
run().finally(() => prisma.$disconnect());
