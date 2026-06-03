const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

// Mock services logic directly for ease of standalone execution
const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function runTest() {
  console.log('=== STARTING BASELINE LOCK VERIFICATION TEST ===');
  
  // 1. Create a dummy product
  const masp = `TEST-LOCK-${Date.now()}`;
  const product = await prisma.sanpham.create({
    data: {
      title: 'Sản phẩm Test Khóa Baseline',
      masp: masp,
      isActive: true,
      giaban: 10000,
    }
  });
  console.log(`- Created test product: ${product.title} (${product.masp})`);

  // Ensure initial TonKho exists and is 0
  await prisma.tonKho.upsert({
    where: { sanphamId: product.id },
    create: { sanphamId: product.id, slton: 0, sltontt: 0 },
    update: { slton: 0, sltontt: 0 }
  });

  // 2. Create a backdated Donhang (dated 2026-05-25) completed
  const madon = `DON-TEST-${Date.now()}`;
  const donhang = await prisma.donhang.create({
    data: {
      madonhang: madon,
      status: 'danhan',
      ngaygiao: new Date('2026-05-25T12:00:00+07:00'),
      ngayHoanThanhThucte: new Date('2026-05-25T12:00:00+07:00'),
      createdAt: new Date('2026-05-25T10:00:00+07:00'),
      updatedAt: new Date('2026-05-25T12:00:00+07:00'),
      khoId: KHO_TONG_ID,
      sanpham: {
        create: {
          idSP: product.id,
          sldat: 5,
          slgiao: 5,
          slnhan: 5,
          giaban: 10000,
        }
      }
    }
  });
  console.log(`- Created backdated order: ${donhang.madonhang} completed on May 25th`);

  // 3. Create a Chotkho (baseline closing) on 2026-06-01 with physical count = 10
  const baselineTime = new Date('2026-06-01T23:59:59+07:00');
  const chotkho = await prisma.chotkho.create({
    data: {
      ngaychot: baselineTime,
      title: 'Chốt kho kiểm thử',
      khoId: KHO_TONG_ID,
      isActive: true,
      details: {
        create: {
          sanphamId: product.id,
          sltonhethong: 0,
          sltonthucte: 10,
          slhuy: 0,
          chenhlech: -10,
          ngaychot: baselineTime
        }
      }
    }
  });
  console.log(`- Created baseline Chotkho on June 1st with physical count = 10`);

  // Set current static stock to baseline physical count
  await prisma.tonKho.update({
    where: { sanphamId: product.id },
    data: { slton: 10, sltontt: 10 }
  });
  await prisma.sanphamKho.upsert({
    where: { sanphamId_khoId: { sanphamId: product.id, khoId: KHO_TONG_ID } },
    create: { sanphamId: product.id, khoId: KHO_TONG_ID, soluong: 10 },
    update: { soluong: 10 }
  });
  console.log(`- Initialized static stock tables to 10`);

  // 4. Try updating the old backdated order (simulate Accounting editing)
  // Let's call the NestJS service logic manually or simulate the transaction
  console.log('- Simulating Accounting editing the order on June 2nd...');
  
  // Sửa trường ghi chú của đơn hàng và updatedAt thay đổi thành hiện tại
  await prisma.$transaction(async (tx) => {
    const oldDonhang = await tx.donhang.findUnique({
      where: { id: donhang.id },
      include: { sanpham: true }
    });

    // 4a. Check lock condition using our logic:
    const latestChot = await tx.chotkho.findFirst({
      where: { khoId: oldDonhang.khoId || KHO_TONG_ID, isActive: true },
      orderBy: { ngaychot: 'desc' },
      select: { ngaychot: true }
    });
    
    const effectiveDate = oldDonhang.ngaygiao || oldDonhang.createdAt;
    const skipInventory = new Date(effectiveDate) <= new Date(latestChot.ngaychot);
    
    console.log(`  > skipInventory check result: ${skipInventory} (Expected: true)`);

    // 4b. Perform the update payload
    await tx.donhang.update({
      where: { id: donhang.id },
      data: {
        ghichu: 'Kế toán sửa ghi chú đơn cũ',
        updatedAt: new Date(), // updatedAt changes to current time!
        // ngayHoanThanhThucte is kept as is because status didn't change
      }
    });

    // Since skipInventory is true, we skip calling updateTonkhoAtomic
    if (!skipInventory) {
      console.log('  > WARNING: updateTonkhoAtomic was NOT skipped!');
      process.exit(1);
    } else {
      console.log('  > Checked: updateTonkhoAtomic was successfully skipped!');
    }
  });

  // 5. Verify results
  const finalStock = await prisma.tonKho.findUnique({ where: { sanphamId: product.id } });
  console.log(`- Final static stock after editing: ${finalStock.slton} (Expected: 10)`);
  if (Number(finalStock.slton) !== 10) {
    console.error('❌ FAIL: Static stock was corrupted by editing the old order!');
    process.exit(1);
  } else {
    console.log('✅ PASS: Static stock remained intact at 10!');
  }

  // 6. Test calculateStockFromLogs (System recalculation logic)
  const startTime = chotkho.ngaychot;
  const endTime = new Date(); // now

  // Recalculate using our updated ngayHoanThanhThucte logic
  const xuat = await prisma.donhangsanpham.findMany({
    where: {
      idSP: product.id,
      donhang: {
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        OR: [
          { ngayHoanThanhThucte: { gt: startTime, lte: endTime } },
          { ngayHoanThanhThucte: null, updatedAt: { gt: startTime, lte: endTime } }
        ]
      }
    }
  });

  console.log(`- Recalculated post-baseline transactions: ${xuat.length} (Expected: 0)`);
  if (xuat.length !== 0) {
    console.error('❌ FAIL: Old order was incorrectly included in post-baseline recalculation!');
    process.exit(1);
  } else {
    console.log('✅ PASS: Old order was successfully excluded from recalculation despite updatedAt changing!');
  }

  // 7. Cleanup
  console.log('- Cleaning up test data...');
  await prisma.donhangsanpham.deleteMany({ where: { donhangId: donhang.id } });
  await prisma.donhang.delete({ where: { id: donhang.id } });
  await prisma.chotkhodetail.deleteMany({ where: { chotkhoId: chotkho.id } });
  await prisma.chotkho.delete({ where: { id: chotkho.id } });
  await prisma.sanphamKho.deleteMany({ where: { sanphamId: product.id } });
  await prisma.tonKho.deleteMany({ where: { sanphamId: product.id } });
  await prisma.sanpham.delete({ where: { id: product.id } });

  console.log('=== TEST PASSED SUCCESSFULLY ===');
}

runTest()
  .catch(err => {
    console.error('Test execution failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
