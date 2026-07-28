const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.dathangsanpham.findMany({ take: 5 }).then(r => console.log(JSON.stringify(r))).finally(() => p.$disconnect());
