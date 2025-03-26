"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const updateCustomers = await prisma.quanlyqrcode.createMany({
        data: [{
                name: 'John Doe',
                email: 'abc@gmail.com',
                phone: '0123456789',
                code: 'viJeoG',
                qrcode: 'mzzGK7IyTvA8'
            },
            {
                name: 'Nguyễn Văn A',
                email: 'nguyenvana@gmail.com',
                phone: '987654321',
                code: 'kPEYen',
                qrcode: 'EbhD0hdYXuP9'
            },
            {
                name: 'Nguyễn Thị B',
                email: 'nguyenthib@gmail.com',
                phone: '987654322',
                code: 'LSfmto',
                qrcode: 'Km949pK919KO'
            },
            {
                name: 'Trần Mỹ Duyên',
                email: 'myduyen.cgo@gmail.com',
                phone: '935670135',
                code: 'bpnHCY',
                qrcode: 'p2gsBUsiPmTy'
            }
        ]
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
//# sourceMappingURL=create.js.map