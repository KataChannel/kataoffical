"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Listing ALL ImportHistory from today...');
    const imports = await prisma.importHistory.findMany({
        where: {
            createdAt: {
                gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
        },
        orderBy: { createdAt: 'asc' }
    });
    console.log(`Found ${imports.length} imports.`);
    for (const imp of imports) {
        console.log(`${imp.id} | ${imp.type} | ${imp.title} | ${imp.createdAt}`);
    }
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=list_all_imports.js.map