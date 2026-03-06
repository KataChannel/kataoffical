const { PrismaClient } = require('./node_modules/@prisma/client');

async function test() {
    const p = new PrismaClient();
    const c = await p.chotkho.findFirst({ orderBy: { id: 'desc' } });
    console.log(c);

    const h = await p.chotkho.findFirst({ orderBy: { createdAt: 'desc' } });
    console.log(h);
    await p.$disconnect();
}
test();
