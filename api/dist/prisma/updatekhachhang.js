"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAllKhachHangActive = updateAllKhachHangActive;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function updateAllKhachHangActive() {
    try {
        const result = await prisma.khachhang.updateMany({
            data: {
                isActive: true
            }
        });
        console.log(`Updated ${result.count} khachhang records`);
        return result;
    }
    catch (error) {
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
updateAllKhachHangActive();
//# sourceMappingURL=updatekhachhang.js.map