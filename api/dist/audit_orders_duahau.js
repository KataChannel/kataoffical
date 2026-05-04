"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: {
        postgres: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
        }
    }
});
async function main() {
    const tk = await prisma.tonKho.findFirst({
        where: { sanpham: { masp: 'I100479' } }
    });
    console.log(`Current TonKho for I100479:`, JSON.stringify(tk, null, 2));
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
//# sourceMappingURL=audit_orders_duahau.js.map