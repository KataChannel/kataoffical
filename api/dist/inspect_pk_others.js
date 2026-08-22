"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const maphieus = ['PKNAA00009', 'PKNAA00010', 'PKNAA00011'];
    console.log(`Inspecting PhieuKhos: ${maphieus.join(', ')}`);
    const pks = await prisma.phieuKho.findMany({
        where: { maphieu: { in: maphieus } },
        include: {
            sanpham: {
                include: {
                    sanpham: true
                }
            }
        }
    });
    for (const pk of pks) {
        console.log(`--- ${pk.maphieu} (Products: ${pk.sanpham.length}) ---`);
        for (const sp of pk.sanpham) {
            console.log(`  - ${sp.sanpham.masp}: ${sp.sanpham.title} (${sp.soluong})`);
            if (sp.sanpham.masp === 'I100479') {
                console.log('  *** MATCH FOUND! ***');
            }
        }
    }
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=inspect_pk_others.js.map