const Redis = require('ioredis');

async function main() {
    const client = new Redis({
        host: '116.118.49.243',
        port: 56379,
        db: 0,
        maxRetriesPerRequest: 1
    });

    try {
        const keys = await client.keys('*');
        console.log(`Total keys found: ${keys.length}`);
        for (const key of keys) {
            console.log(`\nKEY: ${key}`);
            const val = await client.get(key);
            console.log(`VALUE LENGTH: ${val ? val.length : 0}`);
            if (val) {
                console.log(`VALUE START: ${val.substring(0, 500)}`);
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.disconnect();
    }
}

main();
