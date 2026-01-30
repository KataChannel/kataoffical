"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const kh = await prisma.khachhang.findFirst({
        where: {
            name: {
                contains: 'KHÈN',
                mode: 'insensitive'
            }
        }
    });
    if (kh) {
        console.log('Customer Found:', kh.name);
        const orders = await prisma.donhang.findMany({
            where: {
                khachhangId: kh.id
            },
            include: {
                sanpham: true
            },
            orderBy: {
                ngaygiao: 'asc'
            }
        });
        orders.forEach(o => {
            console.log(`${o.madonhang} | ${o.ngaygiao?.toISOString()} | status: ${o.status}`);
        });
    }
    else {
        console.log('Customer KHÈN not found');
    }
}
main()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=all_khen.js.map