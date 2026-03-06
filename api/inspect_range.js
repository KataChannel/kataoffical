const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
const start = new Date('2026-03-05T15:00:00+07:00');
const end = new Date('2026-03-06T07:00:00+07:00');

p.dathang.findMany({
    where: { ngaynhan: { gte: start, lte: end } },
    include: { sanpham: true },
    take: 3
}).then(r => console.log(JSON.stringify(r))).finally(() => p.$disconnect());
