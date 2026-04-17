"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const masp = 'I100027';
    const now = new Date();
    const targetDateStr = '2026-04-17';
    const startOfDay = new Date('2026-04-17T00:00:00.000Z');
    const endOfDay = new Date('2026-04-17T23:59:59.999Z');
    const product = await prisma.sanpham.findUnique({
        where: { masp },
        select: { id: true, title: true }
    });
    if (!product) {
        console.log('Product not found');
        return;
    }
    console.log(`Analyzing: ${product.title} (${product.id})`);
    const qualifyingOrders = await prisma.donhangsanpham.findMany({
        where: {
            idSP: product.id,
            donhang: {
                ngaygiao: { lte: endOfDay },
                status: 'dadat'
            }
        },
        include: {
            donhang: {
                select: {
                    madonhang: true,
                    ngaygiao: true,
                    status: true,
                    isActive: true,
                    khachhang: { select: { name: true } }
                }
            }
        }
    });
    let totalDadat = 0;
    console.log('\n--- Orders contributing to TỔNG ĐẶT (KHÁCH) ---');
    qualifyingOrders.forEach(o => {
        const sldat = Number(o.sldat);
        totalDadat += sldat;
        console.log(`${o.donhang.ngaygiao?.toISOString().split('T')[0]} | ${o.donhang.madonhang} | ${o.donhang.status} | Active: ${o.donhang.isActive} | ${o.donhang.khachhang?.name} | SL: ${sldat}`);
    });
    console.log(`TOTAL CALCULATED: ${totalDadat}`);
    console.log('\n--- Orders that would appear in the Detailed View (Today only) ---');
    let totalDetailed = 0;
    qualifyingOrders.filter(o => {
        const d = o.donhang.ngaygiao;
        return d && d >= startOfDay && d <= endOfDay;
    }).forEach(o => {
        const sldat = Number(o.sldat);
        totalDetailed += sldat;
        console.log(`${o.donhang.ngaygiao?.toISOString().split('T')[0]} | ${o.donhang.madonhang} | SL: ${sldat}`);
    });
    console.log(`TOTAL DETAILED: ${totalDetailed}`);
    const dagiaoOrders = await prisma.donhangsanpham.findMany({
        where: {
            idSP: product.id,
            donhang: {
                ngaygiao: { lte: endOfDay },
                status: 'dagiao'
            }
        },
        include: { donhang: true }
    });
    if (dagiaoOrders.length > 0) {
        let totalDagiao = 0;
        console.log('\n--- Partially Delivered Orders (dagiao) ---');
        dagiaoOrders.forEach(o => {
            totalDagiao += Number(o.sldat);
            console.log(`${o.donhang.madonhang} | SL: ${o.sldat}`);
        });
        console.log(`TOTAL DAGIAO: ${totalDagiao}`);
    }
}
main().finally(() => prisma.$disconnect());
//# sourceMappingURL=check_discrepancy.js.map