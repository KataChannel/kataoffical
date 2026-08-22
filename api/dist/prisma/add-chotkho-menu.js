"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🚀 Starting menu update for "Chốt Kho"...');
    try {
        const parentMenu = await prisma.menu.findFirst({
            where: { title: 'Quản Lý Kho' },
        });
        if (!parentMenu) {
            console.error('❌ Error: Parent menu "Quản Lý Kho" not found! Please check your database content.');
            return;
        }
        console.log(`📂 Found parent menu: ${parentMenu.title} (ID: ${parentMenu.id})`);
        let chotkhoMenu = await prisma.menu.findFirst({
            where: { slug: '/admin/chotkho' },
        });
        if (!chotkhoMenu) {
            chotkhoMenu = await prisma.menu.create({
                data: {
                    title: 'Chốt Kho',
                    slug: '/admin/chotkho',
                    parentId: parentMenu.id,
                    order: 10,
                    isActive: true,
                },
            });
            console.log('✅ Created "Chốt Kho" menu item.');
        }
        else {
            chotkhoMenu = await prisma.menu.update({
                where: { id: chotkhoMenu.id },
                data: {
                    title: 'Chốt Kho',
                    parentId: parentMenu.id,
                    order: 10,
                    isActive: true,
                },
            });
            console.log('✅ Updated existing "Chốt Kho" menu item.');
        }
        let permission = await prisma.permission.findUnique({
            where: { name: 'chotkho.view' },
        });
        if (!permission) {
            permission = await prisma.permission.create({
                data: {
                    name: 'chotkho.view',
                    description: 'Xem danh sách chốt kho và thực hiện chốt kho',
                    group: 'Kho',
                    order: 100,
                },
            });
            console.log('✅ Created "chotkho.view" permission.');
        }
        else {
            console.log('ℹ️ Permission "chotkho.view" already exists.');
        }
        const adminRole = await prisma.role.findUnique({
            where: { name: 'Admin' },
        });
        if (adminRole) {
            const existingAssignment = await prisma.rolePermission.findFirst({
                where: {
                    roleId: adminRole.id,
                    permissionId: permission.id,
                },
            });
            if (!existingAssignment) {
                await prisma.rolePermission.create({
                    data: {
                        roleId: adminRole.id,
                        permissionId: permission.id,
                    },
                });
                console.log('✅ Assigned "chotkho.view" permission to "Admin" role.');
            }
            else {
                console.log('ℹ️ "Admin" role already has "chotkho.view" permission.');
            }
        }
        else {
            console.warn('⚠️ Warning: "Admin" role not found. Skipping permission assignment.');
        }
        console.log('\n✨ Menu update completed successfully!');
    }
    catch (error) {
        console.error('❌ An error occurred during the update:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=add-chotkho-menu.js.map