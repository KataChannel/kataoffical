"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const kho = await prisma.kho.findUnique({
        where: { id: '3344758e-c0bc-4562-9390-d58fc5717d03' }
    });
    console.log('Warehouse:', kho);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_kho.js.map