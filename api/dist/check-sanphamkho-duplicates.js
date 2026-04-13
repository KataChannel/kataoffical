"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function checkDuplicates() {
    try {
        const duplicates = await prisma.$queryRaw `
      SELECT "sanphamId", "khoId", COUNT(*)
      FROM "SanphamKho"
      GROUP BY "sanphamId", "khoId"
      HAVING COUNT(*) > 1
    `;
        console.log('Duplicates found:', duplicates);
        if (Array.isArray(duplicates) && duplicates.length > 0) {
            console.log('⚠️ Duplicates found in SanphamKho. Migration will fail.');
        }
        else {
            console.log('✅ No duplicates found in SanphamKho. Safe to add unique constraint.');
        }
    }
    catch (error) {
        console.error('Error checking duplicates:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
checkDuplicates();
//# sourceMappingURL=check-sanphamkho-duplicates.js.map