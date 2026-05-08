"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function checkDetail() {
    const detail = await prisma.chotkhodetail.findFirst({
        where: { sanpham: { masp: 'I100470' } },
        orderBy: { ngaychot: 'desc' },
        include: { chotkho: true, sanpham: true }
    });
    console.log(JSON.stringify(detail, null, 2));
}
checkDetail().finally(() => prisma.$disconnect());
//# sourceMappingURL=check_I100470_detail.js.map