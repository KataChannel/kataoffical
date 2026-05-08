"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const latestChot = await prisma.chotkho.findFirst({
        orderBy: { ngaychot: 'desc' },
        include: {
            details: {
                include: { sanpham: true }
            },
            kho: true
        }
    });
    if (!latestChot) {
        console.log('No closing records found.');
        return;
    }
    console.log(`Latest Closing: ${latestChot.title} (${latestChot.ngaychot})`);
    console.log(`Warehouse: ${latestChot.kho?.name}`);
    const negativeDetails = latestChot.details.filter(d => Number(d.sltonthucte) < 0 || Number(d.sltonhethong) < 0);
    console.log(`Total negative details: ${negativeDetails.length}`);
    if (negativeDetails.length > 0) {
        console.log('Negative Details:');
        negativeDetails.forEach(d => {
            console.log(`- Product: ${d.sanpham?.masp} (${d.sanpham?.title})`);
            console.log(`  System Stock: ${d.sltonhethong}`);
            console.log(`  Physical Stock: ${d.sltonthucte}`);
            console.log(`  Diff: ${d.chenhlech}`);
        });
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=check_latest_chotkho.js.map