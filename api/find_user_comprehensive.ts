import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function findUserComprehensive() {
  const ip = '1.53.82.130';
  console.log(`🔎 Comprehensive search for IP: ${ip}`);
  
  const audits = await prisma.auditLog.findMany({
    where: {
      ipAddress: ip
    },
    include: {
      user: true // Try to include the user object through relation
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 50
  });

  if (audits.length === 0) {
    console.log(`❌ No audit logs found for IP ${ip}.`);
    return;
  }

  console.log(`✅ Found ${audits.length} logs for IP ${ip}:`);
  
  const userInfo = audits.map(a => ({
    time: a.createdAt,
    email: a.userEmail,
    userId: a.userId,
    userName: a.user ? a.user.name : 'Unknown',
    action: a.action,
    entity: a.entityName
  }));

  const uniqueUsers = [...new Set(userInfo.map(u => u.email || u.userId || 'Anonymous'))];
  console.log(`Unique Identities:`, uniqueUsers);

  console.log(`Detail entries:`);
  userInfo.forEach(u => {
    console.log(`- ${u.time.toISOString()} | ID: ${u.userId} | Email: ${u.email} | Name: ${u.userName} | Action: ${u.action} | Entity: ${u.entity}`);
  });

  // If we still find nulls, let's search for ANY log from this User (if we got a userId from one entry)
  // or ANY log from the same period to see who else was active.
  const activeUsersAroundTime = await prisma.auditLog.findMany({
    where: {
      createdAt: {
        gte: new Date('2026-03-04T22:00:00Z'),
        lte: new Date('2026-03-05T01:00:00Z')
      },
      userEmail: { not: null }
    },
    select: { userEmail: true, ipAddress: true },
    distinct: ['userEmail', 'ipAddress']
  });

  console.log(`\n🔎 Other active users from ANY IP between 22:00 (Mar 4) and 01:00 (Mar 5):`);
  activeUsersAroundTime.forEach(u => {
    console.log(`- User: ${u.userEmail} | IP: ${u.ipAddress}`);
  });
}

findUserComprehensive()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
