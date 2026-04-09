const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP = 'I100002';

async function main() {
    const product = await prisma.sanpham.findUnique({
        where: { masp: MASP }
    });

    const stocktakes = await prisma.chotkhodetail.findMany({
        where: { sanphamId: product.id },
        include: { chotkho: true },
        orderBy: { ngaychot: 'desc' }
    });

    console.table(stocktakes.map(st => ({
        time: st.ngaychot.toLocaleString('vi-VN'),
        sys: st.sltonhethong,
        actual: st.sltonthucte,
        diff: st.chenhlech,
        code: st.chotkho?.codeId
    })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
