"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const dh = await prisma.dathang.findFirst({
        where: { madncc: 'TGNCC-VQ00009' },
        include: {
            sanpham: {
                where: { idSP: '4d76ddb7-8dff-426c-a137-521db73a4419' }
            }
        }
    });
    console.log('Order:', JSON.stringify(dh, null, 2));
    if (dh && dh.sanpham.length > 0) {
        const qty = Number(dh.sanpham[0].slnhan) || Number(dh.sanpham[0].sldat) || 0;
        const khoId = dh.khoId;
        if (qty > 0 && khoId) {
            console.log(`Syncing ${qty} units to warehouse ${khoId}`);
            await prisma.sanphamKho.upsert({
                where: {
                    sanphamId_khoId: {
                        sanphamId: '4d76ddb7-8dff-426c-a137-521db73a4419',
                        khoId: khoId
                    }
                },
                update: { soluong: { increment: qty } },
                create: {
                    sanphamId: '4d76ddb7-8dff-426c-a137-521db73a4419',
                    khoId: khoId,
                    soluong: qty
                }
            });
            console.log('Sync complete.');
        }
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=sync_order_stock.js.map