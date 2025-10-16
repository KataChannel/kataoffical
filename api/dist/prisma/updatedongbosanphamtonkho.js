"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDongBoSanPhamTonKho = updateDongBoSanPhamTonKho;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function updateDongBoSanPhamTonKho() {
    try {
        const allSanpham = await prisma.sanpham.findMany({
            select: { id: true }
        });
        console.log(`Tìm thấy ${allSanpham.length} sản phẩm để đồng bộ tồn kho`);
        for (const sanpham of allSanpham) {
            await prisma.tonKho.upsert({
                where: { sanphamId: sanpham.id },
                update: {
                    slton: 0,
                },
                create: {
                    sanphamId: sanpham.id,
                    slton: 0,
                }
            });
        }
        console.log('Đồng bộ tồn kho hoàn tất');
        return { success: true, count: allSanpham.length };
    }
    catch (error) {
        console.error('Lỗi khi đồng bộ tồn kho:', error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
updateDongBoSanPhamTonKho();
//# sourceMappingURL=updatedongbosanphamtonkho.js.map