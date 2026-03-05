"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const productId = 'b69aaeb6-f337-4df8-a78a-fa0c84f6faa7';
    console.log(`Searching for failed imports containing product ID: ${productId}`);
    const result = await prisma.$queryRaw `
    SELECT id, "createdAt", "caseDetail"
    FROM "ImportHistory"
    WHERE "type" = 'phieukho_error'
    AND "createdAt" >= CURRENT_DATE
    AND "caseDetail"::text LIKE ${'%' + productId + '%'}
  `;
    console.log(`Found ${result.length} failed imports containing the product ID today.`);
    for (const imp of result) {
        console.log(`--- Import ID: ${imp.id} at ${imp.createdAt} ---`);
        const inputData = imp.caseDetail.inputData;
        console.log(inputData);
    }
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=sql_search_id.js.map