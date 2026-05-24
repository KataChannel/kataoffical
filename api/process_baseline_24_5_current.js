const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const XLSX = require('xlsx');
const fs = require('fs');
const { Decimal } = require('@prisma/client/runtime/library');

async function main() {
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 24-5.xlsx';
    const workbook = XLSX.readFile(filePath);
    const sheet1 = workbook.Sheets['sheet1'];
    const data = XLSX.utils.sheet_to_json(sheet1);

    const khoId = '4cc01811-61f5-4bdc-83de-a493764e9258'; // KHO - HCM
    
    // Dynamic cutoff for "this current moment"
    const cutoff = new Date();

    console.log(`Starting Current Moment Baseline Process for 24/05/2026 at Cut-off: ${cutoff.toLocaleString('vi-VN')}`);

    // 1. Map Excel data
    const excelMap = new Map();
    for (const row of data) {
        if (row.masp) {
            excelMap.set(row.masp.toString().trim(), {
                slton: parseFloat(row.slton) || 0,
                slhuy: parseFloat(row.slhuy) || 0
            });
        }
    }

    // 2. Fetch all products
    console.log('Fetching all products from DB...');
    const allProducts = await prisma.sanpham.findMany({
        include: {
            SanphamKho: {
                where: { khoId: khoId }
            }
        }
    });

    const details = [];
    let excelProductsCount = 0;
    let resetProductsCount = 0;

    for (const p of allProducts) {
        const excelData = excelMap.get(p.masp);
        const sltonthucte = excelData ? excelData.slton : 0; // Reset to 0 if not in file
        const slhuy = excelData ? excelData.slhuy : 0;
        const sltonhethong = Number(p.SanphamKho[0]?.soluong || 0);
        const giagoc = Number(p.giagoc) || 0;

        if (excelData) {
            excelProductsCount++;
        } else {
            resetProductsCount++;
        }

        details.push({
            sanphamId: p.id,
            masp: p.masp,
            sltonhethong,
            sltonthucte,
            slhuy,
            giagoc
        });
    }

    console.log(`Prepared ${details.length} products. Products from Excel matched: ${excelProductsCount}. Resetting ${resetProductsCount} others to 0.`);

    let dhCount = 0;
    let dthCount = 0;
    let chotkhoMasterId = '';
    let chotkhoMasterCode = '';

    await prisma.$transaction(async (tx) => {
        // 3. Update pending orders to 'choxuly' (dadat, dagiao) before current cutoff
        const dhUpdate = await tx.donhang.updateMany({
            where: {
                createdAt: { lt: cutoff },
                status: { in: ['dadat', 'dagiao'] }
            },
            data: { status: 'choxuly', updatedAt: new Date() }
        });
        dhCount = dhUpdate.count;
        console.log(`Updated ${dhCount} Donhang to 'choxuly'.`);

        const dthUpdate = await tx.dathang.updateMany({
            where: {
                createdAt: { lt: cutoff },
                status: { in: ['dadat', 'dagiao'] }
            },
            data: { status: 'choxuly', updatedAt: new Date() }
        });
        dthCount = dthUpdate.count;
        console.log(`Updated ${dthCount} Dathang to 'choxuly'.`);

        // 4. Create Chotkho Master
        chotkhoMasterCode = `BASELINE_CURRENT_24052026_${Date.now()}`;
        const chotkhoMaster = await tx.chotkho.create({
            data: {
                ngaychot: cutoff,
                title: `Chốt kho Base Line 24-05-2026 (Thời điểm hiện tại)`,
                ghichu: `Chốt kho Baseline tại thời điểm hiện tại (${cutoff.toLocaleTimeString('vi-VN')}) theo yêu cầu. Reset tồn về 0 cho sản phẩm không có trong file.`,
                khoId: khoId,
                codeId: chotkhoMasterCode,
                isActive: true,
                isLocked: true,
                lockedAt: new Date()
            }
        });
        chotkhoMasterId = chotkhoMaster.id;
        console.log(`Created Chotkho Master: ${chotkhoMasterId}`);

        // 5. Create Details and Update Stock
        const detailRecords = details.map(d => {
            const chenhlech = d.sltonhethong - d.sltonthucte - d.slhuy;
            const giaTriChenhLech = chenhlech * d.giagoc;
            const giaTriHuy = d.slhuy * d.giagoc;

            return {
                chotkhoId: chotkhoMasterId,
                sanphamId: d.sanphamId,
                sltonhethong: new Decimal(d.sltonhethong),
                sltonthucte: new Decimal(d.sltonthucte),
                slhuy: new Decimal(d.slhuy),
                chenhlech: new Decimal(chenhlech),
                giaGocSnapshot: new Decimal(d.giagoc),
                giaTriChenhLech: new Decimal(giaTriChenhLech),
                giaTriHuy: new Decimal(giaTriHuy),
                ngaychot: cutoff,
                ghichu: excelMap.has(d.masp) ? 'Chốt kho Baseline hiện tại từ file Ton-Huy 24-5.xlsx' : 'Tự động reset về 0 tại thời điểm hiện tại (không có trong file đối soát)'
            };
        });

        // Prisma createMany is faster
        await tx.chotkhodetail.createMany({
            data: detailRecords
        });
        console.log(`Created ${detailRecords.length} Chotkhodetail records.`);

        // 6. Update Stock levels
        for (const d of details) {
            // Update SanphamKho (HCM)
            await tx.sanphamKho.upsert({
                where: { sanphamId_khoId: { sanphamId: d.sanphamId, khoId: khoId } },
                create: { sanphamId: d.sanphamId, khoId: khoId, soluong: new Decimal(d.sltonthucte) },
                update: { soluong: new Decimal(d.sltonthucte), updatedAt: new Date() }
            });

            // Update TonKho (Global)
            await tx.tonKho.upsert({
                where: { sanphamId: d.sanphamId },
                create: { sanphamId: d.sanphamId, slton: new Decimal(d.sltonthucte), sltontt: new Decimal(d.sltonthucte) },
                update: { slton: new Decimal(d.sltonthucte), sltontt: new Decimal(d.sltonthucte), updatedAt: new Date() }
            });
        }
        console.log('Stock levels (SanphamKho and TonKho) updated successfully for all products.');

    }, {
        timeout: 600000 // 10 minutes
    });

    console.log('Full Baseline Process COMPLETED Successfully.');

    // 7. Write Report File
    const reportPath = '/home/kata/Coding/rausachfinal/report/REPORT_CHOT_BASELINE_24052026_CURRENT.md';
    const reportContent = `# Báo Cáo Chốt Baseline Tồn Kho - Ngày 24/05/2026 (Tại Thời Điểm Hiện Tại)

## 1. Thông Tin Chung
- **Thời gian thực hiện:** ${new Date().toLocaleString('vi-VN')} (Giờ hệ thống)
- **File nguồn:** \`doisoat/Ton-Huy 24-5.xlsx\`
- **Kho thực hiện:** KHO - HCM (ID: \`4cc01811-61f5-4bdc-83de-a493764e9258\`)
- **Mục tiêu:** Thiết lập lại Baseline tại thời điểm hiện tại của ngày 24/05/2026.
- **Thời điểm cut-off:** ${cutoff.toLocaleString('vi-VN')} (Giao dịch trước thời điểm hiện tại)

## 2. Kết Quả Thực Hiện

| Chỉ số | Kết quả | Ghi chú |
| :--- | :--- | :--- |
| **Tổng số sản phẩm trong DB** | **${allProducts.length}** | Tất cả sản phẩm đều được xử lý |
| **Sản phẩm cập nhật từ Excel** | **${excelProductsCount}** | Lấy số lượng \`slton\` và \`slhuy\` từ file Excel đối soát |
| **Sản phẩm reset về 0** | **${resetProductsCount}** | Các mã sản phẩm không xuất hiện trong file Excel |
| **Đơn hàng chuyển về 'choxuly' (Đơn hàng)** | **${dhCount}** | Các đơn hàng tồn đọng có trạng thái \`dadat\` hoặc \`dagiao\` trước ${cutoff.toLocaleTimeString('vi-VN')} |
| **Đơn hàng chuyển về 'choxuly' (Đặt hàng)** | **${dthCount}** | Các phiếu đặt hàng tồn đọng tương tự |
| **Trạng thái giao dịch** | ✅ Thành công | Đã commit vào database thông qua Transaction |

## 3. Chi Tiết Kỹ Thuật
- **Master Record ID:** \`${chotkhoMasterId}\`
- **Code ID:** \`${chotkhoMasterCode}\`
- **Các bảng dữ liệu đã cập nhật:**
    1.  \`Chotkho\`: Tạo phiên chốt mới cho ngày 24/05/2026 (tại thời điểm hiện tại).
    2.  \`Chotkhodetail\`: Lưu chi tiết chênh lệch và hủy của toàn bộ sản phẩm.
    3.  \`SanphamKho\`: Đồng bộ số lượng tồn thực tế cho Kho HCM.
    4.  \`TonKho\`: Cập nhật \`slton\`, \`sltontt\` cho toàn hệ thống.

## 4. Ghi Chú Vận Hành
- Phiên chốt này giúp giải quyết triệt để tồn kho giữ chỗ và các đơn hàng phát sinh ngay tại thời điểm hiện tại ngày 24/05/2026.
- Dữ liệu tồn kho chính thức đã đồng bộ hoàn hảo với kiểm kê vật lý.

---
*Báo cáo được thực hiện tự động bởi Antigravity AI - 24/05/2026*
`;

    fs.writeFileSync(reportPath, reportContent, 'utf8');
    console.log(`Report written successfully to ${reportPath}`);
}

main().catch(e => {
    console.error('FAILED:', e);
    process.exit(1);
}).finally(() => prisma.$disconnect());
