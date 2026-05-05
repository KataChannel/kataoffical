"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function findUserByIP() {
    const ip = '1.53.82.130';
    console.log(`🔎 Searching for audit logs from IP: ${ip}`);
    const audits = await prisma.auditLog.findMany({
        where: {
            ipAddress: ip,
            userEmail: { not: null }
        },
        select: {
            userEmail: true,
            createdAt: true,
            action: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 20
    });
    if (audits.length === 0) {
        console.log(`❌ No audit logs with userEmail found for IP ${ip}.`);
        const loginAudits = await prisma.auditLog.findMany({
            where: {
                ipAddress: ip,
                action: 'LOGIN'
            },
            orderBy: { createdAt: 'desc' },
            take: 10
        });
        console.log(`Found ${loginAudits.length} logins from this IP (even if null email in record, checking metadata if available).`);
        loginAudits.forEach(l => console.log(`- Time: ${l.createdAt.toISOString()} | User: ${l.userEmail} | Metadata: ${JSON.stringify(l.metadata)}`));
    }
    else {
        console.log(`✅ Found users for IP ${ip}:`);
        const users = new Set(audits.map(a => a.userEmail));
        users.forEach(u => console.log(`- ${u}`));
        console.log(`\nDetail:`);
        audits.forEach(a => {
            console.log(`- ${a.createdAt.toISOString()} | User: ${a.userEmail} | Action: ${a.action}`);
        });
    }
}
findUserByIP()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=find_user_from_ip.js.map