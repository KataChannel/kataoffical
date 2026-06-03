import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function runRollback() {
  console.log('🚀 === STARTING ROLLBACK FOR TOMORROW\'S ORDERS (03/06/2026 VN) ===');

  // Tomorrow is 03/06/2026 VN. In UTC, this is from 2026-06-02T17:00:00.000Z to 2026-06-03T17:00:00.000Z.
  const startDate = new Date('2026-06-02T17:00:00.000Z');
  const endDate = new Date('2026-06-03T17:00:00.000Z');

  // 1. Find the tomorrow's purchase orders that were mistakenly marked as "danhan"
  const orders = await prisma.dathang.findMany({
    where: {
      ngaynhan: {
        gte: startDate,
        lte: endDate,
      },
      status: 'danhan',
      madncc: {
        startsWith: 'TGNCC-X',
      },
    },
    select: {
      id: true,
      madncc: true,
      khoId: true,
      status: true,
      ghichu: true,
      sanpham: {
        select: {
          id: true,
          idSP: true,
          sldat: true,
          slnhan: true,
        },
      },
    },
  });

  console.log(`🔍 Found ${orders.length} orders that need to be rolled back to "dadat".`);

  if (orders.length === 0) {
    console.log('🎉 No orders are in "danhan" status for tomorrow. Nothing to rollback!');
    await prisma.$disconnect();
    return;
  }

  // 2. Perform the rollback in a safe step-by-step transaction for each order
  let successCount = 0;
  
  for (const order of orders) {
    console.log(`\n📦 Processing rollback for order: ${order.madncc} (Warehouse: ${order.khoId})`);
    
    try {
      await prisma.$transaction(async (tx) => {
        // A. Reverse stock updates
        for (const sp of order.sanpham) {
          const sldat = Number(sp.sldat);
          const slnhan = Number(sp.slnhan);
          const spId = sp.idSP;
          const khoId = order.khoId || KHO_TONG_ID;

          console.log(`   - Product ${spId}: sldat=${sldat}, slnhan=${slnhan}`);

          // A1. Reverse TonKho (Global) slton, sltontt, and slchonhap
          if (slnhan > 0) {
            await tx.tonKho.update({
              where: { sanphamId: spId },
              data: {
                slton: { decrement: slnhan },
                sltontt: { decrement: slnhan },
              },
            });
          }

          if (sldat > 0) {
            await tx.tonKho.update({
              where: { sanphamId: spId },
              data: {
                slchonhap: { increment: sldat },
              },
            });
          }

          // A2. Reverse SanphamKho (Specific Warehouse)
          if (slnhan > 0) {
            await tx.sanphamKho.update({
              where: {
                sanphamId_khoId: {
                  sanphamId: spId,
                  khoId: khoId,
                },
              },
              data: {
                soluong: { decrement: slnhan },
              },
            });

            // Mirror logic: If the warehouse was not KHO TỔNG, revert the KHO TỔNG amount too
            if (khoId !== KHO_TONG_ID) {
              await tx.sanphamKho.update({
                where: {
                  sanphamId_khoId: {
                    sanphamId: spId,
                    khoId: KHO_TONG_ID,
                  },
                },
                data: {
                  soluong: { decrement: slnhan },
                },
              });
            }
          }
        }

        // B. Revert dathangsanpham fields (slnhan = 0, ttnhan = 0)
        await tx.dathangsanpham.updateMany({
          where: {
            dathangId: order.id,
          },
          data: {
            slnhan: 0,
            ttnhan: 0,
          },
        });

        // C. Revert Dathang status to "dadat"
        let cleanGhichu = order.ghichu || '';
        cleanGhichu = cleanGhichu.replace(/ \| \[Auto-pilot\] Tự động xác nhận nhập kho lúc 14h/g, '');
        
        await tx.dathang.update({
          where: { id: order.id },
          data: {
            status: 'dadat',
            ngayHoanThanhThucte: null,
            ghichu: cleanGhichu,
          },
        });

        // D. Delete PhieuKho records and their products
        const phieuKhos = await tx.phieuKho.findMany({
          where: {
            madncc: order.madncc,
            createdAt: {
              gte: new Date('2026-06-02T00:00:00.000Z'), // Mistakenly created today
            },
          },
          select: { id: true, maphieu: true },
        });

        for (const pk of phieuKhos) {
          console.log(`   - Deleting virtual PhieuKho: ${pk.maphieu}`);
          
          await tx.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: pk.id },
          });

          await tx.phieuKho.delete({
            where: { id: pk.id },
          });
        }
      });

      console.log(`✅ Successfully rolled back order: ${order.madncc}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to rollback order ${order.madncc}:`, error);
    }
  }

  console.log(`\n🎉 === ROLLBACK COMPLETED: ${successCount}/${orders.length} orders successfully restored. ===`);
  await prisma.$disconnect();
}

runRollback().catch((err) => {
  console.error('Fatal error during rollback execution:', err);
  prisma.$disconnect();
});
