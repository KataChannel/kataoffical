"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const webPush = require("web-push");
const prisma_service_1 = require("../../prisma/prisma.service");
let NotificationService = NotificationService_1 = class NotificationService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(NotificationService_1.name);
        const publicVapidKey = process.env.VAPID_PUBLIC_KEY || 'BAvPai7WQsKJEriy6QzNwR8PilSz-BugoT221pgKAgXQb7CH55KLe8WbEP23a7GdNsppktd0IR9lTmpLPsgJuyE';
        const privateVapidKey = process.env.VAPID_PRIVATE_KEY || '6KyQ1dwt4FYoVedItiokuBj3v1-RWEUgetixuxxymUY';
        webPush.setVapidDetails('mailto:admin@rausachtrangia.com', publicVapidKey, privateVapidKey);
    }
    async subscribe(userId, subscription) {
        try {
            if (!subscription || !subscription.keys) {
                throw new Error('Invalid subscription object');
            }
            this.logger.log(`Subscribing user ${userId} to push notifications`);
            const existingSub = await this.prisma.pushSubscription.findUnique({
                where: { endpoint: subscription.endpoint },
            });
            if (existingSub) {
                return await this.prisma.pushSubscription.update({
                    where: { endpoint: subscription.endpoint },
                    data: {
                        userId,
                        p256dh: subscription.keys.p256dh,
                        auth: subscription.keys.auth,
                    },
                });
            }
            return await this.prisma.pushSubscription.create({
                data: {
                    userId: userId,
                    endpoint: subscription.endpoint,
                    p256dh: subscription.keys.p256dh,
                    auth: subscription.keys.auth,
                },
            });
        }
        catch (error) {
            this.logger.error('Failed to subscribe to push notifications', error.stack);
            throw error;
        }
    }
    async unsubscribe(endpoint) {
        try {
            const existing = await this.prisma.pushSubscription.findUnique({
                where: { endpoint },
            });
            if (existing) {
                await this.prisma.pushSubscription.delete({
                    where: { endpoint },
                });
            }
            return { success: true };
        }
        catch (error) {
            this.logger.error('Failed to unsubscribe', error.stack);
            return { success: false, error: error.message };
        }
    }
    async sendNotificationToUser(userId, payload) {
        try {
            this.logger.log(`Sending notification to user ${userId}`);
            const notification = await this.prisma.notification.create({
                data: {
                    userId,
                    title: payload.title || 'Thông báo mới',
                    message: payload.body || JSON.stringify(payload),
                    link: payload.url || null,
                    type: payload.type || 'system',
                },
            });
            payload.id = notification.id;
            const subscriptions = await this.prisma.pushSubscription.findMany({
                where: { userId },
            });
            if (subscriptions.length === 0) {
                this.logger.log(`No active subscriptions found for user ${userId}`);
                return;
            }
            const pushPayload = {
                notification: {
                    title: payload.title || 'Thông báo mới',
                    body: payload.body || '',
                    icon: payload.icon || '/icons/icon-72x72.png',
                    vibrate: [100, 50, 100],
                    data: {
                        url: payload.url || '/',
                        id: notification.id
                    },
                    actions: payload.actions || []
                }
            };
            const sendPromises = subscriptions.map((sub) => {
                const pushSubscription = {
                    endpoint: sub.endpoint,
                    keys: {
                        p256dh: sub.p256dh,
                        auth: sub.auth,
                    },
                };
                return webPush
                    .sendNotification(pushSubscription, JSON.stringify(pushPayload))
                    .catch(async (error) => {
                    if (error.statusCode === 404 || error.statusCode === 410) {
                        this.logger.warn(`Subscription has expired or is no longer valid: ${sub.endpoint}`);
                        await this.prisma.pushSubscription.delete({
                            where: { id: sub.id },
                        });
                    }
                    else {
                        this.logger.error('Error sending push notification', error.stack);
                    }
                });
            });
            await Promise.allSettled(sendPromises);
            this.logger.log(`Successfully dispatched notification to ${subscriptions.length} endpoints for user ${userId}`);
        }
        catch (error) {
            this.logger.error('Error in sendNotificationToUser', error.stack);
        }
    }
    async broadcastToRoles(roles, payload) {
        try {
            this.logger.log(`Broadcasting notification to roles: ${roles.join(', ')}`);
            const users = await this.prisma.user.findMany({
                where: {
                    roles: {
                        some: {
                            role: {
                                name: { in: roles, mode: 'insensitive' }
                            }
                        }
                    }
                },
                select: { id: true }
            });
            this.logger.log(`Found ${users.length} users with matching roles`);
            const sendPromises = users.map(user => this.sendNotificationToUser(user.id, payload));
            await Promise.allSettled(sendPromises);
        }
        catch (error) {
            this.logger.error('Error in broadcastToRoles', error.stack);
        }
    }
    async broadcastToAdmins(payload) {
        return this.broadcastToRoles(['Admin', 'PKD', 'ORDER'], payload);
    }
    async getUserNotifications(userId, search) {
        try {
            const where = { userId };
            if (search) {
                where.OR = [
                    { title: { contains: search, mode: 'insensitive' } },
                    { message: { contains: search, mode: 'insensitive' } },
                ];
            }
            return await this.prisma.notification.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                take: 50,
            });
        }
        catch (error) {
            this.logger.error(`Error in getUserNotifications for user ${userId}: ${error.message}`, error.stack);
            return [];
        }
    }
    async markAsRead(id) {
        return this.prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }
    async markAllAsRead(userId) {
        return this.prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
    }
    async deleteNotification(id) {
        return this.prisma.notification.delete({
            where: { id },
        });
    }
    async getUnreadCount(userId) {
        try {
            const count = await this.prisma.notification.count({
                where: { userId, isRead: false },
            });
            return { count };
        }
        catch (error) {
            this.logger.error(`Error in getUnreadCount for user ${userId}: ${error.message}`, error.stack);
            return { count: 0 };
        }
    }
    async isTelegramEnabled() {
        try {
            const setting = await this.prisma.systemSetting.findUnique({
                where: { key: 'telegram_notifications_enabled' }
            });
            return setting ? setting.value === 'true' : true;
        }
        catch (error) {
            this.logger.error('Lỗi khi đọc cấu hình Telegram từ DB, mặc định trả về true', error.stack);
            return true;
        }
    }
    async setTelegramEnabled(enabled) {
        try {
            return await this.prisma.systemSetting.upsert({
                where: { key: 'telegram_notifications_enabled' },
                update: { value: String(enabled) },
                create: { key: 'telegram_notifications_enabled', value: String(enabled) }
            });
        }
        catch (error) {
            this.logger.error('Lỗi khi lưu cấu hình Telegram vào DB', error.stack);
            throw error;
        }
    }
    async sendTelegramMessage(message) {
        const isEnabled = await this.isTelegramEnabled();
        if (!isEnabled) {
            this.logger.log('Bỏ qua gửi tin nhắn Telegram do tính năng này đang bị TẮT trong cấu hình hệ thống');
            return false;
        }
        const token = process.env.TELEGRAM_BOT_TOKEN?.replace(/^["']|["']$/g, '');
        const chatId = process.env.TELEGRAM_CHAT_ID?.replace(/^["']|["']$/g, '');
        if (!token || !chatId || token === 'your_bot_token_here' || chatId === 'your_chat_id_here') {
            this.logger.warn('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in environment variables');
            return false;
        }
        try {
            const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML',
                }),
            });
            if (!response.ok) {
                const errText = await response.text();
                this.logger.error(`Failed to send Telegram message. Status: ${response.status}. Error: ${errText}`);
                return false;
            }
            this.logger.log('Successfully sent Telegram notification');
            return true;
        }
        catch (error) {
            this.logger.error('Error sending Telegram message', error.stack || error.message);
            return false;
        }
    }
    async sendChotkhoTelegramNotification(chotkhoData) {
        const khoName = chotkhoData.kho?.name || 'N/A';
        const creator = chotkhoData.user?.profile?.name || chotkhoData.user?.email || 'Hệ thống';
        const ngayChotFormatted = new Date(chotkhoData.ngaychot).toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            day: 'numeric', month: 'numeric', year: 'numeric'
        });
        const spCount = chotkhoData.details?.length || 0;
        const message = `📦 <b>CHỐT KHO: ${khoName}</b>\n` +
            `- Thời gian: ${ngayChotFormatted}\n` +
            `- Người thực hiện: ${creator}\n` +
            `- Số SP chốt: ${spCount}`;
        return this.sendTelegramMessage(message);
    }
    async handleOrderEvent(order, action, oldOrder) {
        return;
    }
    async handleDathangEvent(dathang, action, oldDathang) {
        if (action !== 'CREATE') {
            return;
        }
        try {
            const targetKhoId = dathang.khoId || "4cc01811-61f5-4bdc-83de-a493764e9258";
            const toVNString = (date) => {
                const d = new Date(date.getTime() + 7 * 60 * 60 * 1000);
                return d.toISOString().split('T')[0];
            };
            const now = new Date();
            const todayStr = toVNString(now);
            const todayStart = new Date(todayStr + 'T00:00:00+07:00');
            const todayEnd = new Date(todayStr + 'T23:59:59+07:00');
            const dathangDate = dathang.ngaynhan || dathang.createdAt;
            const dathangDateStr = toVNString(new Date(dathangDate));
            if (dathangDateStr !== todayStr) {
                this.logger.log(`Bỏ qua đặt hàng NCC do không thuộc ngày hiện tại: ${dathangDateStr} vs ${todayStr}`);
                return;
            }
            const latestChot = await this.prisma.chotkho.findFirst({
                where: {
                    khoId: targetKhoId,
                    isActive: true,
                    ngaychot: {
                        gte: todayStart,
                        lte: todayEnd
                    }
                },
                orderBy: { ngaychot: 'desc' },
                include: { kho: true }
            });
            if (!latestChot) {
                this.logger.log('Chưa có phiên chốt kho nào trong ngày hiện tại. Bỏ qua thông báo phát sinh.');
                return;
            }
            const chotkhoTime = latestChot.createdAt || latestChot.ngaychot;
            const eventTime = new Date(dathang.createdAt);
            if (eventTime <= chotkhoTime) {
                this.logger.log(`Bỏ qua đặt hàng do được tạo trước hoặc cùng lúc với chốt kho ngày hiện tại.`);
                return;
            }
            const fullDathang = await this.prisma.dathang.findUnique({
                where: { id: dathang.id },
                include: {
                    sanpham: true
                }
            });
            if (!fullDathang)
                return;
            let creator = 'Hệ thống';
            try {
                const audit = await this.prisma.auditLog.findFirst({
                    where: {
                        entityName: 'Dathang',
                        entityId: dathang.id,
                        action: 'CREATE'
                    },
                    select: { userEmail: true }
                });
                if (audit?.userEmail) {
                    creator = audit.userEmail;
                }
            }
            catch (e) {
                this.logger.error('Lỗi khi truy vấn AuditLog để tìm người tạo đặt hàng', e);
            }
            const spCount = fullDathang.sanpham?.length || 0;
            const thoiGianFormatted = new Date(fullDathang.createdAt).toLocaleString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                day: 'numeric', month: 'numeric', year: 'numeric'
            });
            const message = `⚠️ <b>ĐẶT HÀNG NCC MỚI (SAU CHỐT KHO)</b>\n` +
                `- Mã đặt hàng: <code>${fullDathang.madncc}</code>\n` +
                `- Thời gian: ${thoiGianFormatted}\n` +
                `- Người thực hiện: ${creator}\n` +
                `- Số SP phát sinh: ${spCount}`;
            await this.sendTelegramMessage(message);
        }
        catch (err) {
            this.logger.error('Error handling dathang event for post-closing monitoring', err.stack);
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map