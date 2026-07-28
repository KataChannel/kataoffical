const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        postgres: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public"
        },
    },
});

async function main() {
    const donhangId = '05619d4f-1c7e-4113-a1a7-228b08194b1e';
    const masp = 'I100474'; // Chanh Dây

    const order = await prisma.donhang.findUnique({
        where: { id: donhangId },
        select: { id: true, madonhang: true, status: true, tongtien: true, tongvat: true }
    });

    if (!order) {
        console.log(`❌ Order with ID ${donhangId} not found in testdata database.`);
        return;
    }

    console.log('--- ORDER DETAILS IN TESTDATA ---');
    console.log(JSON.stringify(order, null, 2));

    const item = await prisma.donhangsanpham.findFirst({
        where: {
            donhangId: donhangId,
            sanpham: { masp: masp }
        },
        include: {
            sanpham: {
                select: { masp: true, title: true, dvt: true }
            }
        }
    });

    console.log('\n--- CHANH DAY (I100474) RECORD IN TESTDATA ---');
    if (!item) {
        console.log(`❌ Product Chanh Day not found in order ${order.madonhang} in testdata database.`);
    } else {
        console.log(JSON.stringify({
            id: item.id,
            product: item.sanpham.title,
            masp: item.sanpham.masp,
            sldat: Number(item.sldat),
            slgiao: Number(item.slgiao),
            slnhan: Number(item.slnhan),
            slhuy: Number(item.slhuy),
            ttdat: Number(item.ttdat),
            ttgiao: Number(item.ttgiao),
            ttnhan: Number(item.ttnhan),
            ghichu: item.ghichu
        }, null, 2));
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
