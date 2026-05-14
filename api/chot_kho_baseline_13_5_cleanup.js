
const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const prisma = new PrismaClient();

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function performBaselineChot13May() {
  try {
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 13-5.xlsx';
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

    // 2. Identify Backlogged Orders (Status 'dadat' created before end of 13/05)
    // Using 23:59:59 to include all orders from today
    const baselineTime = new Date('2026-05-13T23:59:59');
    
    const backloggedDonhang = await prisma.donhang.findMany({
      where: { status: 'dadat', createdAt: { lte: baselineTime } },
      select: { id: true, madonhang: true }
    });

    const backloggedDathang = await prisma.dathang.findMany({
      where: { status: 'dadat', createdAt: { lte: baselineTime } },
      select: { id: true, madncc: true }
    });

    console.log(`Found ${backloggedDonhang.length} backlogged Donhang and ${backloggedDathang.length} Dathang to move to 'choxuly'.`);

    // 3. Create Master Chotkho
    const chotkhoMaster = await prisma.chotkho.create({
      data: {
        ngaychot: baselineTime,
        title: `Chốt kho Base Line 13-05-2026 (FULL CLEANUP)`,
        ghichu: 'Chốt kho Baseline + Dọn dẹp tồn đọng slchogiao/slchonhap + Chuyển trạng thái choxuly (Theo file Ton-Huy 13-5.xlsx)',
        khoId: KHO_TONG_ID,
        codeId: `CHOTKHO_CLEANUP_1305_${Date.now()}`,
        isActive: true
      }
    });

    console.log(`Created master chotkho record: ${chotkhoMaster.id}`);

    let totalProducts = 0;

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

      // B. Update Products (Baseline Stock + Reset Pending)
      const allProducts = await tx.sanpham.findMany({
        include: {
          SanphamKho: { where: { khoId: KHO_TONG_ID } }
        }
      });
      totalProducts = allProducts.length;

      for (const sp of allProducts) {
        const maspKey = String(sp.masp).trim();
        const hasExcel = excelData.has(maspKey);
        const excelRow = hasExcel ? excelData.get(maspKey) : { slton: 0, slhuy: 0 };
        
        const sltonhethong = parseFloat(sp.SanphamKho[0]?.soluong) || 0;
        const sltonthucte = excelRow.slton;
        const slhuy = excelRow.slhuy;
        const chenhlech = sltonhethong - sltonthucte - slhuy;

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

        // Update TonKho: RESET slchogiao and slchonhap to 0
        await tx.tonKho.upsert({
          where: { sanphamId: sp.id },
          create: {
            sanphamId: sp.id,
            slton: sltonthucte,
            sltontt: sltonthucte,
            slchogiao: 0,
            slchonhap: 0
          },
          update: {
            slton: sltonthucte,
            sltontt: sltonthucte,
            slchogiao: 0, 
            slchonhap: 0, 
            updatedAt: new Date()
          }
        });
      }

    }, { timeout: 600000 }); 

    console.log('\n--- BASELINE & CLEANUP COMPLETE ---');
    console.log(`- Orders moved to 'choxuly': ${backloggedDonhang.length + backloggedDathang.length}`);
    console.log(`- Products updated: ${totalProducts}`);
    console.log(`- slchogiao/slchonhap reset to 0 for all products.`);

  } catch (error) {
    console.error('Error during baseline chot & cleanup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

performBaselineChot13May();
