const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const p = new PrismaClient();
const start = new Date('2026-03-05T15:00:00+07:00');
const end = new Date('2026-03-06T07:00:00+07:00');

p.dathang.findMany({
    where: { ngaynhan: { gte: start, lte: end } },
    include: { sanpham: true },
    take: 3
}).then(r => {
    fs.writeFileSync('inspect_result.json', JSON.stringify(r, null, 2));
}).finally(() => p.$disconnect());
