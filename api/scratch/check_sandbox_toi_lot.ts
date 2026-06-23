import { PrismaClient } from '@prisma/client';

const SANDBOX_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public';

async function main() {
    const prisma = new PrismaClient({ datasources: { postgres: { url: SANDBOX_URL } } });

    try {
        const sandboxChot = await prisma.chotkho.findFirst({
            where: {
                ngaychot: {
                    gte: new Date('2026-06-11T00:00:00Z'),
                    lte: new Date('2026-06-11T23:59:59Z')
                }
            },
            orderBy: { createdAt: 'desc' },
            include: { details: { include: { sanpham: true } } }
        });

        if (!sandboxChot) {
            console.log('No sandbox chotkho found!');
            return;
        }

        console.log(`Sandbox Session: ${sandboxChot.id} CreatedAt: ${sandboxChot.createdAt}`);
        
        const targets = ['Tỏi lột', 'Tần ô', 'Bó xôi (Nhà Lồng)', 'Hẹ lá'];
        
        sandboxChot.details.forEach(d => {
            const title = d.sanpham?.title || '';
            if (targets.some(t => title.includes(t))) {
                console.log(`- ${title}: System: ${d.sltonhethong}, Actual: ${d.sltonthucte}, Note: ${d.ghichu}`);
            }
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
