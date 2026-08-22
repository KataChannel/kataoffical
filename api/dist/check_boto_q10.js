"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const kh = await prisma.khachhang.findFirst({
        where: {
            name: {
                contains: 'BÒ TƠ Q10',
                mode: 'insensitive'
            }
        }
    });
    if (kh) {
        console.log('Customer Found:', JSON.stringify(kh, null, 2));
        const start0 = new Date('2025-12-31T00:00:00Z');
        const end0 = new Date('2026-02-01T23:59:59Z');
        const allOrders = await prisma.donhang.findMany({
            where: {
                khachhangId: kh.id,
                ngaygiao: {
                    gte: start0,
                    lte: end0
                },
                status: { in: ['danhan', 'hoanthanh'] }
            },
            include: {
                sanpham: true
            },
            orderBy: {
                ngaygiao: 'asc'
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
        console.log(`All Orders Jan 2026:`);
        allOrders.forEach(o => {
            const gmt7Date = new Date(o.ngaygiao.getTime() + 7 * 60 * 60 * 1000);
            const day = gmt7Date.getUTCDate();
            const month = gmt7Date.getUTCMonth() + 1;
            const year = gmt7Date.getUTCFullYear();
            const total = calculateOrderTotal(o);
            console.log(`[${day}/${month}/${year}] ${o.madonhang}: ${total.toLocaleString()} (Raw: ${o.ngaygiao.toISOString()})`);
        });
    }
    else {
        console.log('Customer BÒ TƠ Q10 not found');
    }
}
main()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_boto_q10.js.map