"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Checking ErrorLog for phieukho-related errors...');
    const errors = await prisma.errorLog.findMany({
        where: {
            OR: [
                { message: { contains: 'phieukho' } },
                { message: { contains: 'import' } },
                { details: { path: ['message'], string_contains: 'phieukho' } }
            ],
            createdAt: {
                gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
        },
        orderBy: { createdAt: 'desc' }
    });
    console.log(`Found ${errors.length} relevant errors today.`);
    for (const err of errors) {
        console.log(`--- ${err.createdAt} ---`);
        console.log(`Message: ${err.message}`);
        console.log(`Details: ${JSON.stringify(err.details, null, 2)}`);
    }
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=check_phieukho_errors.js.map