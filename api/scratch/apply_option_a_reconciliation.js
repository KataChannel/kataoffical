const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { randomUUID } = require('crypto');
const { Decimal } = require('@prisma/client/runtime/library');

async function main() {
    const dbName = await prisma.$queryRawUnsafe('SELECT current_database()');
    console.log('Database đang kết nối:', dbName);

    const chotkhos = await prisma.chotkho.findMany({
        where: { ngaychot: { gte: new Date('2026-05-26T00:00:00.000Z') } },
        select: { id: true, title: true, ngaychot: true }
    });
    console.log('Các phiên chốt kho ngày 26/05 trong DB này:', chotkhos);

    const khoId = '4cc01811-61f5-4bdc-83de-a493764e9258'; // KHO - HCM
    const idI100263 = 'c93aee72-537b-40e4-92c1-6d032f411d63';
    const idI100259 = '38c1e9df-c67b-4cc0-9df1-2c97f10f9325';

    if (chotkhos.length === 0) {
        console.warn('⚠️ Không tìm thấy bất kỳ phiên chốt kho nào ngày 26/05 trong DB này!');
        return;
    }

    const chotkhoId = chotkhos[0].id;
    console.log(`Bắt đầu chạy giao dịch đối soát Phương Án A cho ngày 26/05/2026 với Chotkho ID: ${chotkhoId}...`);

    await prisma.$transaction(async (tx) => {
        // 1. Tìm các bản ghi Chotkhodetail tương ứng
        console.log('Đang tìm kiếm dòng chốt chi tiết động trong phiên chốt 26/05...');
        const detailI100263 = await tx.chotkhodetail.findFirst({
            where: { chotkhoId: chotkhoId, sanphamId: idI100263 }
        });
        const detailI100259 = await tx.chotkhodetail.findFirst({
            where: { chotkhoId: chotkhoId, sanphamId: idI100259 }
        });

        if (!detailI100263) {
            console.warn('⚠️ Không tìm thấy dòng chốt chi tiết cho I100263 (Đậu hủ trứng Ichiban)');
        } else {
            console.log(`📌 Tìm thấy Chotkhodetail I100263 ID: ${detailI100263.id}`);
        }

        if (!detailI100259) {
            console.warn('⚠️ Không tìm thấy dòng chốt chi tiết cho I100259 (Đậu hủ miếng chiên)');
        } else {
            console.log(`📌 Tìm thấy Chotkhodetail I100259 ID: ${detailI100259.id}`);
        }

        // 2. Tạo mã phiếu xuất đối soát điều chỉnh
        const phieuKhoId = randomUUID();
        const maphieu = `PX-DOISOAT-26052026-${Date.now().toString().slice(-4)}`;

        console.log(`Đang tạo Phiếu xuất điều chỉnh: ${maphieu} (ID: ${phieuKhoId})...`);
        await tx.phieuKho.create({
            data: {
                id: phieuKhoId,
                maphieu: maphieu,
                type: 'xuat',
                khoId: khoId,
                createdAt: new Date('2026-05-26T12:00:00.000Z'),
                updatedAt: new Date('2026-05-26T12:00:00.000Z'),
                ngay: new Date('2026-05-26T12:00:00.000Z'),
                ghichu: 'Phiếu xuất đối soát điều chỉnh lệch tồn do Mirror Logic đơn TGNCC-SZ00097 (+15) và TGNCC-XG00001 (+20)',
                title: 'Xuất đối soát điều chỉnh tồn kho ngày 26/05',
                isChotkho: false,
                isActive: true
            }
        });

        // 3. Tạo chi tiết phiếu xuất điều chỉnh
        console.log('Đang tạo chi tiết phiếu xuất điều chỉnh...');
        await tx.phieuKhoSanpham.createMany({
            data: [
                {
                    id: randomUUID(),
                    phieuKhoId: phieuKhoId,
                    sanphamId: idI100263,
                    soluong: new Decimal(15),
                    ghichu: 'Đối soát giảm 15 do Mirror Logic đơn TGNCC-SZ00097'
                },
                {
                    id: randomUUID(),
                    phieuKhoId: phieuKhoId,
                    sanphamId: idI100259,
                    soluong: new Decimal(20),
                    ghichu: 'Đối soát giảm 20 do Mirror Logic đơn TGNCC-XG00001'
                }
            ]
        });

        // 4. Cập nhật tồn kho (SanphamKho) tại kho HCM về 0
        console.log('Đang đồng bộ tồn kho SanphamKho (HCM) về 0...');
        await tx.sanphamKho.update({
            where: { sanphamId_khoId: { sanphamId: idI100263, khoId: khoId } },
            data: { soluong: 0, updatedAt: new Date() }
        });
        await tx.sanphamKho.update({
            where: { sanphamId_khoId: { sanphamId: idI100259, khoId: khoId } },
            data: { soluong: 0, updatedAt: new Date() }
        });

        // 5. Cập nhật tồn kho toàn hệ thống (TonKho) về 0
        console.log('Đang đồng bộ tồn kho toàn hệ thống TonKho về 0...');
        await tx.tonKho.update({
            where: { sanphamId: idI100263 },
            data: { slton: 0, sltontt: 0, updatedAt: new Date() }
        });
        await tx.tonKho.update({
            where: { sanphamId: idI100259 },
            data: { slton: 0, sltontt: 0, updatedAt: new Date() }
        });

        // 6. Sửa dòng chốt kho ngày 26/05 (Chotkhodetail) về đúng bằng 0
        console.log('Đang sửa số liệu trong phiên chốt kho ngày 26/05 về đúng bằng 0...');
        if (detailI100263) {
            await tx.chotkhodetail.update({
                where: { id: detailI100263.id },
                data: {
                    sltonhethong: 0,
                    sltonthucte: 0,
                    chenhlech: 0,
                    ghichu: `Đã điều chỉnh đối soát về 0 theo Phiếu xuất điều chỉnh ${maphieu}`,
                    updatedAt: new Date()
                }
            });
        }
        if (detailI100259) {
            await tx.chotkhodetail.update({
                where: { id: detailI100259.id },
                data: {
                    sltonhethong: 0,
                    sltonthucte: 0,
                    chenhlech: 0,
                    ghichu: `Đã điều chỉnh đối soát về 0 theo Phiếu xuất điều chỉnh ${maphieu}`,
                    updatedAt: new Date()
                }
            });
        }

        console.log(`Giao dịch đối soát hoàn thành! Đã tạo thành công phiếu xuất điều chỉnh ${maphieu}.`);
    }, {
        timeout: 30000 // 30 seconds
    });
}

main().catch(e => {
    console.error('LỖI KHI ĐỐI SOÁT:', e);
    process.exit(1);
}).finally(() => prisma.$disconnect());
