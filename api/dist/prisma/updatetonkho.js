"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function updateTonkho() {
    try {
        const tonkhos = await prisma.tonKho.findMany();
        for (const tonkho of tonkhos) {
            if (tonkho.slchonhap.toNumber() > 0 || tonkho.slchogiao.toNumber() > 0) {
                await prisma.tonKho.update({
                    where: {
                        id: tonkho.id
                    },
                    data: {
                        slchogiao: 0,
                        slchonhap: 0
                    }
                });
            }
        }
        console.log('Cập nhật tồn kho thành công!');
    }
    catch (error) {
        console.error('Lỗi khi cập nhật:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
updateTonkho();
//# sourceMappingURL=updatetonkho.js.map