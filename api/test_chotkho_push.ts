import { PrismaClient } from '@prisma/client';
import { NotificationService } from './src/notification/notification.service';
import { ChotkhoService } from './src/chotkho/chotkho.service';

async function testChotKho() {
  const prisma = new PrismaClient();
  
  // Custom mock for PrismaService required methods like executesWithRetry
  const prismaService: any = Object.assign(prisma, {
    executeWithRetry: async (fn) => fn(prisma),
    safeTransaction: async (fn) => fn(prisma)
  });

  const notificationService = new NotificationService(prismaService);
  const chotkhoService = new ChotkhoService(prismaService, notificationService);

  try {
    const kho = await prisma.kho.findFirst();
    const sanpham = await prisma.sanpham.findFirst();
    const user = await prisma.user.findFirst();

    if (!kho || !sanpham) {
        console.error('Missing kho or sanpham');
        return;
    }

    console.log('Testing chot kho for kho:', kho.name, 'and sanpham:', sanpham.title);

    // Mock the group logic explicitly locally for logging checking
    let pushWasSent = false;
    const originalSend = notificationService.sendNotificationToUser;
    notificationService.sendNotificationToUser = async (userId, payload) => {
        console.log(`[PushIntercepted] Sending Push Notification to user ${userId} with payload:`, payload);
        pushWasSent = true;
        // Call original to test if any sub errors out gracefully, it won't crash
        return originalSend.call(notificationService, userId, payload);
    };

    const result = await chotkhoService.create({
      khoId: kho.id,
      userId: user?.id || undefined, // Thường là ID của user thực hiện
      title: 'TEST CHỐT KHO',
      ghichu: 'Đây là lượt test chốt kho tự động gọi Push',
      details: [
        {
          sanphamId: sanpham.id,
          sltonhethong: 10,
          sltonthucte: 8,
          slhuy: 1,
          ghichu: 'Hao hụt 1, thực tế 8',
        }
      ]
    });

    console.log('Chotkho generated successfully:', result.success);

    if (pushWasSent) {
       console.log('✅ Push Notification trigger was called successfully!');
    } else {
       console.log('❌ Push Notification trigger was NOT called!');
    }

  } catch (error) {
    console.error('Error testing chot kho:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testChotKho();
