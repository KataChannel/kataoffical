"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const viewProfile = await prisma.permission.upsert({
        where: { name: 'view_profile' },
        update: {},
        create: { name: 'view_profile', description: 'Xem thông tin cá nhân' },
    });
    const editProfile = await prisma.permission.upsert({
        where: { name: 'edit_profile' },
        update: {},
        create: { name: 'edit_profile', description: 'Chỉnh sửa thông tin cá nhân' },
    });
    const adminRole = await prisma.role.upsert({
        where: { name: 'Admin' },
        update: {},
        create: { name: 'Admin' },
    });
    const userRole = await prisma.role.upsert({
        where: { name: 'User' },
        update: {},
        create: { name: 'User' },
    });
    await prisma.rolePermission.createMany({
        data: [
            { roleId: adminRole.id, permissionId: viewProfile.id },
            { roleId: adminRole.id, permissionId: editProfile.id },
            { roleId: userRole.id, permissionId: viewProfile.id },
        ],
        skipDuplicates: true,
    });
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: { email: 'admin@example.com', password: '123456' },
    });
    const normalUser = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: { email: 'user@example.com', password: '123456' },
    });
    await prisma.userRole.createMany({
        data: [
            { userId: adminUser.id, roleId: adminRole.id },
            { userId: normalUser.id, roleId: userRole.id },
        ],
        skipDuplicates: true,
    });
}
main()
    .catch((e) => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed1.js.map