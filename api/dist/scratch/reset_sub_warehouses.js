"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
async function main() {
    console.log('--- RESETTING VIRTUAL SUB-WAREHOUSE BALANCES TO 0 ---');
    const beforeCount = await prisma.sanphamKho.count({
        where: {
            NOT: { khoId: KHO_TONG_ID },
            soluong: { not: 0 }
        }
    });
    console.log(`Found ${beforeCount} products with non-zero stock in virtual warehouses.`);
    const updateResult = await prisma.sanphamKho.updateMany({
        where: {
            NOT: { khoId: KHO_TONG_ID }
        },
        data: {
            soluong: 0,
            updatedAt: new Date()
        }
    });
    console.log(`Successfully reset stock to 0 for ${updateResult.count} virtual warehouse product records.`);
    const loloProduct = await prisma.sanpham.findUnique({
        where: { masp: 'I100207' },
        include: { SanphamKho: { include: { kho: true } } }
    });
    if (loloProduct) {
        console.log(`\nSanity Check - Product: ${loloProduct.title} (${loloProduct.masp})`);
        loloProduct.SanphamKho.forEach(sk => {
            console.log(`  - Warehouse: ${sk.kho.name} (${sk.kho.makho}) | Stock: ${sk.soluong}`);
        });
    }
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=reset_sub_warehouses.js.map