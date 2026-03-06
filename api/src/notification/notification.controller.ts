import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('subscribe')
  async subscribe(@Body() body: { userId: string; subscription: any }) {
    if (!body.userId || !body.subscription) {
      return { success: false, message: 'Missing userId or subscription data' };
    }
    await this.notificationService.subscribe(body.userId, body.subscription);
    return { success: true };
  }

  @Post('unsubscribe')
  async unsubscribe(@Body() body: { endpoint: string }) {
    if (!body.endpoint) {
      return { success: false, message: 'Missing endpoint' };
    }
    return this.notificationService.unsubscribe(body.endpoint);
  }

  @Get('user/:userId')
  async getUserNotifications(@Param('userId') userId: string, @Query('search') search?: string) {
    return this.notificationService.getUserNotifications(userId, search);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  @Patch('user/:userId/read-all')
  async markAllAsRead(@Param('userId') userId: string) {
    return this.notificationService.markAllAsRead(userId);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    return this.notificationService.deleteNotification(id);
  }

  @Get('user/:userId/unread-count')
  async getUnreadCount(@Param('userId') userId: string) {
    return this.notificationService.getUnreadCount(userId);
  }

  @Post('test-admin-push')
  async testAdminPush(@Body() body: { title?: string; body?: string }) {
    await this.notificationService.broadcastToAdmins({
      title: body.title || 'Thông báo thử nghiệm',
      body: body.body || 'Đây là thông báo test dành cho Admin/Manager.',
      url: '/admin',
      type: 'test'
    });
    return { success: true, message: 'Message broadcasted to all admins' };
  }
}

