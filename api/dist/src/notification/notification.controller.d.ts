import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    subscribe(body: {
        userId: string;
        subscription: any;
    }): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
    unsubscribe(body: {
        endpoint: string;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    } | {
        success: boolean;
        message: string;
    }>;
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
    testAdminPush(body: {
        title?: string;
        body?: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
