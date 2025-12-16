"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const dathang = await prisma.dathang.findFirst({
        where: { madncc: 'TGNCC-JK00005' },
        include: {
            nhacungcap: true,
            sanpham: {
                include: {
                    sanpham: true
                }
            }
        }
    });
    console.log('=== THÔNG TIN ĐƠN ĐẶT HÀNG NCC ===');
    console.log(JSON.stringify(dathang, null, 2));
    if (dathang) {
        const auditLogs = await prisma.auditLog.findMany({
            where: {
                entityId: dathang.id
            },
            orderBy: { createdAt: 'asc' }
        });
        console.log('\n=== AUDIT LOGS (entityId match) ===');
        console.log(JSON.stringify(auditLogs, null, 2));
        const auditLogsByName = await prisma.auditLog.findMany({
            where: {
                entityName: 'Dathang'
            },
            orderBy: { createdAt: 'desc' },
            take: 100
        });
        const filteredLogs = auditLogsByName.filter(log => {
            const newVals = log.newValues;
            const oldVals = log.oldValues;
            return (newVals?.madncc === 'TGNCC-JK00005') ||
                (oldVals?.madncc === 'TGNCC-JK00005') ||
                log.entityId === dathang.id;
        });
        console.log('\n=== AUDIT LOGS (Dathang with TGNCC-JK00005) ===');
        console.log(JSON.stringify(filteredLogs, null, 2));
    }
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=query-order.js.map