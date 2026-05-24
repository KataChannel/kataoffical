const { PrismaClient } = require('@prisma/client');
const Redis = require('ioredis');

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
        console.log('Starting transaction to revert 25/05 orders/purchases...');

        let dhRevertedCount = 0;
        let dthRevertedCount = 0;

        await prisma.$transaction(async (tx) => {
            // 1. Revert donhang
            const dhUpdate = await tx.donhang.updateMany({
                where: {
                    status: 'choxuly',
                    ngaygiao: {
                        gte: new Date('2026-05-24T17:00:00.000Z') // Vietnam 25/05/2026 00:00
                    }
                },
                data: {
                    status: 'dadat',
                    updatedAt: new Date()
                }
            });
            dhRevertedCount = dhUpdate.count;

            // 2. Revert dathang
            const dthUpdate = await tx.dathang.updateMany({
                where: {
                    status: 'choxuly',
                    ngaynhan: {
                        gte: new Date('2026-05-24T17:00:00.000Z') // Vietnam 25/05/2026 00:00
                    }
                },
                data: {
                    status: 'dadat',
                    updatedAt: new Date()
                }
            });
            dthRevertedCount = dthUpdate.count;
        });

        console.log(`\nTransaction SUCCESS!`);
        console.log(`- Reverted ${dhRevertedCount} Donhang records to 'dadat'.`);
        console.log(`- Reverted ${dthRevertedCount} Dathang records to 'dadat'.`);

        // 3. Connect to Redis and flushall to ensure cache is cleared
        console.log('\nConnecting to Redis to clear cache...');
        const redisClient = new Redis({
            host: '116.118.49.243',
            port: 56379,
            db: 0,
            maxRetriesPerRequest: 1
        });

        redisClient.on('error', (err) => {
            console.error('Redis Error:', err.message);
        });

        try {
            const flushRes = await redisClient.flushall();
            console.log('Redis flush result:', flushRes);
        } catch (e) {
            console.error('Redis flush failed:', e.message);
        } finally {
            await redisClient.disconnect();
        }

    } catch (e) {
        console.error('Transaction FAILED:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
