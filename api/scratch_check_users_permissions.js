const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Querying all users who have phieugiaohang.view permission...');
  
  // Find all UserPermissions for phieugiaohang.view
  const userPermissions = await prisma.userPermission.findMany({
    where: {
      permission: {
        name: 'phieugiaohang.view'
      }
    },
    include: {
      user: {
        select: {
          email: true,
          name: true,
          isActive: true
        }
      },
      permission: true
    }
  });

  console.log(`Found ${userPermissions.length} direct user permissions:`);
  userPermissions.forEach(up => {
    console.log(`- Email: ${up.user.email} | Name: ${up.user.name} | isGranted: ${up.isGranted} | expiresAt: ${up.expiresAt}`);
  });

  // Find all RolePermissions for phieugiaohang.view
  const rolePermissions = await prisma.rolePermission.findMany({
    where: {
      permission: {
        name: 'phieugiaohang.view'
      }
    },
    include: {
      role: {
        include: {
          users: {
            include: {
              user: {
                select: {
                  email: true,
                  name: true,
                  isActive: true
                }
              }
            }
          }
        }
      }
    }
  });

  console.log(`\nFound ${rolePermissions.length} roles with this permission:`);
  rolePermissions.forEach(rp => {
    console.log(`- Role: ${rp.role.name}`);
    console.log(`  Users in role:`);
    rp.role.users.forEach(u => {
      console.log(`    * ${u.user.email} (${u.user.name})`);
    });
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
