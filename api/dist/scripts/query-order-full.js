"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const dathang = await prisma.dathang.findFirst({
        where: { madncc: 'TGNCC-JK00005' },
        include: {
            nhacungcap: true,
            sanpham: {
                include: {
                    sanpham: true
                }
            },
            kho: true,
            PhieuKho: true
        }
    });
    console.log('=== ĐƠN ĐẶT HÀNG NCC CHI TIẾT ===');
    if (dathang) {
        console.log('--- Thông tin chung ---');
        console.log(JSON.stringify({
            id: dathang.id,
            madncc: dathang.madncc,
            title: dathang.title,
            type: dathang.type,
            ngaynhan: dathang.ngaynhan,
            status: dathang.status,
            ghichu: dathang.ghichu,
            isActive: dathang.isActive,
            createdAt: dathang.createdAt,
            updatedAt: dathang.updatedAt,
            nhacungcap: dathang.nhacungcap,
            kho: dathang.kho,
        }, null, 2));
        console.log('\n--- Danh sách sản phẩm ---');
        dathang.sanpham.forEach((sp, index) => {
            console.log(`${index + 1}. ${sp.sanpham.title} (${sp.sanpham.masp})`);
            console.log(`   - SL đặt: ${sp.sldat}, SL giao: ${sp.slgiao}, SL nhận: ${sp.slnhan}, SL hủy: ${sp.slhuy}`);
            console.log(`   - Giá nhập: ${sp.gianhap}`);
        });
        console.log('\n--- Phiếu kho liên quan ---');
        console.log(JSON.stringify(dathang.PhieuKho, null, 2));
    }
    if (dathang) {
        const allAuditLogs = await prisma.auditLog.findMany({
            where: {
                entityId: dathang.id
            },
            orderBy: { createdAt: 'asc' },
            include: {
                user: {
                    select: { email: true, name: true }
                }
            }
        });
        console.log('\n=== LỊCH SỬ HOẠT ĐỘNG (AUDIT LOGS) ===');
        allAuditLogs.forEach((log, index) => {
            console.log(`\n--- Log ${index + 1} ---`);
            console.log(`ID: ${log.id}`);
            console.log(`Action: ${log.action}`);
            console.log(`Entity: ${log.entityName}`);
            console.log(`User: ${log.user?.email || log.userEmail || 'N/A'}`);
            console.log(`IP: ${log.ipAddress}`);
            console.log(`Time: ${log.createdAt}`);
            console.log(`Status: ${log.status}`);
            if (log.metadata) {
                console.log(`Metadata: ${JSON.stringify(log.metadata)}`);
            }
        });
        const phieuKhos = await prisma.phieuKho.findMany({
            where: {
                dathangId: dathang.id
            },
            include: {
                sanpham: {
                    include: {
                        sanpham: true
                    }
                },
                kho: true
            }
        });
        console.log('\n=== PHIẾU KHO LIÊN QUAN ===');
        console.log(JSON.stringify(phieuKhos, null, 2));
    }
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=query-order-full.js.map