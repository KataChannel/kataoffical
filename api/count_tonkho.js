const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient({
    datasources: {
        postgres: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
        }
    }
});
p.tonKho.count().then(c => console.log('Count:', c)).finally(() => p.$disconnect());
