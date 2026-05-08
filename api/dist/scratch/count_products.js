"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const count = await prisma.sanpham.count();
    console.log(`Total products in database: ${count}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=count_products.js.map