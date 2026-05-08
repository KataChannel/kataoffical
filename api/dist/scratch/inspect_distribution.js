"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const masps = ['I100270', 'I100213', 'I100625'];
    for (const masp of masps) {
        const sp = await prisma.sanpham.findUnique({
            where: { masp },
            include: {
                TonKho: true,
                SanphamKho: { include: { kho: true } }
            }
        });
        console.log(`Product: ${masp} (${sp?.title})`);
        console.log(`  Global Slton: ${sp?.TonKho?.slton}`);
        sp?.SanphamKho.forEach(sk => {
            console.log(`  - Warehouse ${sk.kho.name}: ${sk.soluong}`);
        });
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=inspect_distribution.js.map