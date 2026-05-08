"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
async function main() {
    const conflicts = [];
    const products = await prisma.sanpham.findMany({
        include: { TonKho: true, SanphamKho: true }
    });
    for (const sp of products) {
        const khoTong = sp.SanphamKho.find(sk => sk.khoId === KHO_TONG_ID);
        const totalStock = Number(sp.TonKho?.slton || 0);
        const khoTongStock = Number(khoTong?.soluong || 0);
        if (totalStock !== khoTongStock) {
            conflicts.push({
                masp: sp.masp,
                totalStock,
                khoTongStock,
                diff: totalStock - khoTongStock
            });
        }
    }
    console.log(`Total Products: ${products.length}`);
    console.log(`Total Conflicts Found: ${conflicts.length}`);
    if (conflicts.length > 0) {
        console.log('Sample Conflicts:', conflicts.slice(0, 10));
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=final_audit.js.map