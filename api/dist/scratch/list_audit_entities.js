"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function listEntities() {
    const result = await prisma.auditLog.groupBy({
        by: ['entityName'],
        _count: { _all: true }
    });
    console.log(JSON.stringify(result, null, 2));
}
listEntities().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=list_audit_entities.js.map