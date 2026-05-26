const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { randomUUID } = require('crypto');
const { Decimal } = require('@prisma/client/runtime/library');

async function main() {
    const khoId = '4cc01811-61f5-4bdc-83de-a493764e9258'; // KHO - HCM

    const dbName = await prisma.$queryRawUnsafe('SELECT current_database()');
    console.log('Database đang kết nối:', dbName);

    // 1. Tìm phiên chốt kho gần nhất của ngày 26/05
    console.log('Đang tìm phiên chốt kho ngày 26/05...');
    const chotkhosToday = await prisma.chotkho.findMany({
        where: {
            khoId: khoId,
            ngaychot: {
                gte: new Date('2026-05-26T00:00:00.000Z'),
                lte: new Date('2026-05-26T23:59:59.999Z')
            }
        },
        orderBy: { ngaychot: 'desc' }
    });

    if (chotkhosToday.length === 0) {
        console.error('❌ Không tìm thấy phiên chốt kho nào cho ngày 26/05/2026.');
        return;
    }
    const todayChot = chotkhosToday[0];
    const todayChotId = todayChot.id;
    const todayChotTime = todayChot.ngaychot;
    console.log(`📌 Phiên chốt kho hôm nay: ID=${todayChotId}, ngaychot=${todayChotTime.toISOString()}`);

    // 2. Tìm phiên chốt kho gần nhất của ngày 25/05 (Tồn đầu ngày 26)
    console.log('Đang tìm phiên chốt kho ngày 25/05 làm tồn đầu...');
    const chotkhosYesterday = await prisma.chotkho.findMany({
        where: {
            khoId: khoId,
            ngaychot: {
                gte: new Date('2026-05-25T00:00:00.000Z'),
                lte: new Date('2026-05-25T23:59:59.999Z')
            }
        },
        orderBy: { ngaychot: 'desc' }
    });

    if (chotkhosYesterday.length === 0) {
        console.error('❌ Không tìm thấy phiên chốt kho nào cho ngày 25/05/2026.');
        return;
    }
    const yesterdayChot = chotkhosYesterday[0];
    const yesterdayChotId = yesterdayChot.id;
    const yesterdayChotTime = yesterdayChot.ngaychot;
    console.log(`📌 Phiên chốt kho tồn đầu (25/05): ID=${yesterdayChotId}, ngaychot=${yesterdayChotTime.toISOString()}`);

    // 3. Lấy tồn đầu (25/05) của tất cả sản phẩm
    console.log('Đang lấy số liệu tồn đầu từ phiên chốt 25/05...');
    const tondauDetails = await prisma.chotkhodetail.findMany({
        where: { chotkhoId: yesterdayChotId }
    });
    const tondauMap = new Map();
    for (const d of tondauDetails) {
        if (d.sanphamId) {
            tondauMap.set(d.sanphamId, Number(d.sltonthucte || 0));
        }
    }

    // 4. Lấy tổng số lượng nhập kho tại HCM trong ngày 26/05 (từ mốc chốt 25/05 đến mốc chốt 26/05)
    console.log('Đang tính toán lượng nhập kho HCM trong ngày 26/05...');
    const nhaps = await prisma.phieuKhoSanpham.findMany({
        where: {
            phieuKho: {
                khoId: khoId,
                type: 'nhap',
                createdAt: {
                    gt: yesterdayChotTime,
                    lte: todayChotTime
                }
            }
        },
        include: { phieuKho: true }
    });
    const nhapMap = new Map();
    for (const n of nhaps) {
        const qty = Number(n.soluong || 0);
        nhapMap.set(n.sanphamId, (nhapMap.get(n.sanphamId) || 0) + qty);
    }

    // 5. Lấy tổng số lượng xuất kho tại HCM trong ngày 26/05
    console.log('Đang tính toán lượng xuất kho HCM trong ngày 26/05...');
    const xuats = await prisma.phieuKhoSanpham.findMany({
        where: {
            phieuKho: {
                khoId: khoId,
                type: 'xuat',
                createdAt: {
                    gt: yesterdayChotTime,
                    lte: todayChotTime
                }
            }
        },
        include: { phieuKho: true }
    });
    const xuatMap = new Map();
    for (const x of xuats) {
        const qty = Number(x.soluong || 0);
        xuatMap.set(x.sanphamId, (xuatMap.get(x.sanphamId) || 0) + qty);
    }

    // 6. Lấy số lượng chốt hệ thống hôm nay
    console.log('Đang lấy số liệu chốt hệ thống hôm nay...');
    const todayDetails = await prisma.chotkhodetail.findMany({
        where: { chotkhoId: todayChotId }
    });

    // 7. Lấy danh sách sản phẩm để dịch mã
    const products = await prisma.sanpham.findMany();
    const productMap = new Map();
    for (const p of products) {
        productMap.set(p.id, p);
    }

    // 8. Phân tích chênh lệch
    console.log('Đang phân tích chênh lệch cho từng sản phẩm...');
    const exportAdjustments = []; // Những sản phẩm cần giảm tồn (discrepancy > 0)
    const importAdjustments = []; // Những sản phẩm cần tăng tồn (discrepancy < 0)

    for (const d of todayDetails) {
        const spId = d.sanphamId;
        if (!spId) continue;

        const p = productMap.get(spId);
        if (!p) continue;

        const tondau = tondauMap.get(spId) || 0;
        const nhap = nhapMap.get(spId) || 0;
        const xuat = xuatMap.get(spId) || 0;
        const calStock = tondau + nhap - xuat;
        const sysStock = Number(d.sltonhethong || 0);

        const discrepancy = Number((sysStock - calStock).toFixed(3));

        if (discrepancy !== 0) {
            const adjInfo = {
                sanphamId: spId,
                masp: p.masp,
                name: p.title,
                chotDetailId: d.id,
                tondau,
                nhap,
                xuat,
                calStock,
                sysStock,
                discrepancy
            };

            if (discrepancy > 0) {
                exportAdjustments.push(adjInfo);
            } else {
                importAdjustments.push(adjInfo);
            }
        }
    }

    console.log(`📊 Kết quả rà soát: Phát hiện ${exportAdjustments.length + importAdjustments.length} sản phẩm bị chênh lệch tồn do Mirror Logic.`);
    console.log(`   - Cần GIẢM tồn kho (Tạo phiếu xuất đối soát): ${exportAdjustments.length} sản phẩm`);
    console.log(`   - Cần TĂNG tồn kho (Tạo phiếu nhập đối soát): ${importAdjustments.length} sản phẩm`);

    if (exportAdjustments.length === 0 && importAdjustments.length === 0) {
        console.log('✅ Hệ thống hoàn toàn khớp! Không cần xử lý đối soát.');
        return;
    }

    // 9. Thực thi Phương Án A trong một Giao dịch duy nhất
    console.log('Đang thực thi các phiếu đối soát và cập nhật kho ngầm...');
    await prisma.$transaction(async (tx) => {
        const timestamp = Date.now().toString().slice(-4);

        // 9.1. Tạo Phiếu Xuất Đối Soát nếu có
        if (exportAdjustments.length > 0) {
            const phieuXuatId = randomUUID();
            const maphieuXuat = `PX-DOISOAT-26052026-${timestamp}`;
            console.log(`📦 Đang tạo Phiếu xuất điều chỉnh: ${maphieuXuat}...`);

            await tx.phieuKho.create({
                data: {
                    id: phieuXuatId,
                    maphieu: maphieuXuat,
                    type: 'xuat',
                    khoId: khoId,
                    createdAt: new Date('2026-05-26T12:00:00.000Z'),
                    updatedAt: new Date('2026-05-26T12:00:00.000Z'),
                    ngay: new Date('2026-05-26T12:00:00.000Z'),
                    ghichu: `Phiếu xuất đối soát điều chỉnh giảm tồn do Mirror Logic từ kho chi nhánh (${exportAdjustments.length} sản phẩm)`,
                    title: 'Xuất đối soát điều chỉnh tồn kho ngày 26/05',
                    isChotkho: false,
                    isActive: true
                }
            });

            await tx.phieuKhoSanpham.createMany({
                data: exportAdjustments.map(adj => ({
                    id: randomUUID(),
                    phieuKhoId: phieuXuatId,
                    sanphamId: adj.sanphamId,
                    soluong: new Decimal(adj.discrepancy),
                    ghichu: `Đối soát giảm ${adj.discrepancy} do Mirror Logic (Hệ thống: ${adj.sysStock} -> Thực tế: ${adj.calStock})`
                }))
            });

            console.log(`✅ Đã thêm ${exportAdjustments.length} sản phẩm vào phiếu xuất điều chỉnh ${maphieuXuat}.`);
        }

        // 9.2. Tạo Phiếu Nhập Đối Soát nếu có
        if (importAdjustments.length > 0) {
            const phieuNhapId = randomUUID();
            const maphieuNhap = `PN-DOISOAT-26052026-${timestamp}`;
            console.log(`📦 Đang tạo Phiếu nhập điều chỉnh: ${maphieuNhap}...`);

            await tx.phieuKho.create({
                data: {
                    id: phieuNhapId,
                    maphieu: maphieuNhap,
                    type: 'nhap',
                    khoId: khoId,
                    createdAt: new Date('2026-05-26T12:00:00.000Z'),
                    updatedAt: new Date('2026-05-26T12:00:00.000Z'),
                    ngay: new Date('2026-05-26T12:00:00.000Z'),
                    ghichu: `Phiếu nhập đối soát điều chỉnh tăng tồn do Mirror Logic từ kho chi nhánh (${importAdjustments.length} sản phẩm)`,
                    title: 'Nhập đối soát điều chỉnh tồn kho ngày 26/05',
                    isChotkho: false,
                    isActive: true
                }
            });

            await tx.phieuKhoSanpham.createMany({
                data: importAdjustments.map(adj => ({
                    id: randomUUID(),
                    phieuKhoId: phieuNhapId,
                    sanphamId: adj.sanphamId,
                    soluong: new Decimal(Math.abs(adj.discrepancy)),
                    ghichu: `Đối soát tăng ${Math.abs(adj.discrepancy)} do Mirror Logic (Hệ thống: ${adj.sysStock} -> Thực tế: ${adj.calStock})`
                }))
            });

            console.log(`✅ Đã thêm ${importAdjustments.length} sản phẩm vào phiếu nhập điều chỉnh ${maphieuNhap}.`);
        }

        // 9.3. Cập nhật tồn kho (SanphamKho & TonKho) & Sửa Chotkhodetail về đúng calStock cho TOÀN BỘ sản phẩm lệch
        const allAdjustments = [...exportAdjustments, ...importAdjustments];
        console.log('Đang đồng bộ tồn kho vật lý và cập nhật phiên chốt kho ngày 26/05...');

        for (const adj of allAdjustments) {
            const targetStock = adj.calStock < 0 ? 0 : adj.calStock; // Đảm bảo không âm kho vật lý

            // Cập nhật SanphamKho (HCM)
            await tx.sanphamKho.upsert({
                where: { sanphamId_khoId: { sanphamId: adj.sanphamId, khoId: khoId } },
                create: { sanphamId: adj.sanphamId, khoId: khoId, soluong: new Decimal(targetStock) },
                update: { soluong: new Decimal(targetStock), updatedAt: new Date() }
            });

            // Cập nhật TonKho (Global)
            await tx.tonKho.upsert({
                where: { sanphamId: adj.sanphamId },
                create: { sanphamId: adj.sanphamId, slton: new Decimal(targetStock), sltontt: new Decimal(targetStock) },
                update: { slton: new Decimal(targetStock), sltontt: new Decimal(targetStock), updatedAt: new Date() }
            });

            // Sửa Chotkhodetail về khớp calStock
            await tx.chotkhodetail.update({
                where: { id: adj.chotDetailId },
                data: {
                    sltonhethong: new Decimal(targetStock),
                    sltonthucte: new Decimal(targetStock),
                    chenhlech: new Decimal(0),
                    ghichu: `Đã điều chỉnh đối soát khớp tồn vật lý (Lệch do Mirror Logic: ${adj.discrepancy})`,
                    updatedAt: new Date()
                }
            });
        }

        console.log('✅ Đã đồng bộ tồn kho và khớp chốt chênh lệch thành công cho tất cả các sản phẩm!');
    }, {
        timeout: 60000 // 1 minute
    });

    console.log('🎉 TOÀN BỘ TIẾN TRÌNH ĐỐI SOÁT PHƯƠNG ÁN A HOÀN THÀNH XUẤT SẮC!');
}

main().catch(e => {
    console.error('LỖI KHI ĐỐI SOÁT DIỆN RỘNG:', e);
    process.exit(1);
}).finally(() => prisma.$disconnect());
