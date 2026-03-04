"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function updateBanggiaIdDonhang() {
    try {
        const donhangs = await prisma.donhang.findMany({
            include: {
                khachhang: {
                    include: {
                        banggia: true
                    }
                }
            }
        });
        for (const donhang of donhangs) {
            if (donhang.khachhang?.id && donhang.khachhang.banggia?.id) {
                const banggiaExists = await prisma.banggia.findUnique({
                    where: {
                        id: donhang.khachhang.banggia.id
                    }
                });
                if (banggiaExists) {
                    await prisma.donhang.update({
                        where: {
                            id: donhang.id
                        },
                        data: {
                            banggiaId: donhang.khachhang.banggia.id
                        }
                    });
                }
                else {
                    console.log(`Banggia với id ${donhang.khachhang.banggia.id} không tồn tại cho đơn hàng ${donhang.id}`);
                }
            }
        }
        console.log('Cập nhật banggiaId cho đơn hàng thành công!');
    }
    catch (error) {
        console.error('Lỗi khi cập nhật:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
updateBanggiaIdDonhang();
//# sourceMappingURL=updatebanggiadonhang.js.map