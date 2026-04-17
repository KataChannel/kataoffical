"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const masp = 'I100027';
    const end = new Date('2026-04-17T23:59:59.999Z');
    const product = await prisma.sanpham.findUnique({ where: { masp } });
    if (!product)
        return;
    const qualifyingDonhangs = await prisma.donhang.findMany({
        where: {
            ngaygiao: { lte: end },
            status: { in: ['dadat', 'dagiao'] },
        },
        select: { id: true, status: true },
    });
    const pendingDonhangIds = qualifyingDonhangs
        .filter((d) => d.status === 'dadat')
        .map((d) => d.id);
    const deliveredDonhangIds = qualifyingDonhangs
        .filter((d) => ['dagiao', 'danhan', 'hoanthanh'].includes(d.status))
        .map((d) => d.id);
    console.log(`Pending IDs count: ${pendingDonhangIds.length}`);
    console.log(`Delivered IDs count: ${deliveredDonhangIds.length}`);
    const pendingSum = await prisma.$queryRaw `
    SELECT CAST(COALESCE(SUM("sldat"::numeric), 0) AS float8) as total
    FROM "Donhangsanpham"
    WHERE "donhangId" = ANY(${pendingDonhangIds})
    AND "idSP" = ${product.id}
  `;
    const deliveredSum = await prisma.$queryRaw `
    SELECT CAST(COALESCE(SUM("sldat"::numeric), 0) AS float8) as total
    FROM "Donhangsanpham"
    WHERE "donhangId" = ANY(${deliveredDonhangIds})
    AND "idSP" = ${product.id}
  `;
    console.log(`Pending Sum (khachdat): ${pendingSum[0]?.total}`);
    console.log(`Delivered Sum (khachgiao): ${deliveredSum[0]?.total}`);
}
main().finally(() => prisma.$disconnect());
//# sourceMappingURL=replicate_resolver.js.map