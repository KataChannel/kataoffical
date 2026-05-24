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
        console.log('Flushing all Redis databases (FLUSHALL)...');
        const res = await client.flushall();
        console.log('Flush result:', res);
        
        console.log('Retrieving remaining keys...');
        const keys = await client.keys('*');
        console.log(`Remaining keys: ${keys.length}`);
    } catch (e) {
        console.error('Error flushing Redis:', e);
    } finally {
        await client.disconnect();
    }
}

main();
