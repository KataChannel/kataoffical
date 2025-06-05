"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const newSoLuong = 0;
    const newSlKho = 0;
    const updateProducts = await prisma.sanpham.updateMany({
        data: {
            soluong: newSoLuong,
            soluongkho: newSlKho,
        },
    });
    console.log(`✅ Đã cập nhật soluong và slkho cho ${updateProducts.count} sản phẩm!`);
}
main()
    .catch((e) => {
    console.error('❌ Lỗi khi cập nhật dữ liệu sản phẩm:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=capnhat.js.map