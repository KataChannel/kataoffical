const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const prisma = new PrismaClient();

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function performBaselineChot20May() {
  try {
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 20-5 (2).xlsx';
    console.log(`--- Processing Baseline & Cleanup (OPTIMIZED BATCH MODE): ${filePath} ---`);
    
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
    // Tomorrow is 2026-05-21
    const tomorrowStart = new Date('2026-05-21T00:00:00+07:00');
    const baselineTime = new Date('2026-05-20T23:59:59+07:00');
    
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
    console.log(`(Orders with ngaygiao >= 2026-05-21 will be preserved as 'dadat')`);

    // 3. Create Master Chotkho
    const chotkhoMaster = await prisma.chotkho.create({
      data: {
        ngaychot: baselineTime,
        title: `Chốt kho Base Line 20-05-2026`,
        ghichu: 'Chốt kho Baseline theo file Ton-Huy 20-5 (2).xlsx - Không ảnh hưởng đơn ngày 21-05',
        khoId: KHO_TONG_ID,
        codeId: `CHOTKHO_BASELINE_2005_${Date.now()}`,
        isActive: true
      }
    });

    console.log(`Created master chotkho record: ${chotkhoMaster.id}`);

    // B. Update Products (Baseline Stock + Reset Pending for those NOT in future orders)
    const allProducts = await prisma.sanpham.findMany({
      include: {
        SanphamKho: { where: { khoId: KHO_TONG_ID } }
      }
    });
    
    // Get all remaining 'dadat' orders to calculate correct pending sl
    const futureDonhangItems = await prisma.donhangsanpham.findMany({
      where: { 
        donhang: { status: 'dadat', ngaygiao: { gte: tomorrowStart } } 
      }
    });
    
    const futureDathangItems = await prisma.dathangsanpham.findMany({
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

    const totalProducts = allProducts.length;

    // Prepare arrays for batch insertion and updates
    const chotkhodetailsToCreate = [];
    const excelProducts = [];
    const resetProducts = [];

    for (const sp of allProducts) {
      const maspKey = String(sp.masp).trim();
      const hasExcel = excelData.has(maspKey);
      const excelRow = hasExcel ? excelData.get(maspKey) : { slton: 0, slhuy: 0 };
      
      const sltonhethong = parseFloat(sp.SanphamKho[0]?.soluong) || 0;
      const sltonthucte = excelRow.slton;
      const slhuy = excelRow.slhuy;
      const chenhlech = sltonhethong - sltonthucte - slhuy;

      const slchogiao = pendingOutMap.get(sp.id) || 0;
      const slchonhap = pendingInMap.get(sp.id) || 0;

      // Add to details bulk list
      chotkhodetailsToCreate.push({
        chotkhoId: chotkhoMaster.id,
        sanphamId: sp.id,
        sltonhethong: sltonhethong,
        sltonthucte: sltonthucte,
        slhuy: slhuy,
        chenhlech: chenhlech,
        ngaychot: chotkhoMaster.ngaychot,
        ghichu: hasExcel ? 'Cập nhật từ Excel' : 'Tự động reset (không có trong Excel)'
      });

      const productInfo = {
        id: sp.id,
        masp: sp.masp,
        slton: sltonthucte,
        slhuy: slhuy,
        slchogiao,
        slchonhap
      };

      if (hasExcel) {
        excelProducts.push(productInfo);
      } else {
        resetProducts.push(productInfo);
      }
    }

    console.log(`Prepared detailed records. Excel products: ${excelProducts.length}, Reset products: ${resetProducts.length}.`);

    // Separate reset products into those with pending vs no pending quantities
    const resetSpIdsWithNoPending = [];
    const resetSpWithPending = [];

    resetProducts.forEach(p => {
      if (p.slchogiao === 0 && p.slchonhap === 0) {
        resetSpIdsWithNoPending.push(p.id);
      } else {
        resetSpWithPending.push(p);
      }
    });

    console.log(`Reset products split: ${resetSpIdsWithNoPending.length} with no pending, ${resetSpWithPending.length} with pending.`);

    // 4. TRANSACTION: Perform all updates in optimized batches
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

      // B. Bulk insert Chotkhodetail
      console.log("Bulk inserting Chotkhodetails...");
      await tx.chotkhodetail.createMany({
        data: chotkhodetailsToCreate
      });

      // C. Bulk reset products with no pending
      if (resetSpIdsWithNoPending.length > 0) {
        console.log("Bulk updating reset products with no pending...");
        await tx.sanphamKho.updateMany({
          where: { khoId: KHO_TONG_ID, sanphamId: { in: resetSpIdsWithNoPending } },
          data: { soluong: 0, updatedAt: new Date() }
        });

        await tx.tonKho.updateMany({
          where: { sanphamId: { in: resetSpIdsWithNoPending } },
          data: { slton: 0, sltontt: 0, slchogiao: 0, slchonhap: 0, updatedAt: new Date() }
        });
      }

      // D. Individual update for reset products WITH pending quantities (very few)
      if (resetSpWithPending.length > 0) {
        console.log(`Updating ${resetSpWithPending.length} reset products with pending quantities...`);
        for (const sp of resetSpWithPending) {
          await tx.sanphamKho.upsert({
            where: { sanphamId_khoId: { sanphamId: sp.id, khoId: KHO_TONG_ID } },
            create: { sanphamId: sp.id, khoId: KHO_TONG_ID, soluong: 0 },
            update: { soluong: 0, updatedAt: new Date() }
          });

          await tx.tonKho.upsert({
            where: { sanphamId: sp.id },
            create: {
              sanphamId: sp.id,
              slton: 0,
              sltontt: 0,
              slchogiao: sp.slchogiao,
              slchonhap: sp.slchonhap
            },
            update: {
              slton: 0,
              sltontt: 0,
              slchogiao: sp.slchogiao,
              slchonhap: sp.slchonhap,
              updatedAt: new Date()
            }
          });
        }
      }

      // E. Individual update for Excel products
      console.log(`Updating ${excelProducts.length} products from Excel...`);
      for (const sp of excelProducts) {
        await tx.sanphamKho.upsert({
          where: { sanphamId_khoId: { sanphamId: sp.id, khoId: KHO_TONG_ID } },
          create: { sanphamId: sp.id, khoId: KHO_TONG_ID, soluong: sp.slton },
          update: { soluong: sp.slton, updatedAt: new Date() }
        });

        await tx.tonKho.upsert({
          where: { sanphamId: sp.id },
          create: {
            sanphamId: sp.id,
            slton: sp.slton,
            sltontt: sp.slton,
            slchogiao: sp.slchogiao,
            slchonhap: sp.slchonhap
          },
          update: {
            slton: sp.slton,
            sltontt: sp.slton,
            slchogiao: sp.slchogiao, 
            slchonhap: sp.slchonhap, 
            updatedAt: new Date()
          }
        });
      }

    }, { timeout: 600000 }); 

    console.log('\n--- BASELINE 20-05 COMPLETE ---');
    console.log(`- Master Record ID: ${chotkhoMaster.id}`);
    console.log(`- Master Code ID: ${chotkhoMaster.codeId}`);
    console.log(`- Orders moved to 'choxuly' (Old/Today): ${backloggedDonhang.length + backloggedDathang.length}`);
    console.log(`- Total products in DB: ${totalProducts}`);
    console.log(`- Products updated from Excel: ${excelProducts.length}`);
    console.log(`- Products reset to 0 (not in Excel): ${resetProducts.length}`);
    console.log(`- Future pending slchogiao/slchonhap recalculated correctly.`);

    // Write report file
    const fs = require('fs');
    const reportPath = `/home/kata/Coding/rausachfinal/report/REPORT_CHOT_BASELINE_20052026.md`;
    const reportContent = `# Báo Cáo Chốt Baseline Tồn Kho - Ngày 20/05/2026

## 1. Thông Tin Chung
- **Thời gian thực hiện:** ${new Date().toLocaleString('vi-VN')} (Giờ hệ thống)
- **File nguồn:** \`doisoat/Ton-Huy 20-5 (2).xlsx\`
- **Kho thực hiện:** KHO - HCM (ID: \`4cc01811-61f5-4bdc-83de-a493764e9258\`)
- **Mục tiêu:** Thiết lập lại Baseline cho ngày 20/05/2026.

## 2. Kết Quả Thực Hiện

| Chỉ số | Kết quả | Ghi chú |
| :--- | :--- | :--- |
| **Tổng số sản phẩm trong DB** | **${totalProducts}** | Tất cả sản phẩm đều được xử lý |
| **Sản phẩm cập nhật từ Excel** | **${excelProducts.length}** | Lấy số liệu \`slton\` và \`slhuy\` từ file |
| **Sản phẩm reset về 0** | **${resetProducts.length}** | Các mã không có trong file Excel đối soát |
| **Đơn hàng chuyển về 'choxuly'** | **${backloggedDonhang.length + backloggedDathang.length}** | Đơn hàng tồn đọng/quá hạn tính đến hết ngày 20/05 |
| **Trạng thái giao dịch** | ✅ Thành công | Đã commit vào database |

## 3. Chi Tiết Kỹ Thuật
- **Master Record ID:** \`${chotkhoMaster.id}\`
- **Code ID:** \`${chotkhoMaster.codeId}\`
- **Các bảng dữ liệu đã cập nhật:**
    1.  \`Chotkho\`: Tạo phiên chốt mới cho ngày 20/05.
    2.  \`Chotkhodetail\`: Lưu chi tiết chênh lệch cho các sản phẩm.
    3.  \`SanphamKho\`: Cập nhật số lượng tồn thực tế.
    4.  \`TonKho\`: Cập nhật \`slton\`, \`sltontt\` và tính toán lại \`slchogiao\`, \`slchonhap\` dựa trên các đơn hàng tương lai (ngày 21/05 trở đi).

## 4. Ghi Chú Vận Hành
- Phiên chốt này đã giải quyết triệt để các vấn đề "Ghost Reservations" (tồn ảo dự phòng) và các đơn hàng cũ quá hạn.
- Hệ thống hiện đã ở trạng thái Baseline sạch cho ngày mới 21/05/2026.

---
*Báo cáo được thực hiện tự động bởi Antigravity AI - 20/05/2026*
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

performBaselineChot20May();
