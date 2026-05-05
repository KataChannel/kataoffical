"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const startDate = new Date('2026-02-19T00:00:00+07:00');
    const endDate = new Date('2026-02-21T00:00:00+07:00');
    console.log(`🔎 Listing ALL ImportHistory from ${startDate.toISOString()} to ${endDate.toISOString()} VN...`);
    const imports = await prisma.importHistory.findMany({
        where: {
            createdAt: { gte: startDate, lte: endDate }
        },
        orderBy: { createdAt: 'asc' }
    });
    console.log(`\nFound ${imports.length} imports:`);
    imports.forEach(i => {
        console.log(`- Title: ${i.title} | Status: ${i.status} | Created: ${i.createdAt.toISOString()}`);
    });
    const allAudits = await prisma.auditLog.findMany({
        where: {
            createdAt: { gte: startDate, lte: endDate }
        },
        select: { entityName: true, action: true, createdAt: true, userEmail: true },
        orderBy: { createdAt: 'asc' }
    });
    console.log(`\nFound ${allAudits.length} total audits in this window.`);
    const summary = allAudits.reduce((acc, curr) => {
        const key = `${curr.entityName}_${curr.action}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    console.log(summary);
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=broad_search.js.map