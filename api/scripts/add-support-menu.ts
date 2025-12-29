/**
 * Script thêm menu Hỗ trợ kỹ thuật vào database
 * Chạy: npx ts-node scripts/add-support-menu.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu thêm menu Hỗ trợ kỹ thuật...');

  // Kiểm tra xem menu Support đã tồn tại chưa
  const existingMenu = await prisma.menu.findFirst({
    where: {
      OR: [
        { slug: '/admin/support' },
        { title: 'Hỗ trợ kỹ thuật' }
      ]
    }
  });

  if (existingMenu) {
    console.log('⚠️ Menu Hỗ trợ kỹ thuật đã tồn tại:', existingMenu.id);
    return;
  }

  // Tìm order cao nhất
  const maxOrder = await prisma.menu.aggregate({
    _max: {
      order: true
    }
  });

  const newOrder = (maxOrder._max.order || 0) + 1;

  // Tạo menu mới
  const newMenu = await prisma.menu.create({
    data: {
      id: `menu_support_${Date.now()}`,
      title: 'Hỗ trợ kỹ thuật',
      icon: 'support_agent',
      slug: '/admin/support',
      parentId: null,
      order: newOrder,
      isActive: true,
      updatedAt: new Date()
    }
  });

  console.log('✅ Đã thêm menu Hỗ trợ kỹ thuật thành công!');
  console.log('Menu ID:', newMenu.id);
  console.log('Title:', newMenu.title);
  console.log('Slug:', newMenu.slug);
  console.log('Order:', newMenu.order);

  // Tạo permission cho support nếu cần
  const existingPermission = await prisma.permission.findFirst({
    where: {
      name: 'support.view'
    }
  });

  if (!existingPermission) {
    await prisma.permission.create({
      data: {
        id: `perm_support_view_${Date.now()}`,
        name: 'support.view',
        description: 'Xem hỗ trợ kỹ thuật',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    await prisma.permission.create({
      data: {
        id: `perm_support_create_${Date.now()}`,
        name: 'support.create',
        description: 'Tạo yêu cầu hỗ trợ',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    await prisma.permission.create({
      data: {
        id: `perm_support_update_${Date.now()}`,
        name: 'support.update',
        description: 'Cập nhật yêu cầu hỗ trợ',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    await prisma.permission.create({
      data: {
        id: `perm_support_delete_${Date.now()}`,
        name: 'support.delete',
        description: 'Xóa yêu cầu hỗ trợ',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    console.log('✅ Đã thêm các permission cho support');
  } else {
    console.log('⚠️ Permission support.view đã tồn tại');
  }
}

main()
  .catch((e) => {
    console.error('❌ Lỗi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
