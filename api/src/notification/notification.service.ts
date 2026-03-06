import { Injectable, Logger } from '@nestjs/common';
import * as webPush from 'web-push';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly prisma: PrismaService) {
    // Keys from process.env or hardcoded fallbacks
    const publicVapidKey = process.env.VAPID_PUBLIC_KEY || 'BAvPai7WQsKJEriy6QzNwR8PilSz-BugoT221pgKAgXQb7CH55KLe8WbEP23a7GdNsppktd0IR9lTmpLPsgJuyE';
    const privateVapidKey = process.env.VAPID_PRIVATE_KEY || '6KyQ1dwt4FYoVedItiokuBj3v1-RWEUgetixuxxymUY';

    webPush.setVapidDetails(
      'mailto:admin@rausachtrangia.com',
      publicVapidKey,
      privateVapidKey
    );
  }

  async subscribe(userId: string, subscription: any) {
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
    } catch (error) {
      this.logger.error('Failed to subscribe to push notifications', error.stack);
      throw error;
    }
  }

  async unsubscribe(endpoint: string) {
    try {
      // Find the subscription first since it might not exist
      const existing = await this.prisma.pushSubscription.findUnique({
        where: { endpoint },
      });

      if (existing) {
        await this.prisma.pushSubscription.delete({
          where: { endpoint },
        });
      }

      return { success: true };
    } catch (error) {
      this.logger.error('Failed to unsubscribe', error.stack);
      return { success: false, error: error.message };
    }
  }

  async sendNotificationToUser(userId: string, payload: any) {
    try {
      this.logger.log(`Sending notification to user ${userId}`);

      // Save notification to database
      const notification = await this.prisma.notification.create({
        data: {
          userId,
          title: payload.title || 'Thông báo mới',
          message: payload.body || JSON.stringify(payload),
          link: payload.url || null,
          type: payload.type || 'system',
        },
      });

      // Include notification id in the payload so frontend can do something with it if needed
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
            } else {
              this.logger.error('Error sending push notification', error.stack);
            }
          });
      });

      await Promise.allSettled(sendPromises);
      this.logger.log(`Successfully dispatched notification to ${subscriptions.length} endpoints for user ${userId}`);
    } catch (error) {
      this.logger.error('Error in sendNotificationToUser', error.stack);
    }
  }

  async broadcastToAdmins(payload: any) {
    // Hardcoded logic to broadcast to admin groups if generic broadcast is needed
    // e.g. sendNotificationToUser('390299a1-cef6-4540-b26e-1198ead22f33', payload);
  }

  async getUserNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }

  async deleteNotification(id: string) {
    return this.prisma.notification.delete({
      where: { id },
    });
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: { userId, isRead: false },
    });
    return { count };
  }
}
