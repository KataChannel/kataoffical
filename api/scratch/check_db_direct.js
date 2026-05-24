const { PrismaClient } = require('@prisma/client');

async function main() {
    const dbUrl = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public&connection_limit=5&pool_timeout=60&connect_timeout=20';
    process.env.DATABASE_URL = dbUrl;
    
    console.log('Connecting to database rausachfinal...');
    const prisma = new PrismaClient({
        datasources: {
            postgres: {
                url: dbUrl
            }
        }
    });

    try {
        const sp = await prisma.sanpham.findUnique({
            where: { masp: 'I100480' },
            include: {
                SanphamKho: true,
                TonKho: true
            }
        });

        console.log('Product details:');
        console.log(JSON.stringify(sp, null, 2));

        console.log('\nLast 5 chotkho master records:');
        const chots = await prisma.chotkho.findMany({
            orderBy: { ngaychot: 'desc' },
            take: 5
        });
        console.log(JSON.stringify(chots, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
