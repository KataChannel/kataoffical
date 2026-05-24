const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 21:56:01 local time is 14:56:01 UTC
    const startTime = new Date('2026-05-24T14:55:50.000Z');
    const endTime = new Date('2026-05-24T14:56:10.000Z');

    console.log(`=== SEARCHING DATABASE RECORDS UPDATED BETWEEN ${startTime.toISOString()} AND ${endTime.toISOString()} ===`);

    // Let's query several tables we care about
    
    // 1. SanphamKho
    const sk = await prisma.sanphamKho.findMany({
        where: {
            updatedAt: { gte: startTime, lte: endTime }
        },
        include: {
            sanpham: true
        }
    });
    console.log(`\n1. SanphamKho updates found: ${sk.length}`);
    sk.forEach(item => {
        console.log(`- Product: ${item.sanpham.masp} (${item.sanpham.title}) | Kho: ${item.khoId} | Số lượng: ${item.soluong} | UpdatedAt: ${item.updatedAt.toISOString()}`);
    });

    // 2. TonKho
    const tk = await prisma.tonKho.findMany({
        where: {
            updatedAt: { gte: startTime, lte: endTime }
        },
        include: {
            sanpham: true
        }
    });
    console.log(`\n2. TonKho updates found: ${tk.length}`);
    tk.forEach(item => {
        console.log(`- Product: ${item.sanpham.masp} (${item.sanpham.title}) | slton: ${item.slton} | sltontt: ${item.sltontt} | UpdatedAt: ${item.updatedAt.toISOString()}`);
    });

    // 3. Chotkho
    const ck = await prisma.chotkho.findMany({
        where: {
            createdAt: { gte: startTime, lte: endTime }
        }
    });
    console.log(`\n3. Chotkho creations found: ${ck.length}`);
    ck.forEach(item => {
        console.log(`- ID: ${item.id} | Title: ${item.title} | CodeId: ${item.codeId} | CreatedAt: ${item.createdAt.toISOString()}`);
    });

    // 4. Chotkhodetail
    const ckd = await prisma.chotkhodetail.findMany({
        where: {
            createdAt: { gte: startTime, lte: endTime }
        },
        include: {
            sanpham: true
        }
    });
    console.log(`\n4. Chotkhodetail creations found: ${ckd.length}`);
    ckd.forEach(item => {
        console.log(`- Product: ${item.sanpham.masp} | sltonhethong: ${item.sltonhethong} | sltonthucte: ${item.sltonthucte} | CreatedAt: ${item.createdAt.toISOString()}`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
