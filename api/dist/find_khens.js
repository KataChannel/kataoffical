"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const customers = await prisma.khachhang.findMany({
        where: {
            name: {
                contains: 'KHÈN',
                mode: 'insensitive'
            }
        }
    });
    console.log('Customers Found:', JSON.stringify(customers, null, 2));
}
main()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=find_khens.js.map