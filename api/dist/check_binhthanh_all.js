"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const khId = "beee52e8-d6e0-4228-a46c-da8487e47ca4";
    const orders = await prisma.donhang.findMany({
        where: {
            khachhangId: khId
        },
        orderBy: {
            ngaygiao: 'desc'
        },
        take: 20
    });
    orders.forEach(o => {
        console.log(`${o.madonhang} | ${o.ngaygiao?.toISOString().split('T')[0]} | ${o.status}`);
    });
}
main()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_binhthanh_all.js.map