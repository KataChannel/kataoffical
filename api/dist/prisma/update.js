"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const updateCustomers = await prisma.banggia.updateMany({
        data: { type: 'bansi' },
    });
    console.log(`✅ Đã cập nhật ${updateCustomers.count} khách hàng!`);
}
main()
    .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=update.js.map