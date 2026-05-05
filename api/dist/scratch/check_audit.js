"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const logs = await prisma.auditLog.findMany({
        where: {
            entityName: 'Chotkho',
            action: 'CREATE'
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 1
    });
    console.log(JSON.stringify(logs, null, 2));
}
main()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_audit.js.map