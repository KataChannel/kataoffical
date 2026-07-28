const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const prisma = new PrismaClient();

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function performBaselineChot17May() {
  try {
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 17-5.xlsx';
    console.log(`--- Processing Baseline & Cleanup: ${filePath} ---`);
    
    // 1. Read Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = 'sheet1'; 
    const worksheet = workbook.Sheets[sheetName];
    const excelRows = XLSX.utils.sheet_to_json(worksheet);
    
    const excelData = new Map();
    excelRows.forEach(row => {
      if (row.masp) {
        excelData.set(String(row.masp).trim(), {
          slton: parseFloat(row.slton) || 0,
          slhuy: parseFloat(row.slhuy) || 0
        });
      }
    });

    console.log(`Excel file loaded with ${excelData.size} products.`);

    // 2. Identify Backlogged Orders (Status 'dadat' that are NOT for tomorrow or later)
    // Tomorrow is 2026-05-18
    const tomorrowStart = new Date('2026-05-18T00:00:00+07:00');
    const baselineTime = new Date('2026-05-17T23:59:59+07:00');
    
    // Find Donhang with status 'dadat' that are NOT for tomorrow
    const backloggedDonhang = await prisma.donhang.findMany({
      where: { 
        status: 'dadat', 
        OR: [
          { ngaygiao: { lt: tomorrowStart } },
          { ngaygiao: null, createdAt: { lt: tomorrowStart } }
        ]
      },
      select: { id: true, madonhang: true, ngaygiao: true }
    });

    // Find Dathang with status 'dadat' that are NOT for tomorrow
    const backloggedDathang = await prisma.dathang.findMany({
      where: { 
        status: 'dadat', 
        OR: [
          { ngaynhan: { lt: tomorrowStart } },
          { ngaynhan: null, createdAt: { lt: tomorrowStart } }
        ]
      },
      select: { id: true, madncc: true, ngaynhan: true }
    });

    console.log(`Found ${backloggedDonhang.length} backlogged Donhang and ${backloggedDathang.length} Dathang to move to 'choxuly'.`);
    console.log(`(Orders with ngaygiao >= 2026-05-18 will be preserved as 'dadat')`);

    // 3. Create Master Chotkho
    const chotkhoMaster = await prisma.chotkho.create({
      data: {
        ngaychot: baselineTime,
        title: `Chốt kho Base Line 17-05-2026`,
        ghichu: 'Chốt kho Baseline theo file Ton-Huy 17-5.xlsx - Không ảnh hưởng đơn ngày 18-05',
        khoId: KHO_TONG_ID,
        codeId: `CHOTKHO_BASELINE_1705_${Date.now()}`,
        isActive: true
      }
    });

    console.log(`Created master chotkho record: ${chotkhoMaster.id}`);

    let totalProducts = 0;
    let excelProductsCount = 0;
    let resetProductsCount = 0;

    // 4. TRANSACTION: Perform all updates
    await prisma.$transaction(async (tx) => {
      
      // A. Move backlogged orders to 'choxuly'
      if (backloggedDonhang.length > 0) {
        await tx.donhang.updateMany({
          where: { id: { in: backloggedDonhang.map(o => o.id) } },
          data: { status: 'choxuly', updatedAt: new Date() }
        });
      }

      if (backloggedDathang.length > 0) {
        await tx.dathang.updateMany({
          where: { id: { in: backloggedDathang.map(o => o.id) } },
          data: { status: 'choxuly', updatedAt: new Date() }
        });
      }

      // B. Update Products (Baseline Stock + Reset Pending for those NOT in future orders)
      const allProducts = await tx.sanpham.findMany({
        include: {
          SanphamKho: { where: { khoId: KHO_TONG_ID } }
        }
      });
      
      // Get all remaining 'dadat' orders to calculate correct pending sl
      const futureDonhangItems = await tx.donhangsanpham.findMany({
        where: { 
          donhang: { status: 'dadat', ngaygiao: { gte: tomorrowStart } } 
        }
      });
      
      const futureDathangItems = await tx.dathangsanpham.findMany({
        where: { 
          dathang: { status: 'dadat', ngaynhan: { gte: tomorrowStart } } 
        }
      });

      const pendingOutMap = new Map();
      futureDonhangItems.forEach(item => {
        const idSP = item.idSP || item.sanphamId; // safety fallback for relation field names
        if (idSP) {
          const current = pendingOutMap.get(idSP) || 0;
          pendingOutMap.set(idSP, current + (parseFloat(item.slnhan) || parseFloat(item.slgiao) || parseFloat(item.sldat) || 0));
        }
      });

      const pendingInMap = new Map();
      futureDathangItems.forEach(item => {
        const idSP = item.idSP || item.sanphamId; // safety fallback for relation field names
        if (idSP) {
          const current = pendingInMap.get(idSP) || 0;
          pendingInMap.set(idSP, current + (parseFloat(item.slnhan) || parseFloat(item.slgiao) || parseFloat(item.sldat) || 0));
        }
      });

      totalProducts = allProducts.length;

      for (const sp of allProducts) {
        const maspKey = String(sp.masp).trim();
        const hasExcel = excelData.has(maspKey);
        const excelRow = hasExcel ? excelData.get(maspKey) : { slton: 0, slhuy: 0 };
        
        if (hasExcel) excelProductsCount++;
        else resetProductsCount++;

        const sltonhethong = parseFloat(sp.SanphamKho[0]?.soluong) || 0;
        const sltonthucte = excelRow.slton;
        const slhuy = excelRow.slhuy;
        const chenhlech = sltonhethong - sltonthucte - slhuy;

        const slchogiao = pendingOutMap.get(sp.id) || 0;
        const slchonhap = pendingInMap.get(sp.id) || 0;

        // Create Chotkhodetail
        await tx.chotkhodetail.create({
          data: {
            chotkhoId: chotkhoMaster.id,
            sanphamId: sp.id,
            sltonhethong: sltonhethong,
            sltonthucte: sltonthucte,
            slhuy: slhuy,
            chenhlech: chenhlech,
            ngaychot: chotkhoMaster.ngaychot,
            ghichu: hasExcel ? 'Cập nhật từ Excel' : 'Tự động reset (không có trong Excel)'
          }
        });

        // Update SanphamKho
        await tx.sanphamKho.upsert({
          where: { sanphamId_khoId: { sanphamId: sp.id, khoId: KHO_TONG_ID } },
          create: { sanphamId: sp.id, khoId: KHO_TONG_ID, soluong: sltonthucte },
          update: { soluong: sltonthucte, updatedAt: new Date() }
        });

        // Update TonKho
        await tx.tonKho.upsert({
          where: { sanphamId: sp.id },
          create: {
            sanphamId: sp.id,
            slton: sltonthucte,
            sltontt: sltonthucte,
            slchogiao: slchogiao,
            slchonhap: slchonhap
          },
          update: {
            slton: sltonthucte,
            sltontt: sltonthucte,
            slchogiao: slchogiao, 
            slchonhap: slchonhap, 
            updatedAt: new Date()
          }
        });
      }

    }, { timeout: 600000 }); 

    console.log('\n--- BASELINE 17-05 COMPLETE ---');
    console.log(`- Master Record ID: ${chotkhoMaster.id}`);
    console.log(`- Master Code ID: ${chotkhoMaster.codeId}`);
    console.log(`- Orders moved to 'choxuly' (Old/Today): ${backloggedDonhang.length + backloggedDathang.length}`);
    console.log(`- Total products in DB: ${totalProducts}`);
    console.log(`- Products updated from Excel: ${excelProductsCount}`);
    console.log(`- Products reset to 0 (not in Excel): ${resetProductsCount}`);
    console.log(`- Future pending slchogiao/slchonhap recalculated correctly.`);

    // Write report file
    const fs = require('fs');
    const reportPath = `/home/kata/Coding/rausachfinal/report/REPORT_CHOT_BASELINE_17052026.md`;
    const reportContent = `# Báo Cáo Chốt Baseline Tồn Kho - Ngày 17/05/2026

## 1. Thông Tin Chung
- **Thời gian thực hiện:** ${new Date().toLocaleString('vi-VN')} (Giờ hệ thống)
- **File nguồn:** \`doisoat/Ton-Huy 17-5.xlsx\`
- **Kho thực hiện:** KHO - HCM (ID: \`4cc01811-61f5-4bdc-83de-a493764e9258\`)
- **Mục tiêu:** Thiết lập lại Baseline cho ngày 17/05/2026.

## 2. Kết Quả Thực Hiện

| Chỉ số | Kết quả | Ghi chú |
| :--- | :--- | :--- |
| **Tổng số sản phẩm trong DB** | **${totalProducts}** | Tất cả sản phẩm đều được xử lý |
| **Sản phẩm cập nhật từ Excel** | **${excelProductsCount}** | Lấy số liệu \`slton\` và \`slhuy\` từ file |
| **Sản phẩm reset về 0** | **${resetProductsCount}** | Các mã không có trong file Excel đối soát |
| **Đơn hàng chuyển về 'choxuly'** | **${backloggedDonhang.length + backloggedDathang.length}** | Đơn hàng tồn đọng/quá hạn tính đến hết ngày 17/05 |
| **Trạng thái giao dịch** | ✅ Thành công | Đã commit vào database |

## 3. Chi Tiết Kỹ Thuật
- **Master Record ID:** \`${chotkhoMaster.id}\`
- **Code ID:** \`${chotkhoMaster.codeId}\`
- **Các bảng dữ liệu đã cập nhật:**
    1.  \`Chotkho\`: Tạo phiên chốt mới cho ngày 17/05.
    2.  \`Chotkhodetail\`: Lưu chi tiết chênh lệch cho các sản phẩm.
    3.  \`SanphamKho\`: Cập nhật số lượng tồn thực tế.
    4.  \`TonKho\`: Cập nhật \`slton\`, \`sltontt\` và tính toán lại \`slchogiao\`, \`slchonhap\` dựa trên các đơn hàng tương lai (ngày 18/05 trở đi).

## 4. Ghi Chú Vận Hành
- Phiên chốt này đã giải quyết triệt để các vấn đề "Ghost Reservations" (tồn ảo dự phòng) và các đơn hàng cũ quá hạn.
- Hệ thống hiện đã ở trạng thái Baseline sạch cho ngày mới 18/05/2026.

---
*Báo cáo được thực hiện tự động bởi Antigravity AI - 17/05/2026*
`;
    fs.writeFileSync(reportPath, reportContent, 'utf8');
    console.log(`Report written to ${reportPath}`);

  } catch (error) {
    console.error('Error during baseline chot:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

performBaselineChot17May();
