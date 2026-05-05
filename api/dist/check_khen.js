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
        const start = new Date('2026-01-16T00:00:00Z');
        const end = new Date('2026-01-25T23:59:59Z');
        const orders = await prisma.donhang.findMany({
            where: {
                khachhangId: kh.id,
                ngaygiao: {
                    gte: start,
                    lte: end
                },
                status: { in: ['danhan', 'hoanthanh'] }
            },
            include: {
                sanpham: true
            }
        });
        function calculateOrderTotal(donhang) {
            let tong = 0;
            for (const sp of donhang.sanpham) {
                const slnhan = Number(sp.slnhan) || 0;
                if (slnhan === 0)
                    continue;
                const giaban = Number(sp.giaban) || 0;
                tong += slnhan * giaban;
            }
            const vatRate = donhang.isshowvat ? (Number(donhang.vat) || 0) : 0;
            return tong * (1 + vatRate);
        }
        let total = 0;
        orders.forEach(o => {
            const t = calculateOrderTotal(o);
            total += t;
            console.log(`${o.madonhang}: ${t}`);
        });
        console.log('Total Recalculated:', total);
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
//# sourceMappingURL=check_khen.js.map