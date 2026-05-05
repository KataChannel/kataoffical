"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const prisma = new client_1.PrismaClient();
async function main() {
    const masp = 'I100479';
    const results = { masp };
    const product = await prisma.sanpham.findUnique({
        where: { masp },
        include: {
            TonKho: true,
            chotkhodetail: {
                orderBy: { updatedAt: 'desc' },
                take: 10,
                include: {
                    chotkho: true
                }
            }
        }
    });
    if (!product) {
        results.error = 'Product not found';
    }
    else {
        results.product = product;
        results.recentAuditLogs = await prisma.auditLog.findMany({
            where: {
                entityId: product.id,
            },
            orderBy: { createdAt: 'desc' },
            take: 20
        });
        results.details1014 = await prisma.chotkhodetail.findMany({
            where: {
                sanphamId: product.id,
                sltonthucte: 1014
            },
            include: {
                chotkho: true
            }
        });
        results.phieuKhoMovements = await prisma.phieuKhoSanpham.findMany({
            where: { sanphamId: product.id },
            include: { phieuKho: true },
            orderBy: { createdAt: 'desc' },
            take: 10
        });
    }
    results.recentImports = await prisma.importHistory.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10
    });
    fs.writeFileSync('debug_results.json', JSON.stringify(results, null, 2));
    console.log('Results written to debug_results.json');
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=debug_masp.js.map