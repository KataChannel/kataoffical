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
exports.UserPermissionController = void 0;
const common_1 = require("@nestjs/common");
const user_permission_service_1 = require("./user-permission.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_guard_1 = require("../guards/permissions.guard");
const permissions_decorator_1 = require("../decorators/permissions.decorator");
let UserPermissionController = class UserPermissionController {
    constructor(userPermissionService) {
        this.userPermissionService = userPermissionService;
    }
    async assignPermissionToUser(data) {
        const assignData = {
            ...data,
            expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
        };
        return this.userPermissionService.assignPermissionToUser(assignData);
    }
    async removeUserPermission(userId, permissionId) {
        return this.userPermissionService.removeUserPermission(userId, permissionId);
    }
    async getUserPermissions(userId) {
        return this.userPermissionService.getUserPermissions(userId);
    }
    async getUserEffectivePermission(userId, permissionId) {
        return this.userPermissionService.getUserEffectivePermission(userId, permissionId);
    }
    async getUserEffectivePermissionByName(userId, permissionName) {
        return this.userPermissionService.getUserEffectivePermissionByName(userId, permissionName);
    }
    async findMany(userId, permissionId, isGranted, isExpired, page, limit) {
        return this.userPermissionService.findMany({
            userId,
            permissionId,
            isGranted: isGranted === 'true' ? true : isGranted === 'false' ? false : undefined,
            isExpired: isExpired === 'true' ? true : isExpired === 'false' ? false : undefined,
            page: page ? parseInt(page) : undefined,
            limit: limit ? parseInt(limit) : undefined,
        });
    }
    async batchAssignPermissions(data) {
        const assignData = {
            ...data,
            expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
        };
        return this.userPermissionService.batchAssignPermissions(assignData);
    }
    async cleanupExpiredPermissions() {
        return this.userPermissionService.cleanupExpiredPermissions();
    }
    async getPermissionStats() {
        return this.userPermissionService.getPermissionStats();
    }
};
exports.UserPermissionController = UserPermissionController;
__decorate([
    (0, common_1.Post)('assign'),
    (0, permissions_decorator_1.Permissions)('manage_user_permissions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "assignPermissionToUser", null);
__decorate([
    (0, common_1.Delete)(':userId/:permissionId'),
    (0, permissions_decorator_1.Permissions)('manage_user_permissions'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('permissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "removeUserPermission", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, permissions_decorator_1.Permissions)('view_user_permissions'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "getUserPermissions", null);
__decorate([
    (0, common_1.Get)('user/:userId/permission/:permissionId'),
    (0, permissions_decorator_1.Permissions)('view_user_permissions'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('permissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "getUserEffectivePermission", null);
__decorate([
    (0, common_1.Get)('user/:userId/permission-name/:permissionName'),
    (0, permissions_decorator_1.Permissions)('view_user_permissions'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('permissionName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "getUserEffectivePermissionByName", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('view_user_permissions'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('permissionId')),
    __param(2, (0, common_1.Query)('isGranted')),
    __param(3, (0, common_1.Query)('isExpired')),
    __param(4, (0, common_1.Query)('page')),
    __param(5, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "findMany", null);
__decorate([
    (0, common_1.Post)('batch-assign'),
    (0, permissions_decorator_1.Permissions)('manage_user_permissions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "batchAssignPermissions", null);
__decorate([
    (0, common_1.Post)('cleanup-expired'),
    (0, permissions_decorator_1.Permissions)('manage_user_permissions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "cleanupExpiredPermissions", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, permissions_decorator_1.Permissions)('view_user_permissions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserPermissionController.prototype, "getPermissionStats", null);
exports.UserPermissionController = UserPermissionController = __decorate([
    (0, common_1.Controller)('user-permissions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [user_permission_service_1.UserPermissionService])
], UserPermissionController);
//# sourceMappingURL=user-permission.controller.js.map