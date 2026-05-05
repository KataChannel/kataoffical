"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const start = new Date('2025-12-31T17:00:00Z');
    const end = new Date('2026-01-14T17:00:00Z');
    const end15 = new Date('2026-01-15T16:59:59Z');
    const orders = await prisma.donhang.findMany({
        where: {
            ngaygiao: {
                gte: start,
                lte: end15
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
        total += calculateOrderTotal(o);
    });
    console.log('Total System Sum (01-15):', total);
}
main()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_total_01_15.js.map