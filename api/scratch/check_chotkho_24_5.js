const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('=== SEARCHING ALL CHOTKHO RECORDS CREATED TODAY (2026-05-24) ===');
    const todayStart = new Date('2026-05-24T00:00:00+07:00');
    
    const records = await prisma.chotkho.findMany({
        where: {
            createdAt: { gte: todayStart }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    console.log(`Found ${records.length} records.`);
    records.forEach(r => {
        console.log(`- ID: ${r.id}`);
        console.log(`  Title: ${r.title}`);
        console.log(`  CodeId: ${r.codeId}`);
        console.log(`  Ngaychot: ${r.ngaychot?.toLocaleString('vi-VN')}`);
        console.log(`  CreatedAt: ${r.createdAt?.toLocaleString('vi-VN')}`);
        console.log(`  Ghichu: ${r.ghichu}`);
        console.log(`  Active: ${r.isActive} | Locked: ${r.isLocked}`);
        console.log('----------------------------------------------------');
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
