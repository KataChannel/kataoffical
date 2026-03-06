"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const notification_service_1 = require("./src/notification/notification.service");
const chotkho_service_1 = require("./src/chotkho/chotkho.service");
async function testChotKho() {
    const prisma = new client_1.PrismaClient();
    const prismaService = Object.assign(prisma, {
        executeWithRetry: async (fn) => fn(prisma),
        safeTransaction: async (fn) => fn(prisma)
    });
    const notificationService = new notification_service_1.NotificationService(prismaService);
    const chotkhoService = new chotkho_service_1.ChotkhoService(prismaService, notificationService);
    try {
        const kho = await prisma.kho.findFirst();
        const sanpham = await prisma.sanpham.findFirst();
        const user = await prisma.user.findFirst();
        if (!kho || !sanpham) {
            console.error('Missing kho or sanpham');
            return;
        }
        console.log('Testing chot kho for kho:', kho.name, 'and sanpham:', sanpham.title);
        let pushWasSent = false;
        const originalSend = notificationService.sendNotificationToUser;
        notificationService.sendNotificationToUser = async (userId, payload) => {
            console.log(`[PushIntercepted] Sending Push Notification to user ${userId} with payload:`, payload);
            pushWasSent = true;
            return originalSend.call(notificationService, userId, payload);
        };
        const result = await chotkhoService.create({
            khoId: kho.id,
            userId: user?.id || undefined,
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
        }
        else {
            console.log('❌ Push Notification trigger was NOT called!');
        }
    }
    catch (error) {
        console.error('Error testing chot kho:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
testChotKho();
//# sourceMappingURL=test_chotkho_push.js.map