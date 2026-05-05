"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const masp = 'I100479';
    const product = await prisma.sanpham.findUnique({
        where: { masp },
        include: {
            TonKho: true
        }
    });
    console.log('Current state of product I100479:');
    console.log(JSON.stringify(product, null, 2));
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=current_check.js.map