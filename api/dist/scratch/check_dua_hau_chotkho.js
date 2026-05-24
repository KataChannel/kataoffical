"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const masps = ['I100479', 'I100480'];
    const products = await prisma.sanpham.findMany({
        where: { masp: { in: masps } }
    });
    if (products.length === 0) {
        console.log('No products found.');
        return;
    }
    for (const product of products) {
        console.log('========================================================================');
        console.log(`PRODUCT: ${product.title} (${product.masp})`);
        const details = await prisma.chotkhodetail.findMany({
            where: { sanphamId: product.id },
            include: {
                chotkho: {
                    include: { kho: true }
                }
            },
            orderBy: { ngaychot: 'desc' }
        });
        console.log(`Found ${details.length} chốt kho records.`);
        if (details.length > 0) {
            details.forEach((d) => {
                console.log(`- Ngày chốt: ${d.ngaychot.toISOString()}`);
                console.log(`  Kho: ${d.chotkho?.kho?.name || 'N/A'} (${d.chotkho?.kho?.makho || 'N/A'})`);
                console.log(`  Chốt kho ID: ${d.chotkhoId}`);
                console.log(`  Tiêu đề chốt kho: ${d.chotkho?.title || 'N/A'}`);
                console.log(`  Tồn hệ thống: ${d.sltonhethong}`);
                console.log(`  Tồn thực tế: ${d.sltonthucte}`);
                console.log(`  Hủy: ${d.slhuy}`);
                console.log(`  Chênh lệch: ${d.chenhlech}`);
                console.log(`  Ghi chú: ${d.ghichu || 'Không có'}`);
                console.log('----------------------------------------------------');
            });
        }
        else {
            console.log('Chưa từng được chốt kho lần nào.');
        }
        console.log('========================================================================\n');
    }
}
main()
    .catch(e => console.error('Error running script:', e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check_dua_hau_chotkho.js.map