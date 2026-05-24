const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const chotkhoId = '1f26d811-1228-48b4-b286-f7d454f1895e';
    const masp = 'I100480';
    console.log(`=== CHECKING CHOTKHODETAIL FOR ${masp} IN MASTER ${chotkhoId} ===`);

    const sp = await prisma.sanpham.findUnique({ where: { masp } });
    if (!sp) {
        console.error('Product not found!');
        return;
    }

    const detail = await prisma.chotkhodetail.findFirst({
        where: {
            chotkhoId: chotkhoId,
            sanphamId: sp.id
        }
    });

    if (detail) {
        console.log('Chotkhodetail Record:', {
            id: detail.id,
            sanphamId: detail.sanphamId,
            sltonhethong: Number(detail.sltonhethong),
            sltonthucte: Number(detail.sltonthucte),
            slhuy: Number(detail.slhuy),
            chenhlech: Number(detail.chenhlech),
            ghichu: detail.ghichu,
            ngaychot: detail.ngaychot.toLocaleString('vi-VN')
        });
    } else {
        console.log('Detail record NOT found for this product in this master!');
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
