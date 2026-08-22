"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function compareAuditLogs() {
    const errorId = 'd748446a-7d23-49a8-9770-88f8e18601c7';
    const successId = 'b3b4e2e6-9214-42b2-ac16-0aa912803dbf';
    console.log('--- FETCHING AUDIT LOGS ---');
    const errorLog = await prisma.auditLog.findUnique({
        where: { id: errorId }
    });
    const successLog = await prisma.auditLog.findUnique({
        where: { id: successId }
    });
    if (!errorLog) {
        console.log(`ERROR: AuditLog with ID ${errorId} not found.`);
    }
    else {
        console.log('\n--- ERROR LOG DETAIL ---');
        console.log(JSON.stringify(errorLog, null, 2));
    }
    if (!successLog) {
        console.log(`ERROR: AuditLog with ID ${successId} not found.`);
    }
    else {
        console.log('\n--- SUCCESS LOG DETAIL ---');
        console.log(JSON.stringify(successLog, null, 2));
    }
}
compareAuditLogs()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=compare_audit_logs.js.map