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
        console.log('Searching for orders updated to "choxuly" around 2026-05-24T15:32:48.000Z...');
        
        // Let's search donhang
        const donhangs = await prisma.donhang.findMany({
            where: {
                status: 'choxuly',
                updatedAt: {
                    gte: new Date('2026-05-24T15:30:00.000Z'),
                    lte: new Date('2026-05-24T15:35:00.000Z')
                }
            },
            include: {
                khachhang: true
            }
        });

        console.log(`\n=== FOUND ${donhangs.length} DONHANG RECORDS ===`);
        donhangs.forEach(d => {
            console.log(`ID: ${d.id} | Mã ĐH: ${d.madonhang} | Khách hàng: ${d.khachhang?.name || 'N/A'} | Ngaynhan: ${d.ngaynhan?.toISOString()} | Ngaygiao: ${d.ngaygiao?.toISOString()} | CreatedAt: ${d.createdAt?.toISOString()} | UpdatedAt: ${d.updatedAt?.toISOString()}`);
        });

        // Let's search dathang
        const dathangs = await prisma.dathang.findMany({
            where: {
                status: 'choxuly',
                updatedAt: {
                    gte: new Date('2026-05-24T15:30:00.000Z'),
                    lte: new Date('2026-05-24T15:35:00.000Z')
                }
            },
            include: {
                nhacungcap: true
            }
        });

        console.log(`\n=== FOUND ${dathangs.length} DATHANG RECORDS ===`);
        dathangs.forEach(d => {
            console.log(`ID: ${d.id} | Mã DTH: ${d.madncc} | Nhà cung cấp: ${d.nhacungcap?.name || 'N/A'} | Ngaynhan: ${d.ngaynhan?.toISOString()} | Ngaygiao: ${d.ngaygiao?.toISOString()} | CreatedAt: ${d.createdAt?.toISOString()} | UpdatedAt: ${d.updatedAt?.toISOString()}`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
