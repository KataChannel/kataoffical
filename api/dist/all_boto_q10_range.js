"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const khId = "6ac22c7f-f50a-4ebb-b954-d062c6d8c281";
    const start = new Date('2026-01-15T17:00:00Z');
    const end = new Date('2026-01-25T16:59:59Z');
    const orders = await prisma.donhang.findMany({
        where: {
            khachhangId: khId,
            ngaygiao: {
                gte: start,
                lte: end
            }
        },
        orderBy: {
            ngaygiao: 'asc'
        }
    });
    orders.forEach(o => {
        console.log(`${o.madonhang} | ${o.ngaygiao?.toISOString()} | status: ${o.status} | tongtien: ${o.tongtien}`);
    });
}
main()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=all_boto_q10_range.js.map