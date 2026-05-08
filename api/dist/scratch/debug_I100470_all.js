"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function debugAll(masp) {
    const sp = await prisma.sanpham.findUnique({ where: { masp } });
    if (!sp)
        return;
    const since = new Date('2026-05-04T13:22:54.669Z');
    const xuat = await prisma.donhangsanpham.findMany({
        where: { idSP: sp.id, donhang: { updatedAt: { gt: since } } },
        include: { donhang: true }
    });
    const nhap = await prisma.dathangsanpham.findMany({
        where: { idSP: sp.id, dathang: { updatedAt: { gt: since } } },
        include: { dathang: true }
    });
    const pk = await prisma.phieuKhoSanpham.findMany({
        where: { sanphamId: sp.id, phieuKho: { createdAt: { gt: since } } },
        include: { phieuKho: true }
    });
    console.log(`--- XUẤT (${xuat.length}) ---`);
    xuat.forEach(x => console.log(`${x.donhang.updatedAt?.toISOString() || 'N/A'} | ${x.donhang.madonhang} | ${x.slgiao} | ${x.slnhan} | ${x.donhang.status}`));
    console.log(`--- NHẬP (${nhap.length}) ---`);
    nhap.forEach(n => console.log(`${n.dathang.updatedAt?.toISOString() || 'N/A'} | ${n.dathang.madncc} | ${n.slnhan} | ${n.dathang.status}`));
    console.log(`--- PHIEUKHO (${pk.length}) ---`);
    pk.forEach(p => console.log(`${p.phieuKho.createdAt.toISOString()} | ${p.phieuKho.maphieu} | ${p.soluong} | ${p.phieuKho.type}`));
}
debugAll('I100470').finally(() => prisma.$disconnect());
//# sourceMappingURL=debug_I100470_all.js.map