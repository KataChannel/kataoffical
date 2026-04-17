"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const masp = 'I100027';
    const product = await prisma.sanpham.findUnique({
        where: { masp },
    });
    if (!product) {
        console.log('Product not found');
        return;
    }
    console.log(`--- All Orders for Product: ${product.title} (${masp}) ---`);
    const orders = await prisma.donhangsanpham.findMany({
        where: {
            idSP: product.id,
            donhang: {
                status: { in: ['dadat', 'dagiao'] },
            },
        },
        include: {
            donhang: {
                include: {
                    khachhang: true,
                },
            },
        },
        orderBy: {
            donhang: {
                ngaygiao: 'asc',
            },
        },
    });
    orders.forEach((o) => {
        const ngaygiaoStr = o.donhang.ngaygiao ? o.donhang.ngaygiao.toISOString().split('T')[0] : 'N/A';
        const khName = o.donhang.khachhang?.name || 'Khách vãng lai/Trống';
        console.log(`${ngaygiaoStr.padEnd(10)} | ${o.donhang.madonhang.padEnd(12)} | ${o.donhang.status.padEnd(10)} | Active: ${String(o.donhang.isActive).padEnd(5)} | ${khName.padEnd(30)} | SL: ${o.sldat}`);
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=check_all_orders.js.map