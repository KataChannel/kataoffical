"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const startDate = new Date('2026-02-19T00:00:00+07:00');
    const endDate = new Date('2026-02-21T00:00:00+07:00');
    console.log(`🔎 Searching AuditLog for keywords...`);
    const audits = await prisma.auditLog.findMany({
        where: {
            createdAt: { gte: startDate, lte: endDate },
            OR: [
                { entityName: { contains: 'Tồn', mode: 'insensitive' } },
                { entityName: { contains: 'Chốt', mode: 'insensitive' } },
                { entityName: { contains: 'Excel', mode: 'insensitive' } },
                { metadata: { path: ['title'], string_contains: 'Tồn' } },
                { metadata: { path: ['title'], string_contains: 'Chốt' } }
            ]
        },
        orderBy: { createdAt: 'asc' }
    });
    console.log(`Found ${audits.length} audits.`);
    audits.forEach(a => {
        console.log(`- Entity: ${a.entityName} | Action: ${a.action} | Time: ${a.createdAt.toISOString()}`);
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
//# sourceMappingURL=search_audits_keyword.js.map