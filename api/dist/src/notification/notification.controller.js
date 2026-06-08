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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async subscribe(body) {
        if (!body.userId || !body.subscription) {
            return { success: false, message: 'Missing userId or subscription data' };
        }
        await this.notificationService.subscribe(body.userId, body.subscription);
        return { success: true };
    }
    async unsubscribe(body) {
        if (!body.endpoint) {
            return { success: false, message: 'Missing endpoint' };
        }
        return this.notificationService.unsubscribe(body.endpoint);
    }
    async getUserNotifications(userId, search) {
        return this.notificationService.getUserNotifications(userId, search);
    }
    async markAsRead(id) {
        return this.notificationService.markAsRead(id);
    }
    async markAllAsRead(userId) {
        return this.notificationService.markAllAsRead(userId);
    }
    async deleteNotification(id) {
        return this.notificationService.deleteNotification(id);
    }
    async getUnreadCount(userId) {
        return this.notificationService.getUnreadCount(userId);
    }
    async getTelegramSettings() {
        const enabled = await this.notificationService.isTelegramEnabled();
        return { enabled };
    }
    async setTelegramSettings(body) {
        if (body.enabled === undefined) {
            return { success: false, message: 'Missing enabled flag' };
        }
        await this.notificationService.setTelegramEnabled(body.enabled);
        return { success: true, enabled: body.enabled };
    }
    async testAdminPush(body) {
        await this.notificationService.broadcastToAdmins({
            title: body.title || 'Thông báo thử nghiệm',
            body: body.body || 'Đây là thông báo test dành cho Admin/Manager.',
            url: '/admin',
            type: 'test'
        });
        return { success: true, message: 'Message broadcasted to all admins' };
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Post)('subscribe'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "subscribe", null);
__decorate([
    (0, common_1.Post)('unsubscribe'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "unsubscribe", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getUserNotifications", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)('user/:userId/read-all'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAllAsRead", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "deleteNotification", null);
__decorate([
    (0, common_1.Get)('user/:userId/unread-count'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Get)('telegram-settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getTelegramSettings", null);
__decorate([
    (0, common_1.Post)('telegram-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "setTelegramSettings", null);
__decorate([
    (0, common_1.Post)('test-admin-push'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "testAdminPush", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map