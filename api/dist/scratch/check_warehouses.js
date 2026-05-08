"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const warehouses = await prisma.kho.findMany();
    for (const w of warehouses) {
        const count = await prisma.sanphamKho.count({ where: { khoId: w.id } });
        console.log(`${w.name} (${w.id}): ${count} products`);
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=check_warehouses.js.map