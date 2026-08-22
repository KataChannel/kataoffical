"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const dh = await prisma.donhang.findFirst({ select: { madonhang: true } });
    const dt = await prisma.dathang.findFirst({ select: { madncc: true } });
    console.log("Donhang prefix:", dh?.madonhang);
    console.log("Dathang prefix:", dt?.madncc);
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=check-codes.js.map