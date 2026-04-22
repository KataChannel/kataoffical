"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const masps = ['I100260', 'I100738', 'I100256', 'I100094', 'I100263', 'I100785', 'I100542', 'I100007'];
    console.log('--- CHECKING NEGATIVE STOCK ---');
    for (const masp of masps) {
        const sp = await prisma.sanpham.findUnique({
            where: { masp },
            include: {
                TonKho: true,
                SanphamKho: {
                    include: { kho: true }
                },
                chotkhodetail: {
                    orderBy: { ngaychot: 'desc' },
                    take: 1,
                    include: { chotkho: true }
                }
            }
        });
        if (!sp) {
            console.log(`Product ${masp} not found`);
            continue;
        }
        console.log(`\nProduct: ${sp.title} (${sp.masp})`);
        console.log(`TonKho SL Ton: ${sp.TonKho?.slton}`);
        console.log(`TonKho SL Ton TT: ${sp.TonKho?.sltontt}`);
        console.log('SanphamKho:');
        sp.SanphamKho.forEach(sk => {
            console.log(`  - Kho: ${sk.kho.name} (${sk.kho.makho}): ${sk.soluong}`);
        });
        if (sp.chotkhodetail.length > 0) {
            const lastChot = sp.chotkhodetail[0];
            console.log(`Last ChotKho: ${lastChot.chotkho?.title} at ${lastChot.ngaychot}`);
            console.log(`  - SL He thong: ${lastChot.sltonhethong}`);
            console.log(`  - SL Thuc te: ${lastChot.sltonthucte}`);
            console.log(`  - Chenh lech: ${lastChot.chenhlech}`);
        }
        else {
            console.log('Last ChotKho: NEVER');
        }
    }
}
main()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_negative_stock.js.map