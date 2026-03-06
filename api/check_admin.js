const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const adminLike = await prisma.user.findMany({
        where: {
            OR: [
                { name: { contains: 'Admin', mode: 'insensitive' } },
                { email: { contains: 'admin', mode: 'insensitive' } },
                { name: null }
            ]
        },
        select: { id: true, email: true, name: true }
    });
    console.log("Users matching 'Admin' or with null name:");
    console.log(JSON.stringify(adminLike, null, 2));

    // Also check if there's any user linked to the most recent chotkhodetail
    const recentChot = await prisma.chotkhodetail.findFirst({
        orderBy: { updatedAt: 'desc' },
        include: { user: true }
    });
    console.log("\nLast person to perform a count:");
    console.log(JSON.stringify({
        email: recentChot?.user?.email,
        name: recentChot?.user?.name
    }, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
