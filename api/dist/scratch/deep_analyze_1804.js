"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const masps = [
        'I100233', 'I100479', 'I100164', 'I100165', 'I100166',
        'I100003', 'I100002', 'I100113', 'I100207', 'I100004', 'I100256'
    ];
    console.log('--- DEEP ANALYZE 18/04/2026 ---');
    for (const masp of masps) {
        const sp = await prisma.sanpham.findUnique({
            where: { masp },
            include: {
                TonKho: true
            }
        });
        if (!sp) {
            console.log(`[${masp}] Not found`);
            continue;
        }
        const lastChot = await prisma.chotkhodetail.findFirst({
            where: { sanphamId: sp.id },
            orderBy: { ngaychot: 'desc' }
        });
        const dathangs = await prisma.dathangsanpham.findMany({
            where: {
                idSP: sp.id,
                dathang: { status: { in: ['dadat', 'dagiao'] } }
            }
        });
        const donhangs = await prisma.donhangsanpham.findMany({
            where: {
                idSP: sp.id,
                donhang: { status: { in: ['dadat', 'dagiao'] } }
            }
        });
        let totalPendingIn = 0;
        for (const d of dathangs) {
            totalPendingIn += Number(d.sldat) - Number(d.slnhan || 0);
        }
        let totalPendingOut = 0;
        for (const d of donhangs) {
            totalPendingOut += Number(d.sldat) - Number(d.slnhan || 0);
        }
        console.log(`[${masp}] ${sp.title}`);
        console.log(`  - DB Global Stock: ${sp.TonKho ? Number(sp.TonKho.slton) : 0}`);
        console.log(`  - Last Close: ${lastChot ? lastChot.ngaychot.toISOString() : 'N/A'} (Qty: ${lastChot ? Number(lastChot.sltonthucte) : 0})`);
        console.log(`  - Pending Inbound: ${totalPendingIn}`);
        console.log(`  - Pending Outbound: ${totalPendingOut}`);
        console.log('------------------------------');
    }
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=deep_analyze_1804.js.map