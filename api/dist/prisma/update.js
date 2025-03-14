"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeVietnameseAccents = removeVietnameseAccents;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const customers = await prisma.khachhang.findMany({
        select: { id: true, name: true, namenn: true },
    });
    for (const customer of customers) {
        await prisma.khachhang.update({
            where: { id: customer.id },
            data: {
                subtile: customer.name ? removeVietnameseAccents(customer.name) : null,
            },
        });
    }
    console.log(`✅ Đã cập nhật ${customers.length} khách hàng!`);
}
main()
    .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
function removeVietnameseAccents(text) {
    if (!text) {
        return "";
    }
    return text
        .replace(/đ/g, "d")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
}
//# sourceMappingURL=update.js.map