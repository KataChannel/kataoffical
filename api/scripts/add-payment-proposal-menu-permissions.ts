import { PrismaClient } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu cập nhật menu và permission cho Payment Proposal...');

  // 1. Định nghĩa permissions
  const permissions = [
    { name: 'payment-proposal.view', description: 'Xem danh sách đề xuất thanh toán', group: 'Kế toán' },
    { name: 'payment-proposal.create', description: 'Tạo đề xuất thanh toán', group: 'Kế toán' },
    { name: 'payment-proposal.update', description: 'Cập nhật đề xuất thanh toán', group: 'Kế toán' },
    { name: 'payment-proposal.delete', description: 'Xóa đề xuất thanh toán', group: 'Kế toán' },
    { name: 'payment-proposal.approve', description: 'Phê duyệt đề xuất thanh toán', group: 'Kế toán' },
  ];

  console.log('📝 Đang khởi tạo permissions...');
  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: { description: perm.description, group: perm.group },
      create: {
        name: perm.name,
        description: perm.description,
        group: perm.group,
        codeId: `P_PP_${perm.name.split('.')[1].toUpperCase()}`
      }
    });
    console.log(`  ✅ ${perm.name}`);
  }

  // 2. Tìm menu Kế Toán
  const ketoanMenu = await prisma.menu.findFirst({
    where: { title: 'Kế Toán' }
  });

  if (!ketoanMenu) {
    console.error('❌ Không tìm thấy menu Kế Toán!');
    return;
  }

  // 3. Tạo menu Đề xuất thanh toán
  const slug = '/admin/payment-proposal';
  const existingMenu = await prisma.menu.findFirst({
    where: { slug }
  });

  if (!existingMenu) {
    await prisma.menu.create({
      data: {
        title: 'Đề xuất thanh toán',
        icon: 'assignment_turned_in',
        slug: slug,
        parentId: ketoanMenu.id,
        order: 0, // Đặt lên đầu trong nhóm kế toán
        isActive: true
      }
    });
    console.log('✅ Đã tạo menu Đề xuất thanh toán');
  } else {
    await prisma.menu.update({
      where: { id: existingMenu.id },
      data: {
        parentId: ketoanMenu.id,
        order: 0,
        isActive: true
      }
    });
    console.log('✅ Đã cập nhật menu Đề xuất thanh toán');
  }

  // 4. Gán quyền cho tất cả users (để review)
  const users = await prisma.user.findMany({});

  const allProposalPerms = await prisma.permission.findMany({
    where: { name: { startsWith: 'payment-proposal.' } }
  });

  console.log(`🔗 Đang gán quyền cho ${users.length} users...`);
  for (const user of users) {
    for (const perm of allProposalPerms) {
      await prisma.userPermission.upsert({
        where: {
          userId_permissionId: {
            userId: user.id,
            permissionId: perm.id
          }
        },
        update: {},
        create: {
          userId: user.id,
          permissionId: perm.id
        }
      });
    }
  }

  console.log('✨ Hoàn tất cập nhật!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
