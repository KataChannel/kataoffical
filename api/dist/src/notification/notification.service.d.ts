import { PrismaService } from '../../prisma/prisma.service';
export declare class NotificationService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    subscribe(userId: string, subscription: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        endpoint: string;
        p256dh: string;
        auth: string;
    }>;
    unsubscribe(endpoint: string): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    sendNotificationToUser(userId: string, payload: any): Promise<void>;
    broadcastToAdmins(payload: any): Promise<void>;
    getUserNotifications(userId: string, search?: string): Promise<{
        id: string;
        title: string;
        type: string | null;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        userId: string;
        message: string;
        isRead: boolean;
    }[]>;
    markAsRead(id: string): Promise<{
        id: string;
        title: string;
        type: string | null;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        userId: string;
        message: string;
        isRead: boolean;
    }>;
    markAllAsRead(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteNotification(id: string): Promise<{
        id: string;
        title: string;
        type: string | null;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        userId: string;
        message: string;
        isRead: boolean;
    }>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
}
