const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258'; // KHO - HCM

const DB_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';

async function performBaselineChot06June() {
  const prisma = new PrismaClient({ datasources: { postgres: { url: DB_URL } } });

  try {
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 06-6 (1).xlsx';
    console.log(`--- Processing Baseline & Cleanup (06-06-2026) on rausachfinal DB ---`);
    console.log(`Excel file: ${filePath}`);
    
    // 1. Read Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = 'sheet1'; 
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      throw new Error(`Sheet "${sheetName}" not found in Excel file!`);
    }
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
    // Tomorrow is 2026-06-07
    const tomorrowStart = new Date('2026-06-07T00:00:00+07:00');
    const baselineTime = new Date('2026-06-06T23:59:59+07:00');
    
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

    // 3. Find old chotkho and vouchers dynamically to clean up (same day 06/06)
    const oldChotkhos = await prisma.chotkho.findMany({
      where: {
        ngaychot: {
          gte: new Date('2026-06-06T00:00:00+07:00'),
          lte: new Date('2026-06-06T23:59:59+07:00')
        }
      }
    });
    const oldChotkhoIds = oldChotkhos.map(c => c.id);
    console.log(`Found ${oldChotkhoIds.length} old chotkho record(s) to delete:`, oldChotkhos.map(c => c.title || c.id));

    const oldVouchers = await prisma.phieuKho.findMany({
      where: {
        maphieu: {
          contains: 'DOISOAT-06062026'
        }
      }
    });
    const oldVoucherIds = oldVouchers.map(v => v.id);
    console.log(`Found ${oldVoucherIds.length} old đối soát voucher(s) to delete:`, oldVouchers.map(v => v.maphieu));

    console.log("Preparing database update transaction...");

    // Create new master Chotkho record (data model preparation)
    const newChotkhoCodeId = `CHOTKHO_BASELINE_0606_${Date.now()}`;

    // Get all products to build details
    const allProducts = await prisma.sanpham.findMany({
      include: {
        SanphamKho: { where: { khoId: KHO_TONG_ID } }
      }
    });
    
    // Get all remaining 'dadat' orders to calculate correct pending sl (deliveries on 07/06 or later)
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
      const idSP = item.idSP || item.sanphamId; 
      if (idSP) {
        const current = pendingOutMap.get(idSP) || 0;
        pendingOutMap.set(idSP, current + (parseFloat(item.slnhan) || parseFloat(item.slgiao) || parseFloat(item.sldat) || 0));
      }
    });

    const pendingInMap = new Map();
    futureDathangItems.forEach(item => {
      const idSP = item.idSP || item.sanphamId; 
      if (idSP) {
        const current = pendingInMap.get(idSP) || 0;
        pendingInMap.set(idSP, current + (parseFloat(item.slnhan) || parseFloat(item.slgiao) || parseFloat(item.sldat) || 0));
      }
    });

    const processedProducts = new Map();
    const TARGET_THOM_XANH_MASP = 'I101127';

    // Phase 1: Basic classification and auto carry-over
    for (const sp of allProducts) {
      const maspKey = String(sp.masp).trim();
      const title = (sp.title || '').toLowerCase();
      const hasExcel = excelData.has(maspKey);
      const excelRow = hasExcel ? excelData.get(maspKey) : { slton: 0, slhuy: 0 };
      
      const sltonhethong = parseFloat(sp.SanphamKho[0]?.soluong) || 0;
      const slchogiao = pendingOutMap.get(sp.id) || 0;
      const slchonhap = pendingInMap.get(sp.id) || 0;

      // Define auto-carry groups
      const isDuaHau = title.includes('dưa hấu');
      const isBap = title.includes('bắp') && !title.includes('thịt bắp');
      const isCaiChua = title.includes('cải chua');
      const isHanhTay = title.includes('hành tây');
      const isThom = title.includes('thơm');

      const isAutoCarryGeneral = isDuaHau || isBap || isCaiChua || isHanhTay;

      let sltonthucte = 0;
      let slhuy = 0;
      let note = '';

      if (hasExcel) {
        sltonthucte = excelRow.slton;
        slhuy = excelRow.slhuy;
        note = 'Cập nhật từ Excel kiểm kho';
      } else {
        if (isAutoCarryGeneral) {
          sltonthucte = sltonhethong;
          slhuy = 0;
          note = 'Tự động đưa qua (không có trong Excel)';
        } else if (isThom) {
          const isThomXanh = title.includes('xanh');
          const isThomGot = title.includes('gọt');
          if (isThomXanh || isThomGot) {
            sltonthucte = sltonhethong;
            slhuy = 0;
            note = 'Tự động đưa qua (Thơm xanh/Thơm gọt)';
          } else {
            sltonthucte = 0;
            slhuy = 0;
            note = 'Thơm khác reset về 0';
          }
        } else {
          sltonthucte = 0;
          slhuy = 0;
          note = 'Reset về 0 (không có trong Excel)';
        }
      }

      processedProducts.set(sp.id, {
        id: sp.id,
        masp: sp.masp,
        title: sp.title,
        sltonhethong,
        slton: sltonthucte,
        slhuy,
        slchogiao,
        slchonhap,
        note,
        isThom,
        titleLower: title
      });
    }

    // Phase 2: Thơm consolidation to target Thơm xanh (kg) [I101127]
    let targetThomXanh = null;
    for (const [id, p] of processedProducts.entries()) {
      if (String(p.masp).trim() === TARGET_THOM_XANH_MASP) {
        targetThomXanh = p;
        break;
      }
    }

    if (targetThomXanh) {
      let extraStock = 0;
      let extraPendingIn = 0;
      let extraPendingOut = 0;

      for (const [id, p] of processedProducts.entries()) {
        if (p.isThom && String(p.masp).trim() !== TARGET_THOM_XANH_MASP) {
          const isThomGot = p.titleLower.includes('gọt');
          if (!isThomGot) {
            extraStock += p.slton;
            extraPendingIn += p.slchonhap;
            extraPendingOut += p.slchogiao;

            p.slton = 0;
            p.slchonhap = 0;
            p.slchogiao = 0;
            p.note = `Quy đổi hàng tồn và Nhập/Xuất về Thơm xanh (kg) [${TARGET_THOM_XANH_MASP}]`;
          }
        }
      }

      targetThomXanh.slton += extraStock;
      targetThomXanh.slchonhap += extraPendingIn;
      targetThomXanh.slchogiao += extraPendingOut;
      targetThomXanh.note += ` (Nhận quy đổi từ các loại thơm khác: +${extraStock} tồn, +${extraPendingIn} nhập, +${extraPendingOut} xuất)`;
      console.log(`[Thơm Consolidation] Consolidated to Thơm xanh (kg) [${TARGET_THOM_XANH_MASP}]: extraStock=${extraStock}, extraPendingIn=${extraPendingIn}, extraPendingOut=${extraPendingOut}`);
    } else {
      console.warn(`[Thơm Consolidation] Target product '${TARGET_THOM_XANH_MASP}' not found! Skip consolidation.`);
    }

    // Phase 3: Separate into excelProducts and resetProducts for DB Transaction
    const excelProducts = [];
    const resetProducts = [];

    for (const [id, p] of processedProducts.entries()) {
      const chenhlech = p.sltonhethong - p.slton - p.slhuy;
      const productInfo = {
        id: p.id,
        masp: p.masp,
        slton: p.slton,
        slhuy: p.slhuy,
        slchogiao: p.slchogiao,
        slchonhap: p.slchonhap,
        sltonhethong: p.sltonhethong,
        chenhlech,
        hasExcel: p.slton > 0 || p.sltonhethong === p.slton,
        ghichu: p.note
      };

      if (p.slton === 0) {
        resetProducts.push(productInfo);
      } else {
        excelProducts.push(productInfo);
      }
    }

    console.log(`Excel products: ${excelProducts.length}, Reset products: ${resetProducts.length}`);

    // 4. TRANSACTION: Perform all database cleanup and updates atomically
    await prisma.$transaction(async (tx) => {
      
      // A. Delete old Chotkhodetail for the faulty chotkhos
      if (oldChotkhoIds.length > 0) {
        console.log("1. Deleting old Chotkhodetail records...");
        await tx.chotkhodetail.deleteMany({
          where: { chotkhoId: { in: oldChotkhoIds } }
        });

        // B. Delete old Chotkho records
        console.log("2. Deleting old Chotkho records...");
        await tx.chotkho.deleteMany({
          where: { id: { in: oldChotkhoIds } }
        });
      }

      // C. Delete old faulty vouchers
      if (oldVoucherIds.length > 0) {
        console.log("3. Deleting old faulty vouchers details (PhieuKhoSanpham)...");
        await tx.phieuKhoSanpham.deleteMany({
          where: { phieuKhoId: { in: oldVoucherIds } }
        });

        console.log("4. Deleting old faulty vouchers (PhieuKho)...");
        await tx.phieuKho.deleteMany({
          where: { id: { in: oldVoucherIds } }
        });
      }

      // D. Move backlogged orders to 'choxuly'
      console.log("5. Moving backlogged orders to 'choxuly'...");
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

      // E. Create new master Chotkho
      console.log("6. Creating new correct Chotkho record...");
      const chotkhoMaster = await tx.chotkho.create({
        data: {
          ngaychot: baselineTime,
          title: `Chốt kho Base Line 06-06-2026`,
          ghichu: 'Chốt kho Baseline chuẩn theo file Ton-Huy 06-6 (1).xlsx - Cập nhật số tồn chuẩn và dọn dẹp đơn cũ',
          khoId: KHO_TONG_ID,
          codeId: newChotkhoCodeId,
          isActive: true
        }
      });

      // F. Prepare details and bulk insert Chotkhodetail
      console.log("7. Preparing and bulk inserting Chotkhodetails...");
      const chotDetailsData = [];
      
      allProducts.forEach(sp => {
        const p = processedProducts.get(sp.id);
        const chenhlech = p.sltonhethong - p.slton - p.slhuy;

        chotDetailsData.push({
          chotkhoId: chotkhoMaster.id,
          sanphamId: sp.id,
          sltonhethong: p.sltonhethong,
          sltonthucte: p.slton,
          slhuy: p.slhuy,
          chenhlech: chenhlech,
          ngaychot: chotkhoMaster.ngaychot,
          ghichu: p.note
        });
      });

      await tx.chotkhodetail.createMany({
        data: chotDetailsData
      });

      // G. Bulk reset products with no pending and not in Excel
      const resetSpIdsWithNoPending = [];
      const resetSpWithPending = [];

      resetProducts.forEach(p => {
        if (p.slchogiao === 0 && p.slchonhap === 0) {
          resetSpIdsWithNoPending.push(p.id);
        } else {
          resetSpWithPending.push(p);
        }
      });

      if (resetSpIdsWithNoPending.length > 0) {
        console.log(`8. Bulk updating ${resetSpIdsWithNoPending.length} reset products with no pending...`);
        await tx.sanphamKho.updateMany({
          where: { khoId: KHO_TONG_ID, sanphamId: { in: resetSpIdsWithNoPending } },
          data: { soluong: 0, updatedAt: new Date() }
        });

        await tx.tonKho.updateMany({
          where: { sanphamId: { in: resetSpIdsWithNoPending } },
          data: { slton: 0, sltontt: 0, slchogiao: 0, slchonhap: 0, updatedAt: new Date() }
        });
      }

      // H. Individual update for reset products WITH pending quantities
      if (resetSpWithPending.length > 0) {
        console.log(`9. Updating ${resetSpWithPending.length} reset products with pending quantities...`);
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

      // I. Individual update for Excel products
      console.log(`10. Updating ${excelProducts.length} products to exact Excel physical counts...`);
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

    console.log('\n--- BASELINE 06-06 RECONCILIATION COMPLETE ---');
    console.log(`- Old Chotkhos deleted: ${oldChotkhoIds.length}`);
    console.log(`- Old đối soát vouchers deleted: ${oldVoucherIds.length}`);
    console.log(`- Orders moved to 'choxuly': ${backloggedDonhang.length + backloggedDathang.length}`);
    console.log(`- Total products in DB: ${allProducts.length}`);
    console.log(`- Products updated from Excel: ${excelProducts.length}`);
    console.log(`- Products reset to 0 (not in Excel): ${resetProducts.length}`);

  } catch (error) {
    console.error('Error during baseline chot:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

performBaselineChot06June();
