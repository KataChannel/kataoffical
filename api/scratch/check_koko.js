const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkKoko() {
    const order = await prisma.donhang.findFirst({
        where: { madonhang: 'TG-AA37906' },
        include: {
            sanpham: { include: { sanpham: true } }
        }
    });

    if (!order) {
        console.log('Order not found');
        return;
    }

    console.log(`DH: ${order.madonhang}, Status: ${order.status}`);
    order.sanpham.forEach(sp => {
        console.log(`  - SP: ${sp.sanpham?.title}, SLDat: ${sp.sldat}, IsActive: ${sp.isActive}, IsActiveType: ${typeof sp.isActive}`);
    });
}

checkKoko().catch(console.error).finally(() => prisma.$disconnect());
