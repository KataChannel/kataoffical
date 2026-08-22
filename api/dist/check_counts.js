"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const moment = require("moment-timezone");
const prisma = new client_1.PrismaClient();
async function checkCounts() {
    const targetDate = '2026-01-30';
    const startOfDay = moment.tz(targetDate, 'Asia/Ho_Chi_Minh').startOf('day').toDate();
    const endOfDay = moment.tz(targetDate, 'Asia/Ho_Chi_Minh').endOf('day').toDate();
    console.log(`Checking for date: ${targetDate}`);
    console.log(`Range: ${startOfDay.toISOString()} to ${endOfDay.toISOString()}`);
    const [countCreatedAt, countNgaygiao, countNgaygiaoNotHuy] = await Promise.all([
        prisma.donhang.count({
            where: {
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                }
            }
        }),
        prisma.donhang.count({
            where: {
                ngaygiao: {
                    gte: startOfDay,
                    lte: endOfDay,
                }
            }
        }),
        prisma.donhang.count({
            where: {
                ngaygiao: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                status: { not: 'huy' }
            }
        })
    ]);
    console.log(`Count by createdAt: ${countCreatedAt}`);
    console.log(`Count by ngaygiao: ${countNgaygiao}`);
    console.log(`Count by ngaygiao (not huy): ${countNgaygiaoNotHuy}`);
}
checkCounts().finally(() => prisma.$disconnect());
//# sourceMappingURL=check_counts.js.map