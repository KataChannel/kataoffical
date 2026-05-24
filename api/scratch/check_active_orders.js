const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const masp = 'I100480';
    console.log(`=== SEARCHING ACTIVE ORDERS (dadat / dagiao) FOR ${masp} ===`);

    const sp = await prisma.sanpham.findUnique({ where: { masp } });
    if (!sp) {
        console.error('Product not found!');
        return;
    }

    const orderItems = await prisma.donhangsanpham.findMany({
        where: {
            idSP: sp.id,
            donhang: {
                status: { in: ['dadat', 'dagiao'] }
            }
        },
        include: {
            donhang: true
        }
    });

    console.log(`Found ${orderItems.length} active orders.`);
    orderItems.forEach(item => {
        console.log(`Order: ${item.donhang.madonhang} | Trạng thái: ${item.donhang.status} | Đặt: ${item.sldat} | Giao: ${item.slgiao} | Nhận: ${item.slnhan} | Khách: ${item.donhang.tenkhachhang} | Ngày giao: ${item.donhang.ngaygiao?.toLocaleString('vi-VN')} | CreatedAt: ${item.donhang.createdAt.toLocaleString('vi-VN')}`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
