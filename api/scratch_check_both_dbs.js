const { PrismaClient } = require('@prisma/client');

async function checkDb(dbUrl, dbName) {
  console.log(`\n=================== Checking DB: ${dbName} ===================`);
  const prisma = new PrismaClient({
    datasources: {
      postgres: {
        url: dbUrl
      }
    }
  });

  try {
    const email = 'contact.rausachtrangia@gmail.com';
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
                permissions: { include: { permission: true } }
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
      console.log(`❌ User not found with email: ${email} in ${dbName}`);
      return;
    }

    console.log('✅ User Found:');
    console.log(`ID: ${user.id}`);
    console.log(`Email: ${user.email}`);
    console.log(`Name: ${user.name}`);
    console.log(`IsActive: ${user.isActive}`);
    
    console.log('Roles:');
    if (user.roles.length === 0) {
      console.log('  No roles assigned.');
    } else {
      user.roles.forEach(ur => {
        console.log(`  - Role: ${ur.role.name}`);
      });
    }

    console.log('Direct User Permissions:');
    if (user.userPermissions.length === 0) {
      console.log('  No direct user permissions assigned.');
    } else {
      user.userPermissions.forEach(up => {
        console.log(`  - Permission: ${up.permission.name} | isGranted: ${up.isGranted} | expiresAt: ${up.expiresAt}`);
      });
    }
  } catch (error) {
    console.error(`Error checking DB ${dbName}:`, error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const urlTestData = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public';
  const urlRausachFinal = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';

  await checkDb(urlTestData, 'testdata (Local Dev Env DB)');
  await checkDb(urlRausachFinal, 'rausachfinal (Production DB)');
}

main();
