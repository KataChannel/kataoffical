"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const startDate = new Date('2026-02-19T00:00:00+07:00');
    const endDate = new Date('2026-03-01T00:00:00+07:00');
    console.log(`🔎 Searching for PhieuKho titles containing 'EXCEL' or 'CHỐT KHO'...`);
    const phieukho = await prisma.phieuKho.findMany({
        where: {
            createdAt: { gte: startDate, lte: endDate },
            OR: [
                { title: { contains: 'EXCEL', mode: 'insensitive' } },
                { title: { contains: 'CHỐT KHO', mode: 'insensitive' } }
            ]
        },
        orderBy: { createdAt: 'asc' }
    });
    console.log(`Found ${phieukho.length} records.`);
    phieukho.forEach(p => {
        console.log(`- ${p.title} | Created: ${p.createdAt.toISOString()}`);
    });
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_chotkho_titles.js.map