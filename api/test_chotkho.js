const { PrismaClient } = require('./node_modules/@prisma/client');

async function checkChotkho() {
    console.log("=== KIỂM TRA DỮ LIỆU CHỐT KHO MỚI NHẤT ===");
    const prisma = new PrismaClient();

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 1. Kiểm tra bảng Chotkho
        console.log("\n1. Bảng Chotkho (Master):");
        const recentChotkho = await prisma.chotkho.findMany({
            where: {
                createdAt: {
                    gte: today
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                _count: {
                    select: { details: true }
                }
            }
        });

        if (recentChotkho.length > 0) {
            console.log(`✅ Tìm thấy ${recentChotkho.length} đợt chốt kho hôm nay!`);
            for (const ck of recentChotkho) {
                console.log(`- ID: ${ck.id}`);
                console.log(`- Ngày tạo: ${ck.createdAt.toLocaleString('vi-VN')}`);
                console.log(`- Số lượng chi tiết (sản phẩm): ${ck._count.details}`);
                console.log(`- Ghi chú: ${ck.ghichu}`);
                console.log('---');
            }
        } else {
            console.log("❌ Không tìm thấy đợt chốt kho nào được tạo hôm nay.");
        }

        // 2. Kiểm tra Audit Log
        console.log("\n2. Bảng AuditLog (Truy vết):");
        const recentAudit = await prisma.auditLog.findMany({
            where: {
                entityName: 'Chotkho',
                createdAt: {
                    gte: today
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 5
        });

        if (recentAudit.length > 0) {
            console.log(`✅ Tìm thấy ${recentAudit.length} log tạo/sửa Chốt kho hôm nay!`);
            for (const log of recentAudit) {
                console.log(`- Action: ${log.action}`);
                console.log(`- Entity: ${log.entityName} (${log.entityId})`);
                console.log(`- Time: ${log.createdAt.toLocaleString('vi-VN')}`);
                console.log('---');
            }
        } else {
            console.log("❌ Không tìm thấy AuditLog nào cho Chotkho hôm nay.");
        }

    } catch (error) {
        console.error("Lỗi:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkChotkho();
