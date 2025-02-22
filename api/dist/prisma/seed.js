"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.menu.createMany({
        data: [
            { id: '1', title: 'Dashboard', slug: '/dashboard', order: 1 },
            { id: '2', title: 'Users', slug: '/users', order: 2 },
            { id: '3', title: 'Settings', slug: '/settings', order: 3 },
            { id: '4', title: 'Profile', slug: '/profile', parentId: '3', order: 1 },
            { id: '5', title: 'Security', slug: '/security', parentId: '3', order: 2 },
        ],
    });
}
main()
    .catch((e) => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map