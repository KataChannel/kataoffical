const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'contact.rausachtrangia@gmail.com';
  console.log(`Checking user: ${email}`);
  
  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive'
      }
    },
    include: {
      roles: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true
                }
              }
            }
          }
        }
      },
      userPermissions: {
        include: {
          permission: true
        }
      }
    }
  });

  if (!user) {
    console.log(`❌ User not found with email: ${email}`);
    // Let's list some users to see if there is any similar email
    const users = await prisma.user.findMany({
      take: 10,
      select: {
        email: true,
        name: true,
        isActive: true
      }
    });
    console.log('Some existing users:', users);
    return;
  }

  console.log('✅ User Found:');
  console.log(`ID: ${user.id}`);
  console.log(`Email: ${user.email}`);
  console.log(`Name: ${user.name}`);
  console.log(`IsActive: ${user.isActive}`);
  
  console.log('\n--- Roles ---');
  if (user.roles.length === 0) {
    console.log('No roles assigned.');
  } else {
    user.roles.forEach(ur => {
      console.log(`- Role: ${ur.role.name} (ID: ${ur.role.id})`);
    });
  }

  console.log('\n--- Direct User Permissions ---');
  if (user.userPermissions.length === 0) {
    console.log('No direct user permissions assigned.');
  } else {
    user.userPermissions.forEach(up => {
      console.log(`- Permission: ${up.permission.name} | isGranted: ${up.isGranted}`);
    });
  }

  console.log('\n--- Permissions via Roles ---');
  const rolePermissions = [];
  user.roles.forEach(ur => {
    ur.role.permissions.forEach(rp => {
      rolePermissions.push({
        roleName: ur.role.name,
        permissionName: rp.permission.name
      });
    });
  });

  if (rolePermissions.length === 0) {
    console.log('No permissions via roles.');
  } else {
    rolePermissions.forEach(rp => {
      console.log(`- [Role: ${rp.roleName}] Permission: ${rp.permissionName}`);
    });
  }

  // Check if has phieugiaohang.view
  const hasDirectView = user.userPermissions.some(up => up.permission.name === 'phieugiaohang.view' && up.isGranted);
  const hasDirectDeny = user.userPermissions.some(up => up.permission.name === 'phieugiaohang.view' && !up.isGranted);
  const hasRoleView = rolePermissions.some(rp => rp.permissionName === 'phieugiaohang.view');

  console.log('\n--- Permission Verification for phieugiaohang.view ---');
  console.log(`Has direct grant: ${hasDirectView}`);
  console.log(`Has direct deny (override): ${hasDirectDeny}`);
  console.log(`Has via roles: ${hasRoleView}`);

  const canAccess = (hasDirectView || (hasRoleView && !hasDirectDeny));
  console.log(`Result: ${canAccess ? '✅ CAN ACCESS' : '❌ CANNOT ACCESS'}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
