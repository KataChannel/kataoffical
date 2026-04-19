const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCustomers() {
    const names = ['Công ty TNHH SIAM Beverage', 'Anh Sơn (Văn Phòng TG)'];
    const khs = await prisma.khachhang.findMany({
        where: { name: { in: names } },
        include: { nhomkhachhang: true }
    });

    khs.forEach(kh => {
        console.log(`KH: ${kh.name}, Loai: ${kh.loaikh}, Nhom: ${kh.nhomkhachhang.map(n => n.name).join(', ')}`);
    });
}

checkCustomers().catch(console.error).finally(() => prisma.$disconnect());
