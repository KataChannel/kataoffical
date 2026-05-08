"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function tracePhieuKho(masp, khoId) {
    const sp = await prisma.sanpham.findUnique({ where: { masp } });
    if (!sp)
        return;
    const pk = await prisma.phieuKhoSanpham.findMany({
        where: {
            sanphamId: sp.id,
            phieuKho: {
                OR: [
                    { khoId },
                    { tuKhoId: khoId },
                    { denKhoId: khoId }
                ],
                ngay: { gt: new Date('2026-05-04T20:22:54Z') }
            }
        },
        include: { phieuKho: true }
    });
    console.log(`Found ${pk.length} PhieuKho records`);
    pk.forEach(p => {
        console.log(`${p.phieuKho.ngay} | ${p.phieuKho.type} | ${p.soluong} | ${p.phieuKho.maphieu} | ${p.phieuKho.ghichu}`);
    });
}
const KHO_HCM_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
tracePhieuKho('I100470', KHO_HCM_ID).finally(() => prisma.$disconnect());
//# sourceMappingURL=trace_phieukho_I100470.js.map