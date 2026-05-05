"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Checking all Chotkho records from today...');
    const chotkhos = await prisma.chotkho.findMany({
        where: {
            createdAt: {
                gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
        },
        include: {
            details: true,
            kho: true
        }
    });
    console.log(`Found ${chotkhos.length} Chotkho records today.`);
    console.log(JSON.stringify(chotkhos, null, 2));
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=check_chotkho_today.js.map