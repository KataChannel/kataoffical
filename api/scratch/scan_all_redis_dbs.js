const Redis = require('ioredis');

async function main() {
    for (let db = 0; db < 16; db++) {
        const client = new Redis({
            host: '116.118.49.243',
            port: 56379,
            db: db,
            maxRetriesPerRequest: 1
        });

        client.on('error', () => {}); // ignore errors for inactive DBs

        try {
            const keys = await client.keys('*');
            if (keys.length > 0) {
                console.log(`\n=== DATABASE ${db} has ${keys.length} keys ===`);
                for (const key of keys.slice(0, 10)) {
                    console.log(` - Key: ${key}`);
                    const val = await client.get(key);
                    console.log(`   Value Snippet: ${val ? val.substring(0, 150) : null}`);
                }
                if (keys.length > 10) {
                    console.log(`   ... and ${keys.length - 10} more keys`);
                }
            }
        } catch (e) {
            // inactive or error
        } finally {
            await client.disconnect();
        }
    }
}

main();
