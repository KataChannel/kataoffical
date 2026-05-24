const Redis = require('ioredis');

async function main() {
    console.log('Connecting to Redis at 116.118.49.243:56379...');
    const client = new Redis({
        host: '116.118.49.243',
        port: 56379,
        db: 0,
        maxRetriesPerRequest: 1
    });

    client.on('error', (err) => {
        console.error('Redis Error:', err.message);
    });

    try {
        console.log('Getting all keys...');
        const keys = await client.keys('*');
        console.log(`Total keys found: ${keys.length}`);

        // Let's filter keys that might contain inventory or our product I100480
        console.log('\nScanning for interesting keys...');
        const tonkhoKeys = keys.filter(k => k.toLowerCase().includes('tonkho') || k.toLowerCase().includes('xuatnhapton') || k.toLowerCase().includes('sanpham'));
        const productKeys = [];
        
        console.log(`Found ${tonkhoKeys.length} keys containing "tonkho"/"xuatnhapton"/"sanpham":`);
        for (const key of tonkhoKeys.slice(0, 20)) {
            console.log(` - ${key}`);
        }
        if (tonkhoKeys.length > 20) {
            console.log(` ... and ${tonkhoKeys.length - 20} more keys`);
        }

        // Now search all keys to see if any value contains I100480
        console.log('\nSearching for key contents containing product "I100480" or "Dưa hấu"...');
        let matchCount = 0;
        for (const key of keys) {
            const val = await client.get(key);
            if (val && (val.includes('I100480') || val.includes('Dưa hấu') || val.includes('Dua hau'))) {
                matchCount++;
                console.log(`Match #${matchCount}: Key: "${key}"`);
                console.log(`Value snippet: ${val.substring(0, 300)}...`);
            }
        }
        console.log(`Total matching keys: ${matchCount}`);

    } catch (e) {
        console.error('Error connecting/querying Redis:', e);
    } finally {
        await client.disconnect();
    }
}

main();
