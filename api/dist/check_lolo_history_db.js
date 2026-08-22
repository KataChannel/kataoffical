"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
    const prisma = new client_1.PrismaClient({ datasourceUrl: prodUrl });
    try {
        const masp = 'I100207';
        console.log(`🔍 Querying product info...`);
        const product = await prisma.sanpham.findUnique({
            where: { masp },
            include: {
                TonKho: true,
                SanphamKho: true
            }
        });
        if (!product) {
            console.log('❌ Product not found!');
            return;
        }
        console.log(`Product ID: ${product.id}`);
        console.log(`Current TonKho:`, product.TonKho);
        console.log(`Current SanphamKho:`, product.SanphamKho);
        console.log('\n🔍 All ChotKho Details for this product:');
        const chotDetails = await prisma.chotkhodetail.findMany({
            where: { sanphamId: product.id },
            include: { chotkho: true },
            orderBy: { ngaychot: 'asc' }
        });
        for (const cd of chotDetails) {
            console.log(`- Code: ${cd.chotkho?.codeId} | NgayChot: ${cd.ngaychot.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} | CreatedAt: ${cd.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} | SysStock: ${cd.sltonhethong} | RealStock: ${cd.sltonthucte} | Diff: ${cd.chenhlech} | Note: ${cd.ghichu}`);
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check_lolo_history_db.js.map