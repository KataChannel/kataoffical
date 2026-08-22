"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const startDate = new Date('2026-02-20T00:00:00+07:00');
    const endDate = new Date('2026-02-21T23:59:59+07:00');
    console.log(`Checking audit logs between ${startDate.toISOString()} and ${endDate.toISOString()}`);
    const audits = await prisma.auditLog.findMany({
        where: {
            action: 'CREATE',
            createdAt: {
                gte: startDate,
                lte: endDate,
            }
        },
        take: 100,
        orderBy: { createdAt: 'desc' }
    });
    const imports = await prisma.importHistory.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lte: endDate,
            }
        },
        take: 100,
        orderBy: { createdAt: 'desc' }
    });
    console.log(`Found ${audits.length} audits`);
    console.log(`Found ${imports.length} imports`);
    if (imports.length > 0) {
        console.log(imports.map(i => `${i.title || i.type || i.status} @ ${i.createdAt.toISOString()}`).join('\n'));
    }
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_chotkho.js.map