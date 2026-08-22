"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function checkWarehouse() {
    console.log('--- ĐÁNH GIÁ HOẠT ĐỘNG KHO ---');
    const lastChotKho = await prisma.chotkho.findFirst({
        orderBy: { ngaychot: 'desc' },
        include: {
            details: true,
        },
    });
    if (!lastChotKho) {
        console.log('Chưa có lần chốt kho nào.');
        return;
    }
    const startTime = lastChotKho.ngaychot;
    console.log(`Lần chốt kho gần nhất: ${lastChotKho.codeId || lastChotKho.id}`);
    console.log(`Thời gian chốt: ${startTime.toLocaleString()}`);
    console.log(`Tiêu đề: ${lastChotKho.title}`);
    console.log(`Số lượng sản phẩm trong lần chốt: ${lastChotKho.details.length}`);
    const now = new Date();
    const orders = await prisma.donhang.findMany({
        where: {
            updatedAt: { gte: startTime },
            status: { in: ['dagiao', 'hoanthanh'] },
        },
        include: {
            sanpham: true,
        },
    });
    const imports = await prisma.dathang.findMany({
        where: {
            updatedAt: { gte: startTime },
            status: { in: ['dagiao', 'danhan'] },
        },
        include: {
            sanpham: true,
        },
    });
    const phieuKhos = await prisma.phieuKho.findMany({
        where: {
            createdAt: { gte: startTime },
        },
        include: {
            sanpham: true,
        },
    });
    console.log('\n--- THỐNG KÊ BIẾN ĐỘNG ---');
    console.log(`Số đơn hàng đã giao: ${orders.length}`);
    console.log(`Số đơn nhập hàng: ${imports.length}`);
    console.log(`Số phiếu kho phát sinh: ${phieuKhos.length}`);
    const affectedSpIds = new Set();
    orders.forEach(o => o.sanpham.forEach(s => affectedSpIds.add(s.idSP)));
    imports.forEach(i => i.sanpham.forEach(s => affectedSpIds.add(s.idSP)));
    phieuKhos.forEach(p => p.sanpham.forEach(s => affectedSpIds.add(s.sanphamId)));
    console.log(`Tổng số sản phẩm có biến động: ${affectedSpIds.size}`);
    const ordersMissingPx = [];
    for (const order of orders) {
        const px = phieuKhos.find(p => p.madonhang === order.madonhang);
        if (!px) {
            ordersMissingPx.push(order.madonhang);
        }
    }
    if (ordersMissingPx.length > 0) {
        console.log(`⚠️ CẢNH BÁO: Có ${ordersMissingPx.length} đơn hàng đã giao nhưng THIẾU PHIẾU XUẤT KHO.`);
        console.log(`Danh sách mã đơn: ${ordersMissingPx.slice(0, 10).join(', ')}${ordersMissingPx.length > 10 ? '...' : ''}`);
    }
    else {
        console.log('✅ Tất cả đơn hàng đã giao đều có phiếu xuất kho tương ứng.');
    }
    const amTon = await prisma.tonKho.findMany({
        where: {
            slton: { lt: 0 },
        },
        include: {
            sanpham: true,
        },
    });
    if (amTon.length > 0) {
        console.log(`\n❌ PHÁT HIỆN TỒN KHO ÂM (${amTon.length} sản phẩm):`);
        amTon.slice(0, 10).forEach(t => {
            console.log(`- ${t.sanpham.title} (${t.sanpham.masp}): ${t.slton}`);
        });
    }
    else {
        console.log('\n✅ Không có sản phẩm nào bị tồn kho âm.');
    }
    const treoTon = await prisma.tonKho.findMany({
        where: {
            slchogiao: { gt: 0 },
        },
        include: {
            sanpham: true,
        },
        orderBy: { slchogiao: 'desc' },
        take: 5,
    });
    console.log('\n--- TOP SẢN PHẨM ĐANG TREO (DỰ PHÒNG) ---');
    treoTon.forEach(t => {
        console.log(`- ${t.sanpham.title}: ${t.slchogiao} (Tồn thực tế: ${t.slton})`);
    });
}
checkWarehouse()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
//# sourceMappingURL=check-warehouse-status.js.map