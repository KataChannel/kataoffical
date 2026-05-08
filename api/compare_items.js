const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const pairs = [
        ['TG-AA14740', 'TG-AA14741'],
        ['TG-AA06936', 'TG-AA06940'],
        ['TG-AA04832', 'TG-AA04833'],
        ['TG-AA04024', 'TG-AA04026']
    ];

    try {
        for (const [code1, code2] of pairs) {
            const o1 = await prisma.donhang.findFirst({
                where: { madonhang: code1 },
                include: { sanpham: true }
            });
            const o2 = await prisma.donhang.findFirst({
                where: { madonhang: code2 },
                include: { sanpham: true }
            });

            console.log(`\nComparing ${code1} vs ${code2}:`);
            console.log(`- ${code1} items: ${o1.sanpham.length}`);
            console.log(`- ${code2} items: ${o2.sanpham.length}`);
            
            const items1 = o1.sanpham.map(s => `${s.sanphamId}:${s.soluong}`).sort().join(',');
            const items2 = o2.sanpham.map(s => `${s.sanphamId}:${s.soluong}`).sort().join(',');
            
            if (items1 === items2) {
                console.log("  => Items and quantities are IDENTICAL.");
            } else {
                console.log("  => Items/Quantities DIFFER.");
            }
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
