"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const times = [
        new Date('2026-02-19T08:46:58.141Z'),
        new Date('2026-02-19T09:44:08.550Z')
    ];
    for (const time of times) {
        console.log(`\n🔎 Checking audits around ${time.toISOString()}...`);
        const audits = await prisma.auditLog.findMany({
            where: {
                createdAt: {
                    gte: new Date(time.getTime() - 5000),
                    lte: new Date(time.getTime() + 5000)
                }
            },
            orderBy: { createdAt: 'asc' }
        });
        audits.forEach(a => {
            console.log(`- ${a.entityName} | ${a.action} | ${a.createdAt.toISOString()} | User: ${a.userEmail}`);
        });
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
//# sourceMappingURL=deep_audit_check.js.map