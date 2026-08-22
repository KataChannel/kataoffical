"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log(`🔎 Finding the earliest PhieuKho with isChotkho=true...`);
    const first = await prisma.phieuKho.findFirst({
        where: { isChotkho: true },
        orderBy: { createdAt: 'asc' }
    });
    if (first) {
        console.log(`First Chotkho found at: ${first.createdAt.toISOString()}`);
        console.log(`Title: ${first.title}`);
        console.log(`Ghi chu: ${first.ghichu}`);
    }
    else {
        console.log(`No PhieuKho with isChotkho=true found in the entire database.`);
    }
    const latestPx = await prisma.phieuKho.findMany({
        where: {
            title: { contains: 'CHỐT KHO', mode: 'insensitive' }
        },
        orderBy: { createdAt: 'asc' },
        take: 1
    });
    if (latestPx.length > 0) {
        console.log(`First PhieuKho with 'CHỐT KHO' in title found at: ${latestPx[0].createdAt.toISOString()}`);
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
//# sourceMappingURL=find_earliest_chotkho.js.map