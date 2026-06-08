import { PrismaClient } from '@prisma/client';

async function main() {
  const prodUrl = "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public";
  const prisma = new PrismaClient({ datasourceUrl: prodUrl });

  try {
    const masp = 'I100207';
    console.log(`🔍 Querying product info...`);
    const product = await prisma.sanpham.findUnique({
      where: { masp },
      include: { TonKho: true }
    });

    if (!product) {
      console.log('❌ Product not found!');
      return;
    }

    console.log(`Product ID: ${product.id}`);
    console.log(`Current slton in TonKho: ${product.TonKho?.slton}`);
    console.log(`TonKho updatedAt: ${product.TonKho?.updatedAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);

    console.log('\n🔍 Fetching all PhieuKhoSanpham for today (08/06/2026) with physical timestamps...');
    const startOfDay = new Date('2026-06-08T00:00:00+07:00');
    const endOfDay = new Date('2026-06-08T23:59:59+07:00');

    const phieuKhos = await prisma.phieuKhoSanpham.findMany({
      where: {
        sanphamId: product.id,
        phieuKho: {
          ngay: {
            gte: startOfDay,
            lte: endOfDay
          }
        }
      },
      include: {
        phieuKho: true
      }
    });

    console.log(`Found ${phieuKhos.length} vouchers.`);
    
    // Construct a timeline of physical database operations (inserts/updates)
    const timelineEvents: any[] = [];

    for (const pk of phieuKhos) {
      timelineEvents.push({
        type: 'VOUCHER',
        actionType: pk.phieuKho.type, // nhap / xuat
        code: pk.phieuKho.maphieu,
        qty: Number(pk.soluong),
        ghichu: pk.phieuKho.ghichu,
        title: pk.phieuKho.title,
        businessDate: pk.phieuKho.ngay,
        createdAt: pk.createdAt, // physical creation time of PhieuKhoSanpham
        pkCreatedAt: pk.phieuKho.createdAt, // physical creation time of PhieuKho
        pkUpdatedAt: pk.phieuKho.updatedAt // physical update time of PhieuKho
      });
    }

    // Add ChotKho detail events
    const chotDetails = await prisma.chotkhodetail.findMany({
      where: {
        sanphamId: product.id,
        ngaychot: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      include: {
        chotkho: true
      }
    });

    for (const cd of chotDetails) {
      timelineEvents.push({
        type: 'CHOTKHO',
        code: cd.chotkho?.codeId,
        sltonhethong: cd.sltonhethong,
        sltonthucte: cd.sltonthucte,
        chenhlech: cd.chenhlech,
        ghichu: cd.ghichu,
        createdAt: cd.createdAt, // physical creation time of Chotkhodetail
        businessDate: cd.ngaychot
      });
    }

    // Add previous day's baseline chotkho event (since it was run today)
    const prevChotDetails = await prisma.chotkhodetail.findMany({
      where: {
        sanphamId: product.id,
        chotkho: {
          codeId: {
            contains: 'CHOTKHO_BASELINE_0706'
          }
        }
      },
      include: {
        chotkho: true
      }
    });

    for (const cd of prevChotDetails) {
      timelineEvents.push({
        type: 'CHOTKHO_BASELINE_PREV',
        code: cd.chotkho?.codeId,
        sltonhethong: cd.sltonhethong,
        sltonthucte: cd.sltonthucte,
        chenhlech: cd.chenhlech,
        ghichu: cd.ghichu,
        createdAt: cd.createdAt, // when it was physically run
        businessDate: cd.ngaychot
      });
    }

    // Group consecutive vouchers of the same type and approximate time (within 1 minute)
    const groupedEvents: any[] = [];
    let currentGroup: any = null;

    for (const event of timelineEvents) {
      if (event.type !== 'VOUCHER') {
        if (currentGroup) {
          groupedEvents.push(currentGroup);
          currentGroup = null;
        }
        groupedEvents.push(event);
        continue;
      }

      if (!currentGroup) {
        currentGroup = {
          type: 'VOUCHER_GROUP',
          actionType: event.actionType,
          count: 1,
          totalQty: event.qty,
          codes: [event.code],
          createdAtStart: event.createdAt,
          createdAtEnd: event.createdAt,
          businessDate: event.businessDate
        };
      } else {
        const timeDiff = Math.abs(event.createdAt.getTime() - currentGroup.createdAtStart.getTime());
        if (event.actionType === currentGroup.actionType && timeDiff < 60000) {
          currentGroup.count++;
          currentGroup.totalQty += event.qty;
          currentGroup.codes.push(event.code);
          currentGroup.createdAtEnd = event.createdAt;
        } else {
          groupedEvents.push(currentGroup);
          currentGroup = {
            type: 'VOUCHER_GROUP',
            actionType: event.actionType,
            count: 1,
            totalQty: event.qty,
            codes: [event.code],
            createdAtStart: event.createdAt,
            createdAtEnd: event.createdAt,
            businessDate: event.businessDate
          };
        }
      }
    }
    if (currentGroup) {
      groupedEvents.push(currentGroup);
    }

    // Sort timeline by physical creation time (createdAtStart/createdAt)
    groupedEvents.sort((a, b) => {
      const timeA = a.type === 'VOUCHER_GROUP' ? a.createdAtStart.getTime() : a.createdAt.getTime();
      const timeB = b.type === 'VOUCHER_GROUP' ? b.createdAtStart.getTime() : b.createdAt.getTime();
      return timeA - timeB;
    });

    console.log('\n⏳ === PHYSICAL TIMELINE OF DATABASE EVENTS (Sorted by physical execution) ===');
    for (const event of groupedEvents) {
      if (event.type === 'VOUCHER_GROUP') {
        const timeStartStr = event.createdAtStart.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        const timeEndStr = event.createdAtEnd.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        const timeStr = timeStartStr === timeEndStr ? timeStartStr : `${timeStartStr} -> ${timeEndStr}`;
        console.log(`[${timeStr}] 📦 VOUCHERS (${event.actionType.toUpperCase()}) | Count: ${event.count} | Total Qty: ${event.totalQty.toFixed(3)} | Codes: ${event.codes.slice(0, 3).join(', ')}${event.codes.length > 3 ? '...' : ''}`);
      } else if (event.type === 'CHOTKHO') {
        const timeStr = event.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        console.log(`[${timeStr}] 🏁 CHOTKHO | Code: ${event.code} | Sys: ${event.sltonhethong} | Real: ${event.sltonthucte} | Diff: ${event.chenhlech} | Note: ${event.ghichu}`);
      } else if (event.type === 'CHOTKHO_BASELINE_PREV') {
        const timeStr = event.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        console.log(`[${timeStr}] ⚠️ PREV BASELINE RUN | Code: ${event.code} | Sys: ${event.sltonhethong} | Real: ${event.sltonthucte} | Diff: ${event.chenhlech} | Note: ${event.ghichu}`);
      }
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
