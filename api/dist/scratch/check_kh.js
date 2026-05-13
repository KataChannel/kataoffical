"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const khachhang = await prisma.khachhang.findFirst({
        where: {
            OR: [
                { email: '0977272967' },
                { sdt: '0977272967' }
            ]
        }
    });
    console.log(JSON.stringify(khachhang, null, 2));
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_kh.js.map