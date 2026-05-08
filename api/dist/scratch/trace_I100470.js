"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function traceProduct(masp, khoId) {
    const sp = await prisma.sanpham.findUnique({ where: { masp } });
    if (!sp) {
        console.log(`Product ${masp} not found`);
        return;
    }
    console.log(`Tracing product: ${sp.title} (${sp.masp})`);
    const latestChot = await prisma.chotkho.findFirst({
        where: { khoId, isActive: true },
        orderBy: { ngaychot: 'desc' }
    });
    if (!latestChot) {
        console.log('No closing found');
        return;
    }
    const prevChot = await prisma.chotkhodetail.findFirst({
        where: {
            sanphamId: sp.id,
            chotkho: {
                khoId,
                isActive: true,
                ngaychot: { lt: latestChot.ngaychot }
            }
        },
        orderBy: { ngaychot: 'desc' },
        include: { chotkho: true }
    });
    const startTime = prevChot ? prevChot.ngaychot : new Date(0);
    const initialQty = prevChot ? Number(prevChot.sltonthucte) : 0;
    console.log(`Start Time: ${startTime}`);
    console.log(`Initial Qty (from prev closing): ${initialQty}`);
    const xuat = await prisma.donhangsanpham.findMany({
        where: {
            idSP: sp.id,
            donhang: {
                khoId,
                status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                updatedAt: { gt: startTime, lte: latestChot.ngaychot }
            }
        },
        include: { donhang: true }
    });
    const nhap = await prisma.dathangsanpham.findMany({
        where: {
            idSP: sp.id,
            dathang: {
                khoId,
                status: 'danhan',
                updatedAt: { gt: startTime, lte: latestChot.ngaychot }
            }
        },
        include: { dathang: true }
    });
    const events = [
        ...xuat.map(x => ({
            type: 'XUẤT',
            qty: Number(x.slnhan || x.slgiao || x.sldat),
            time: x.donhang.updatedAt || new Date(0),
            code: x.donhang.madonhang,
            note: `Order ${x.donhang.madonhang} (${x.donhang.status})`
        })),
        ...nhap.map(n => ({
            type: 'NHẬP',
            qty: Number(n.slnhan || n.slgiao),
            time: n.dathang.updatedAt || new Date(0),
            code: n.dathang.madncc,
            note: `Import ${n.dathang.madncc} (${n.dathang.status})`
        }))
    ].sort((a, b) => a.time.getTime() - b.time.getTime());
    let current = initialQty;
    console.log('--- Timeline ---');
    events.forEach(e => {
        const prev = current;
        if (e.type === 'XUẤT')
            current -= e.qty;
        else
            current += e.qty;
        console.log(`${e.time.toISOString()} | ${e.type} | ${e.qty.toFixed(2).padStart(10)} | Balance: ${current.toFixed(2).padStart(10)} | ${e.note}`);
    });
    console.log('--- Final ---');
    console.log(`Calculated System Stock: ${current}`);
}
const KHO_HCM_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
traceProduct('I100470', KHO_HCM_ID).catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=trace_I100470.js.map