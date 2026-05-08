"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const sp = await prisma.sanpham.findUnique({
        where: { masp: "I100270" },
        include: {
            TonKho: true,
            SanphamKho: {
                include: {
                    kho: true
                }
            }
        }
    });
    console.log(JSON.stringify(sp, null, 2));
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_inventory_details.js.map