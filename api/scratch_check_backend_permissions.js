const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const id = '92367cf7-eadd-4da1-b638-0867cf287780';
  console.log(`Analyzing permissions calculation for user ID: ${id}`);
  
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      roles: {
        include: {
          role: {
            include: {
              permissions: { include: { permission: true } },
            },
          },
        },
      },
      userPermissions: {
        include: {
          permission: true
        }
      }
    },
  });

  if (!user) {
    console.log(`❌ User not found with ID: ${id}`);
    return;
  }

  const { password, roles, userPermissions, ...userWithoutPassword } = user; 
  
  const formattedRoles = roles.map(({ role }) => {
    const { permissions, ...roleWithoutPermissions } = role;
    return roleWithoutPermissions;
  });
  
  const rolePermissions = Array.from(
    new Set(roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission)))
  );
  
  const now = new Date();
  console.log('Current time (now):', now.toISOString());

  // Log all raw user permissions with expiresAt
  console.log('\n--- Raw userPermissions ---');
  userPermissions.forEach(up => {
    console.log(`- name: ${up.permission.name} | isGranted: ${up.isGranted} | expiresAt: ${up.expiresAt ? up.expiresAt.toISOString() : 'null'}`);
  });
  
  const validUserPermissions = userPermissions
    .filter(up => up.isGranted && (!up.expiresAt || new Date(up.expiresAt) > now))
    .map(up => up.permission);
  
  const deniedUserPermissions = userPermissions
    .filter(up => !up.isGranted && (!up.expiresAt || new Date(up.expiresAt) > now))
    .map(up => up.permission.id);
  
  const allPermissions = [
    ...rolePermissions.filter(p => !deniedUserPermissions.includes(p.id)),
    ...validUserPermissions
  ];
  
  const uniquePermissions = Array.from(
    new Map(allPermissions.map(p => [p.id, p])).values()
  );
  
  console.log('\n--- Calculated uniquePermissions ---');
  uniquePermissions.forEach(p => {
    console.log(`- id: ${p.id} | name: ${p.name}`);
  });

  const permissionsList = uniquePermissions.map(p => p.name);
  console.log('\nFinal mapped permissions list:', permissionsList);
  console.log('Includes "phieugiaohang.view":', permissionsList.includes('phieugiaohang.view'));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
