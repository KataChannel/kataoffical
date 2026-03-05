"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Searching for any ImportHistory today containing the value 649...');
    const result = await prisma.$queryRaw `
    SELECT id, "createdAt", "type", "caseDetail"
    FROM "ImportHistory"
    WHERE "createdAt" >= CURRENT_DATE
    AND "caseDetail"::text LIKE '%649%'
  `;
    console.log(`Found ${result.length} imports containing 649 today.`);
    for (const imp of result) {
        console.log(`--- Import ID: ${imp.id} at ${imp.createdAt} (Type: ${imp.type}) ---`);
        console.log(JSON.stringify(imp.caseDetail, null, 2));
    }
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=sql_search_649.js.map