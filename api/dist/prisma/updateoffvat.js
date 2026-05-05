"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function updateOffVAT() {
    try {
        const result = await prisma.khachhang.updateMany({
            data: {
                isshowvat: false
            }
        });
        console.log(`Updated ${result.count} records`);
    }
    catch (error) {
        console.error('Error updating VAT status:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
updateOffVAT();
//# sourceMappingURL=updateoffvat.js.map