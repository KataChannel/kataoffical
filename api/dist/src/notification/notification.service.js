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
            const sendPromises = subscriptions.map((sub) => {
                const pushSubscription = {
                    endpoint: sub.endpoint,
                    keys: {
                        p256dh: sub.p256dh,
                        auth: sub.auth,
                    },
                };
                return webPush
                    .sendNotification(pushSubscription, JSON.stringify(payload))
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
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map