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
        const khos = await prisma.kho.findMany();
        console.log('Warehouses (KHO):');
        console.log(JSON.stringify(khos, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
