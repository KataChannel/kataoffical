"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const kh = await prisma.khachhang.findFirst({
        where: {
            OR: [
                { makh: { contains: 'KS00057' } },
                { name: { contains: '5G BIA' } }
            ]
        }
    });
    console.log('Khách hàng:', kh);
    if (kh) {
        const donhangs = await prisma.donhang.findMany({
            where: { khachhangId: kh.id },
            orderBy: { createdAt: 'desc' },
            take: 5,
            select: {
                id: true,
                madonhang: true,
                status: true,
                createdAt: true,
                ngaygiao: true
            }
        });
        console.log('Đơn hàng:', donhangs);
    }
    const totalDonhang = await prisma.donhang.count();
    console.log('Tổng số đơn hàng:', totalDonhang);
    const totalKhachhang = await prisma.khachhang.count();
    console.log('Tổng số khách hàng:', totalKhachhang);
}
main().catch(console.error).finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check-data.js.map