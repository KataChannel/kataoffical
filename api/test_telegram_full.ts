import { PrismaClient } from '@prisma/client';
import { NotificationService } from './src/notification/notification.service';
import { ChotkhoService } from './src/chotkho/chotkho.service';
import { DonhangService } from './src/donhang/donhang.service';
import { DathangService } from './src/dathang/dathang.service';
import { randomUUID } from 'crypto';

async function testFullTelegramFlow() {
  const prisma = new PrismaClient();
  
  // Custom mock for PrismaService required methods like executesWithRetry
  const prismaService: any = Object.assign(prisma, {
    executeWithRetry: async (fn: any) => fn(prisma),
    safeTransaction: async (fn: any) => fn(prisma)
  });

  const notificationService = new NotificationService(prismaService);
  const chotkhoService = new ChotkhoService(prismaService, notificationService);
  
  // Create services
  // DonhangService constructor requires: prisma, notificationService, etc.
  // We can just instantiate them or mock their dependencies
  // Let's inspect the DonhangService constructor to see what it requires.
  // Actually, we can just trigger the service methods if they are simple,
  // or trigger the event handler directly to isolate notification testing!
  // Yes! We can test handleOrderEvent and handleDathangEvent directly!
  // That avoids needing to satisfy complex service dependencies.
  
  try {
    const kho = await prisma.kho.findFirst({ where: { isActive: true } });
    const sanpham = await prisma.sanpham.findFirst({ where: { isActive: true } });
    const nhacungcap = await prisma.nhacungcap.findFirst({ where: { isActive: true } });
    const user = await prisma.user.findFirst();

    if (!kho || !sanpham || !nhacungcap) {
      console.error('❌ Missing database prerequisites (kho, sanpham, nhacungcap)');
      return;
    }

    console.log(`📋 Using Kho: ${kho.name} (${kho.id})`);
    console.log(`📋 Using Sanpham: ${sanpham.title} (${sanpham.id})`);
    console.log(`📋 Using Nhacungcap: ${nhacungcap.name} (${nhacungcap.id})`);

    // Clean up any old active test chotkho for this warehouse
    await prisma.chotkho.updateMany({
      where: { khoId: kho.id, isActive: true },
      data: { isActive: false }
    });

    console.log('\n--- STEP 1: Creating Chốt Kho ---');
    const chotResult = await chotkhoService.create({
      khoId: kho.id,
      userId: user?.id || undefined,
      title: 'TEST CHỐT KHO HỆ THỐNG',
      ghichu: 'Test Telegram notification flow',
      details: [
        {
          sanphamId: sanpham.id,
          sltonhethong: 100,
          sltonthucte: 95,
          slhuy: 2,
          ghichu: 'Hao hụt 3, hủy 2'
        }
      ]
    });
    
    if (!chotResult.success || !chotResult.data) {
      console.error('❌ Failed to create chốt kho session');
      return;
    }
    const chotkhoSession = chotResult.data;
    console.log(`✅ Chốt kho session created: ${chotkhoSession.id}`);

    // Wait a brief moment to ensure createdAt times are distinct
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('\n--- STEP 2: Simulating Purchase Order (Đặt Hàng) creation ---');
    // Create a mock dathang record in database
    const mockDathang = await prisma.dathang.create({
      data: {
        title: 'Đơn đặt hàng post-chotkho',
        type: 'dathang',
        madncc: `TGNCC-TEST-${Date.now()}`,
        ngaynhan: new Date(),
        nhacungcapId: nhacungcap.id,
        khoId: kho.id,
        isActive: true,
        status: 'dadat',
        sanpham: {
          create: {
            idSP: sanpham.id,
            sldat: 50,
            slgiao: 0,
            slnhan: 0,
            gianhap: 10000,
            isActive: true
          }
        }
      },
      include: { sanpham: true }
    });
    console.log(`✅ Mock dathang created: ${mockDathang.madncc}`);
    await notificationService.handleDathangEvent(mockDathang, 'CREATE');

    console.log('\n--- STEP 3: Simulating Purchase Order (Đặt Hàng) update ---');
    // Create an updated mock representing the changed state
    const updatedDathang = await prisma.dathang.update({
      where: { id: mockDathang.id },
      data: {
        status: 'danhan',
        sanpham: {
          updateMany: {
            where: { idSP: sanpham.id },
            data: { slnhan: 50, slgiao: 50 }
          }
        }
      },
      include: { sanpham: true }
    });
    console.log(`✅ Mock dathang updated to status: ${updatedDathang.status}`);
    await notificationService.handleDathangEvent(updatedDathang, 'UPDATE', mockDathang);

    console.log('\n--- STEP 4: Simulating Sales Order (Đơn Hàng) creation ---');
    // Create a mock donhang record in database
    const mockDonhang = await prisma.donhang.create({
      data: {
        madonhang: `TG-TEST-${Date.now()}`,
        ngaygiao: new Date(),
        khoId: kho.id,
        status: 'dadat',
        tongtien: 250000,
        sanpham: {
          create: {
            idSP: sanpham.id,
            sldat: 10,
            slgiao: 0,
            slnhan: 0,
            giaban: 25000
          }
        }
      },
      include: { sanpham: true }
    });
    console.log(`✅ Mock donhang created: ${mockDonhang.madonhang}`);
    await notificationService.handleOrderEvent(mockDonhang, 'CREATE');

    console.log('\n--- STEP 5: Simulating Next-Day Sales Order (Đơn Hàng Hôm Sau) terminating monitoring ---');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextDayDonhang = await prisma.donhang.create({
      data: {
        madonhang: `TG-TOMORROW-${Date.now()}`,
        ngaygiao: tomorrow,
        khoId: kho.id,
        status: 'dadat',
        tongtien: 150000,
        sanpham: {
          create: {
            idSP: sanpham.id,
            sldat: 5,
            slgiao: 0,
            slnhan: 0,
            giaban: 30000
          }
        }
      },
      include: { sanpham: true }
    });
    console.log(`✅ Mock next-day donhang created: ${nextDayDonhang.madonhang}`);
    await notificationService.handleOrderEvent(nextDayDonhang, 'CREATE');

    console.log('\n--- STEP 6: Simulating Post-termination event (should NOT notify) ---');
    const lateDathang = await prisma.dathang.create({
      data: {
        title: 'Đơn đặt hàng sau khi đã dừng giám sát',
        type: 'dathang',
        madncc: `TGNCC-LATE-${Date.now()}`,
        ngaynhan: tomorrow,
        nhacungcapId: nhacungcap.id,
        khoId: kho.id,
        isActive: true,
        status: 'dadat',
        sanpham: {
          create: {
            idSP: sanpham.id,
            sldat: 100,
            slgiao: 0,
            slnhan: 0,
            gianhap: 10000
          }
        }
      },
      include: { sanpham: true }
    });
    console.log(`✅ Mock post-termination dathang created: ${lateDathang.madncc}`);
    await notificationService.handleDathangEvent(lateDathang, 'CREATE');

    // CLEANUP
    console.log('\n--- CLEANING UP TEST ENTITIES ---');
    await prisma.chotkhodetail.deleteMany({ where: { chotkhoId: chotkhoSession.id } });
    await prisma.chotkho.delete({ where: { id: chotkhoSession.id } });
    
    await prisma.dathangsanpham.deleteMany({ where: { dathangId: { in: [mockDathang.id, lateDathang.id] } } });
    await prisma.dathang.deleteMany({ where: { id: { in: [mockDathang.id, lateDathang.id] } } });
    
    await prisma.donhangsanpham.deleteMany({ where: { donhangId: { in: [mockDonhang.id, nextDayDonhang.id] } } });
    await prisma.donhang.deleteMany({ where: { id: { in: [mockDonhang.id, nextDayDonhang.id] } } });

    console.log('✅ Cleanup completed successfully!');

  } catch (error) {
    console.error('❌ Error during test run:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testFullTelegramFlow();
