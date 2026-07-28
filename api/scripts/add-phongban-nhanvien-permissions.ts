/**
 * Script: Add Phongban & Nhanvien Permissions
 * 
 * Usage:
 *   Add permissions:    cd api && npx ts-node scripts/add-phongban-nhanvien-permissions.ts
 *   Add with user ID:   cd api && npx ts-node scripts/add-phongban-nhanvien-permissions.ts --user-id=<USER_ID>
 *   Remove permissions: cd api && npx ts-node scripts/add-phongban-nhanvien-permissions.ts --remove
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Parse command line arguments
const args = process.argv.slice(2);
const shouldRemove = args.includes('--remove');
const userIdArg = args.find(arg => arg.startsWith('--user-id='));
const specificUserId = userIdArg ? userIdArg.split('=')[1] : null;

// Permission definitions
const PERMISSIONS = [
  // Phongban permissions
  { name: 'phongban.view', description: 'Xem danh sách phòng ban', module: 'phongban' },
  { name: 'phongban.create', description: 'Tạo phòng ban mới', module: 'phongban' },
  { name: 'phongban.edit', description: 'Chỉnh sửa phòng ban', module: 'phongban' },
  { name: 'phongban.delete', description: 'Xóa phòng ban', module: 'phongban' },
  // Nhanvien permissions
  { name: 'nhanvien.view', description: 'Xem danh sách nhân viên', module: 'nhanvien' },
  { name: 'nhanvien.create', description: 'Tạo nhân viên mới', module: 'nhanvien' },
  { name: 'nhanvien.edit', description: 'Chỉnh sửa nhân viên', module: 'nhanvien' },
  { name: 'nhanvien.delete', description: 'Xóa nhân viên', module: 'nhanvien' },
];

async function removePermissions() {
  console.log('🗑️  Removing Phongban & Nhanvien permissions...\n');

  // 1. Remove user permissions first
  console.log('📝 Removing user permission assignments...');
  const deletedUserPerms = await prisma.userPermission.deleteMany({
    where: {
      permission: {
        OR: [
          { name: { startsWith: 'phongban.' } },
          { name: { startsWith: 'nhanvien.' } }
        ]
      }
    }
  });
  console.log(`  ✅ Removed ${deletedUserPerms.count} user permission assignments`);

  // 2. Remove permissions
  console.log('\n📝 Removing permissions...');
  const deletedPerms = await prisma.permission.deleteMany({
    where: {
      OR: [
        { name: { startsWith: 'phongban.' } },
        { name: { startsWith: 'nhanvien.' } }
      ]
    }
  });
  console.log(`  ✅ Removed ${deletedPerms.count} permissions`);

  console.log('\n✅ Done! All Phongban & Nhanvien permissions have been removed.');
}

async function addPermissions() {
  console.log('🚀 Starting to add Phongban & Nhanvien permissions...\n');

  // 1. Create permissions using upsert for efficiency
  console.log('📝 Creating permissions...');
  const createdPerms: string[] = [];
  const existingPerms: string[] = [];

  for (const perm of PERMISSIONS) {
    try {
      const result = await prisma.permission.upsert({
        where: { name: perm.name },
        update: { description: perm.description },
        create: {
          name: perm.name,
          description: perm.description
        }
      });

      const existing = await prisma.permission.findUnique({
        where: { name: perm.name }
      });

      if (existing && existing.createdAt.getTime() === result.createdAt.getTime()) {
        existingPerms.push(perm.name);
        console.log(`  ⏭️  ${perm.name} - Already exists (updated description)`);
      } else {
        createdPerms.push(perm.name);
        console.log(`  ✅ ${perm.name} - Created`);
      }
    } catch (error) {
      console.error(`  ❌ ${perm.name} - Error:`, error.message);
    }
  }

  // 2. Find users to assign permissions
  console.log('\n🔍 Finding users for permission assignment...');
  
  type UserInfo = {
    id: string;
    name: string | null;
    email: string | null;
  };
  
  let targetUsers: UserInfo[] = [];
  
  if (specificUserId) {
    // Use specific user ID from command line
    const user = await prisma.user.findUnique({
      where: { id: specificUserId },
      select: { id: true, name: true, email: true }
    });
    
    if (user) {
      targetUsers = [user];
      console.log(`  ✅ Using specified user: ${user.name} (${user.email})`);
    } else {
      console.log(`  ❌ User with ID '${specificUserId}' not found`);
    }
  } else {
    // Try to find admin users by multiple criteria
    targetUsers = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: 'admin', mode: 'insensitive' } },
          { email: { contains: 'admin', mode: 'insensitive' } },
          // Add more criteria if you have isAdmin field or role
          // { isAdmin: true },
          // { role: { name: 'Admin' } }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true
      },
      take: 5 // Limit to first 5 admin users
    });
  }

  if (targetUsers.length === 0) {
    console.log('  ⚠️  No users found for automatic assignment.');
    console.log('\n📋 Available assignment methods:');
    console.log('  1. UI: http://localhost:4301/admin/user-permission');
    console.log('  2. CLI: npx ts-node scripts/add-phongban-nhanvien-permissions.ts --user-id=<YOUR_USER_ID>');
    console.log('\n💡 To find your user ID, run:');
    console.log('  npx prisma studio');
    console.log('  or: SELECT id, name, email FROM "User";');
  } else {
    console.log(`  Found ${targetUsers.length} user(s):`);
    targetUsers.forEach(u => console.log(`    - ${u.name} (${u.email}) [ID: ${u.id}]`));

    // 3. Assign permissions to users
    console.log('\n🔗 Assigning permissions...');
    
    const allPermissions = await prisma.permission.findMany({
      where: {
        OR: [
          { name: { startsWith: 'phongban.' } },
          { name: { startsWith: 'nhanvien.' } }
        ]
      }
    });

    let totalAssigned = 0;
    let totalSkipped = 0;

    for (const user of targetUsers) {
      console.log(`\n  Processing: ${user.name}`);
      
      // Get existing permissions for this user
      const existingUserPerms = await prisma.userPermission.findMany({
        where: {
          userId: user.id,
          permissionId: { in: allPermissions.map(p => p.id) }
        },
        select: { permissionId: true }
      });
      
      const existingPermIds = new Set(existingUserPerms.map(up => up.permissionId));
      
      // Create only new assignments
      const newAssignments = allPermissions
        .filter(p => !existingPermIds.has(p.id))
        .map(p => ({
          userId: user.id,
          permissionId: p.id
        }));

      if (newAssignments.length > 0) {
        await prisma.userPermission.createMany({
          data: newAssignments,
          skipDuplicates: true
        });
        totalAssigned += newAssignments.length;
        console.log(`    ✅ Assigned: ${newAssignments.length} permissions`);
      }

      const skipped = allPermissions.length - newAssignments.length;
      if (skipped > 0) {
        totalSkipped += skipped;
        console.log(`    ⏭️  Skipped: ${skipped} (already assigned)`);
      }
    }

    console.log(`\n  📊 Total: ${totalAssigned} assigned, ${totalSkipped} skipped`);
  }

  // 4. Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  
  const phongbanPerms = await prisma.permission.count({
    where: { name: { startsWith: 'phongban.' } }
  });
  const nhanvienPerms = await prisma.permission.count({
    where: { name: { startsWith: 'nhanvien.' } }
  });
  const totalAssignments = await prisma.userPermission.count({
    where: {
      permission: {
        OR: [
          { name: { startsWith: 'phongban.' } },
          { name: { startsWith: 'nhanvien.' } }
        ]
      }
    }
  });

  console.log(`\n✅ Permissions in database:`);
  console.log(`   - Phongban: ${phongbanPerms} permissions`);
  console.log(`   - Nhanvien: ${nhanvienPerms} permissions`);
  console.log(`   - Total: ${phongbanPerms + nhanvienPerms} permissions`);
  
  console.log(`\n✅ Permission assignments:`);
  console.log(`   - Total users with access: ${totalAssignments / 8} users`);
  console.log(`   - Total assignments: ${totalAssignments}`);

  console.log('\n✅ Done! Permissions have been set up successfully.');
  console.log('\n💡 Next steps:');
  console.log('   1. Access Phongban: http://localhost:4301/admin/phongban/list');
  console.log('   2. Access Nhanvien: http://localhost:4301/admin/nhanvien/list');
  console.log('   3. Manage permissions: http://localhost:4301/admin/user-permission');
  console.log('   4. Re-enable PermissionGuard in frontend/src/app/app.routes.ts');
}

async function main() {
  if (shouldRemove) {
    await removePermissions();
  } else {
    await addPermissions();
  }
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
