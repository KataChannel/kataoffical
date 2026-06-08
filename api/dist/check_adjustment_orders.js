"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
    const prisma = new client_1.PrismaClient({ datasourceUrl: prodUrl });
    try {
        console.log('🔍 Searching for "điều chỉnh" in Donhang...');
        const donhangs = await prisma.donhang.findMany({
            where: {
                OR: [
                    { title: { contains: 'điều chỉnh', mode: 'insensitive' } },
                    { ghichu: { contains: 'điều chỉnh', mode: 'insensitive' } },
                    { title: { contains: 'dieuchinh', mode: 'insensitive' } },
                    { ghichu: { contains: 'dieuchinh', mode: 'insensitive' } },
                    { type: { contains: 'dieuchinh', mode: 'insensitive' } },
                    { type: { contains: 'điều chỉnh', mode: 'insensitive' } }
                ]
            },
            take: 10
        });
        console.log(`Found ${donhangs.length} adjusting Donhangs:`);
        donhangs.forEach(d => {
            console.log(`- ID: ${d.id} | Code: ${d.madonhang} | Type: ${d.type} | Title: ${d.title} | Ghi chú: ${d.ghichu}`);
        });
        console.log('\n🔍 Searching for "điều chỉnh" in Dathang...');
        const dathangs = await prisma.dathang.findMany({
            where: {
                OR: [
                    { title: { contains: 'điều chỉnh', mode: 'insensitive' } },
                    { ghichu: { contains: 'điều chỉnh', mode: 'insensitive' } },
                    { title: { contains: 'dieuchinh', mode: 'insensitive' } },
                    { ghichu: { contains: 'dieuchinh', mode: 'insensitive' } },
                    { type: { contains: 'dieuchinh', mode: 'insensitive' } },
                    { type: { contains: 'điều chỉnh', mode: 'insensitive' } }
                ]
            },
            take: 10
        });
        console.log(`Found ${dathangs.length} adjusting Dathangs:`);
        dathangs.forEach(d => {
            console.log(`- ID: ${d.id} | Code: ${d.madncc} | Type: ${d.type} | Title: ${d.title} | Ghi chú: ${d.ghichu}`);
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check_adjustment_orders.js.map