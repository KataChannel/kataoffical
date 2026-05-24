const { PrismaClient } = require('@prisma/client');

async function main() {
    const dbUrl = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public&connection_limit=5&pool_timeout=60&connect_timeout=20';
    process.env.DATABASE_URL = dbUrl;
    
    const prisma = new PrismaClient({
        datasources: {
            postgres: {
                url: dbUrl
            }
        }
    });

    try {
        console.log('--- PREVIEW DONHANG REVERT (Delivery Date >= 2026-05-24T17:00:00.000Z) ---');
        const donhangs = await prisma.donhang.findMany({
            where: {
                status: 'choxuly',
                ngaygiao: {
                    gte: new Date('2026-05-24T17:00:00.000Z') // Vietnam 25/05/2026 00:00
                }
            },
            include: {
                khachhang: true
            }
        });

        console.log(`Found ${donhangs.length} donhang records to revert:`);
        donhangs.forEach(d => {
            console.log(` - Mã ĐH: ${d.madonhang} | Khách hàng: ${d.khachhang?.name} | Ngaygiao: ${d.ngaygiao.toISOString()} | CreatedAt: ${d.createdAt.toISOString()}`);
        });

        console.log('\n--- PREVIEW DATHANG REVERT (Receipt Date >= 2026-05-24T17:00:00.000Z) ---');
        const dathangs = await prisma.dathang.findMany({
            where: {
                status: 'choxuly',
                ngaynhan: {
                    gte: new Date('2026-05-24T17:00:00.000Z') // Vietnam 25/05/2026 00:00
                }
            },
            include: {
                nhacungcap: true
            }
        });

        console.log(`Found ${dathangs.length} dathang records to revert:`);
        dathangs.forEach(d => {
            console.log(` - Mã DTH: ${d.madncc} | Nhà cung cấp: ${d.nhacungcap?.name} | Ngaynhan: ${d.ngaynhan.toISOString()} | CreatedAt: ${d.createdAt.toISOString()}`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
