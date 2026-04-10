import { PrismaClient } from '@prisma/client';

/**
 * Script to add "Chốt Kho" menu item and associate it with Admin role
 * Usage: npx ts-node prisma/add-chotkho-menu.ts
 */

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting menu update for "Chốt Kho"...');

  try {
    // 1. Find "Quản Lý Kho" Parent Menu
    const parentMenu = await prisma.menu.findFirst({
      where: { title: 'Quản Lý Kho' },
    });

    if (!parentMenu) {
      console.error('❌ Error: Parent menu "Quản Lý Kho" not found! Please check your database content.');
      return;
    }
    console.log(`📂 Found parent menu: ${parentMenu.title} (ID: ${parentMenu.id})`);

    // 2. Manage "Chốt Kho" Menu Item
    // We use the slug as the unique identifier for our logical check
    let chotkhoMenu = await prisma.menu.findFirst({
      where: { slug: '/admin/chotkho' },
    });

    if (!chotkhoMenu) {
      chotkhoMenu = await prisma.menu.create({
        data: {
          title: 'Chốt Kho',
          slug: '/admin/chotkho',
          parentId: parentMenu.id,
          order: 10, // Placing it after Phiếu Kho (8), Kho (9), Xuất Nhập Tồn (null/prev)
          isActive: true,
        },
      });
      console.log('✅ Created "Chốt Kho" menu item.');
    } else {
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

    // 3. Manage "chotkho.view" Permission
    let permission = await prisma.permission.findUnique({
      where: { name: 'chotkho.view' },
    });

    if (!permission) {
      // Find latest group or set a default
      permission = await prisma.permission.create({
        data: {
          name: 'chotkho.view',
          description: 'Xem danh sách chốt kho và thực hiện chốt kho',
          group: 'Kho',
          order: 100,
        },
      });
      console.log('✅ Created "chotkho.view" permission.');
    } else {
      console.log('ℹ️ Permission "chotkho.view" already exists.');
    }

    // 4. Assign Permission to "Admin" Role
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
      } else {
        console.log('ℹ️ "Admin" role already has "chotkho.view" permission.');
      }
    } else {
      console.warn('⚠️ Warning: "Admin" role not found. Skipping permission assignment.');
    }

    console.log('\n✨ Menu update completed successfully!');
    
  } catch (error) {
    console.error('❌ An error occurred during the update:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
