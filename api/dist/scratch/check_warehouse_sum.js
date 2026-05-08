"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
async function main() {
    const products = await prisma.sanpham.findMany({
        include: { SanphamKho: true }
    });
    let totalDiscrepancies = 0;
    const discrepancies = [];
    for (const sp of products) {
        const khoTong = sp.SanphamKho.find(sk => sk.khoId === KHO_TONG_ID);
        const otherWarehouses = sp.SanphamKho.filter(sk => sk.khoId !== KHO_TONG_ID);
        const khoTongStock = Number(khoTong?.soluong || 0);
        const sumOtherStocks = otherWarehouses.reduce((sum, sk) => sum + Number(sk.soluong), 0);
        if (Math.abs(khoTongStock - sumOtherStocks) > 0.001 && sumOtherStocks !== 0) {
            totalDiscrepancies++;
            if (discrepancies.length < 10) {
                discrepancies.push({
                    masp: sp.masp,
                    khoTongStock,
                    sumOtherStocks,
                    diff: khoTongStock - sumOtherStocks,
                    warehouses: otherWarehouses.map(w => ({ id: w.khoId, sl: w.soluong }))
                });
            }
        }
    }
    console.log(`Total Products: ${products.length}`);
    console.log(`Products where KHO TỔNG != Sum Others: ${totalDiscrepancies}`);
    if (discrepancies.length > 0) {
        console.log('Sample Discrepancies:', JSON.stringify(discrepancies, null, 2));
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=check_warehouse_sum.js.map