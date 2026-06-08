import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258'; // KHO - HCM
const TARGET_THOM_XANH_MASP = 'I100220'; // Thơm trái xanh
const CHOTKHO_ID = '12f01303-5f3b-4fcd-a695-34ff6ab9f5fd'; // Today's chotkho ID

async function main() {
  console.log('--- RETROSPECTIVELY APPLYING RULES.MD TO TODAY\'S CHOTKHO ---');

  // 1. Fetch today's chotkho with its details
  const chot = await prisma.chotkho.findUnique({
    where: { id: CHOTKHO_ID },
    include: { details: { include: { sanpham: true } } }
  });

  if (!chot) {
    console.error('❌ Today\'s chotkho not found!');
    return;
  }

  console.log(`Loaded chotkho: ${chot.title} (${chot.id}) with ${chot.details.length} details.`);

  // 2. Classify products and apply rules
  const processedDetails = new Map();

  for (const detail of chot.details) {
    const sp = detail.sanpham;
    if (!sp) {
      console.warn(`Detail ${detail.id} has no associated product.`);
      continue;
    }
    const title = sp.title.toLowerCase();
    const masp = sp.masp.trim();
    const ghichu = detail.ghichu || '';

    // Check if it was in the Excel (was uploaded by user)
    // The UI script flags Excel entries with "Excel" in the ghichu, but we must exclude "không có trong Excel"
    const inExcel = ghichu.includes('Excel') && !ghichu.includes('không có trong Excel');

    let sltonhethong = Number(detail.sltonhethong);
    let sltonthucte = Number(detail.sltonthucte);
    let slhuy = Number(detail.slhuy);
    let note = ghichu;

    const isBap = title.includes('bắp') && !title.includes('cải') && !title.includes('chuối') && !title.includes('đậu') && !title.includes('thịt');
    const isAutoCarry = title.includes('dưa hấu') || isBap || title.includes('cải chua') || title.includes('hành tây');
    const isThom = title.includes('thơm') && !title.includes('rau thơm');

    if (sltonhethong < 0) {
      sltonhethong = 0;
      sltonthucte = 0;
      slhuy = 0;
      note = 'Tự động reset kho âm về 0 (Rules.md)';
    } else if (inExcel) {
      // Keep Excel counts as they are
      note = `${ghichu} (Áp dụng rule: có trong Excel)`;
    } else {
      // Product was NOT in Excel
      if (isAutoCarry) {
        // Keep system stock
        sltonthucte = sltonhethong;
        note = 'Tự động đưa qua (không có trong Excel - Auto-carried)';
      } else if (isThom) {
        const isThomXanh = masp === TARGET_THOM_XANH_MASP;
        const isThomGot = title.includes('gọt');

        if (isThomXanh || isThomGot) {
          // Keep system stock
          sltonthucte = sltonhethong;
          note = 'Tự động đưa qua (Thơm trái xanh/Thơm gọt - Auto-carried)';
        } else {
          // Reset to 0
          sltonthucte = 0;
          slhuy = 0;
          note = 'Thơm khác reset về 0 (không có trong Excel - Rules.md)';
        }
      } else {
        // Reset all other products to 0
        sltonthucte = 0;
        slhuy = 0;
        note = 'Reset về 0 (không có trong Excel - Rules.md)';
      }
    }

    processedDetails.set(sp.id, {
      id: detail.id,
      sanphamId: sp.id,
      masp,
      title: sp.title,
      isThom,
      titleLower: title,
      sltonhethong,
      sltonthucte,
      slhuy,
      ghichu: note
    });
  }

  // 3. Thơm Consolidation (Quy đổi Thơm)
  let targetThomXanh: any = null;
  for (const p of processedDetails.values()) {
    if (p.masp === TARGET_THOM_XANH_MASP) {
      targetThomXanh = p;
      break;
    }
  }

  if (targetThomXanh) {
    let extraStock = 0;
    for (const p of processedDetails.values()) {
      if (p.isThom && p.masp !== TARGET_THOM_XANH_MASP) {
        const isThomGot = p.titleLower.includes('gọt');
        if (!isThomGot) {
          // Add other Thơm stock to Thơm trái xanh
          extraStock += p.sltonhethong;
          // Set other Thơm stock to 0
          p.sltonthucte = 0;
          p.ghichu = `Quy đổi tồn kho về Thơm trái xanh [${TARGET_THOM_XANH_MASP}] (Rules.md)`;
        }
      }
    }
    
    if (extraStock > 0) {
      targetThomXanh.sltonthucte += extraStock;
      targetThomXanh.ghichu += ` (Nhận quy đổi từ các loại thơm khác: +${extraStock})`;
      console.log(`[Thơm Consolidation] Consolidated +${extraStock} to Thơm trái xanh [${TARGET_THOM_XANH_MASP}]`);
    }
  } else {
    console.warn(`[Thơm Consolidation] Target product '${TARGET_THOM_XANH_MASP}' not found in details!`);
  }

  // 4. Database updates within a transaction
  console.log('Starting DB Update Transaction...');
  await prisma.$transaction(async (tx) => {
    let updatedCount = 0;

    for (const p of processedDetails.values()) {
      const chenhlech = p.sltonhethong - p.sltonthucte - p.slhuy;

      // A. Update Chotkhodetail record
      await tx.chotkhodetail.update({
        where: { id: p.id },
        data: {
          sltonthucte: new Prisma.Decimal(p.sltonthucte),
          slhuy: new Prisma.Decimal(p.slhuy),
          chenhlech: new Prisma.Decimal(chenhlech),
          ghichu: p.ghichu
        }
      });

      // B. Update SanphamKho for KHO_TONG_ID
      await tx.sanphamKho.upsert({
        where: { sanphamId_khoId: { sanphamId: p.sanphamId, khoId: KHO_TONG_ID } },
        create: { sanphamId: p.sanphamId, khoId: KHO_TONG_ID, soluong: new Prisma.Decimal(p.sltonthucte) },
        update: { soluong: new Prisma.Decimal(p.sltonthucte), updatedAt: new Date() }
      });

      // C. Update TonKho (global)
      await tx.tonKho.upsert({
        where: { sanphamId: p.sanphamId },
        create: { sanphamId: p.sanphamId, slton: new Prisma.Decimal(p.sltonthucte), sltontt: new Prisma.Decimal(p.sltonthucte) },
        update: { slton: new Prisma.Decimal(p.sltonthucte), sltontt: new Prisma.Decimal(p.sltonthucte), updatedAt: new Date() }
      });

      updatedCount++;
    }

    // D. Reset all virtual sub-warehouses to 0
    await tx.sanphamKho.updateMany({
      where: { NOT: { khoId: KHO_TONG_ID } },
      data: { soluong: 0, updatedAt: new Date() }
    });

    console.log(`Updated ${updatedCount} products in DB.`);
  }, { timeout: 300000 });

  console.log('--- RECONCILIATION & CORRECTION COMPLETE ---');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
