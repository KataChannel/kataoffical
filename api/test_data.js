const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const startMarch = new Date('2026-03-05T15:00:00+07:00');
    const endMarch = new Date('2026-03-06T07:00:00+07:00');

    const startJune = new Date('2026-06-05T15:00:00+07:00');
    const endJune = new Date('2026-06-06T07:00:00+07:00');

    console.log(`Checking March: ${startMarch.toISOString()} to ${endMarch.toISOString()}`);

    const [dhM, dtM] = await Promise.all([
        prisma.donhang.count({ where: { ngaygiao: { gte: startMarch, lte: endMarch } } }),
        prisma.dathang.count({ where: { ngaynhan: { gte: startMarch, lte: endMarch } } })
    ]);
    console.log(`March results: Donhang=${dhM}, Dathang=${dtM}`);

    console.log(`Checking June: ${startJune.toISOString()} to ${endJune.toISOString()}`);
    const [dhJ, dtJ] = await Promise.all([
        prisma.donhang.count({ where: { ngaygiao: { gte: startJune, lte: endJune } } }),
        prisma.dathang.count({ where: { ngaynhan: { gte: startJune, lte: endJune } } })
    ]);
    console.log(`June results: Donhang=${dhJ}, Dathang=${dtJ}`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
