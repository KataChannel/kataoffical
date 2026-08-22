"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Searching for Chotkhodetail with value 649 or recent Chotkho...');
    const recentChotkho = await prisma.chotkho.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
            details: {
                where: {
                    OR: [
                        { sltonthucte: 649 },
                        { sanphamId: 'b69aaeb6-f337-4df8-a78a-fa0c84f6faa7' }
                    ]
                },
                include: {
                    sanpham: true
                }
            }
        }
    });
    console.log('Recent Chotkho records:', JSON.stringify(recentChotkho, null, 2));
    const specificDetail = await prisma.chotkhodetail.findMany({
        where: {
            sltonthucte: 649
        },
        include: {
            chotkho: true,
            sanpham: true
        }
    });
    console.log('Details with value 649:', JSON.stringify(specificDetail, null, 2));
    const allDetailsForProduct = await prisma.chotkhodetail.findMany({
        where: {
            sanphamId: 'b69aaeb6-f337-4df8-a78a-fa0c84f6faa7'
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: {
            chotkho: true
        }
    });
    console.log('All Chotkho Details for Dưa hấu:', JSON.stringify(allDetailsForProduct, null, 2));
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=debug_649.js.map