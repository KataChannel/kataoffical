"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const users = await prisma.user.findMany({
        where: {
            OR: [
                { email: { contains: '2967' } },
                { SDT: { contains: '2967' } }
            ]
        },
        select: {
            id: true,
            email: true,
            SDT: true,
            name: true
        }
    });
    console.log(JSON.stringify(users, null, 2));
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=find_user.js.map