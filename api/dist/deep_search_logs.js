"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const masp = 'I100479';
    console.log(`Checking history for product: ${masp}`);
    const product = await prisma.sanpham.findUnique({
        where: { masp }
    });
    if (!product) {
        console.log('Product not found');
        return;
    }
    const logs = await prisma.auditLog.findMany({
        where: {
            OR: [
                { entityId: product.id },
                {
                    newValues: {
                        path: ['sanpham'],
                        array_contains: { sanphamId: product.id }
                    }
                },
                {
                    newValues: {
                        path: ['ghichu'],
                        string_contains: masp
                    }
                }
            ]
        },
        orderBy: { createdAt: 'desc' },
        take: 50
    });
    const allRecentPhieukhoLogs = await prisma.auditLog.findMany({
        where: {
            entityName: { contains: 'Phieukho' },
            createdAt: {
                gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
            }
        },
        orderBy: { createdAt: 'desc' }
    });
    const matchingLogs = allRecentPhieukhoLogs.filter(log => {
        const str = JSON.stringify(log.newValues || {});
        return str.includes(product.id) || str.includes(masp);
    });
    console.log(`Found ${matchingLogs.length} matching logs in the last 24h`);
    console.log(JSON.stringify(matchingLogs, null, 2));
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=deep_search_logs.js.map