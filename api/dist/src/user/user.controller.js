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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const audit_decorator_1 = require("../auditlog/audit.decorator");
const client_1 = require("@prisma/client");
const cache_interceptor_1 = require("../common/cache.interceptor");
const smart_cache_decorator_1 = require("../common/smart-cache.decorator");
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    create(dto) {
        return this.userService.createUser(dto);
    }
    findAll() {
        return this.userService.findAll();
    }
    async getProfile(req) {
        return this.userService.findOne(req.user.id);
    }
    async assignRoleToUser(data) {
        return this.userService.assignRoleToUser(data);
    }
    async removeRoleFromUser(data) {
        return this.userService.removeRoleFromUser(data);
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    update(id, data) {
        return this.userService.update(id, data);
    }
    remove(id) {
        return this.userService.remove(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, audit_decorator_1.Audit)({ entity: 'Create User', action: client_1.AuditAction.CREATE, includeResponse: true }),
    (0, smart_cache_decorator_1.SmartCache)({
        invalidate: ['users'],
        get: { ttl: 1200, keyPrefix: 'users' },
        updateCache: true
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, cache_interceptor_1.Cache)(1200, 'users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('assign'),
    (0, audit_decorator_1.Audit)({ entity: 'Assign Role to User', action: client_1.AuditAction.CREATE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['users', 'roles']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "assignRoleToUser", null);
__decorate([
    (0, common_1.Delete)('remove'),
    (0, audit_decorator_1.Audit)({ entity: 'Remove Role from User', action: client_1.AuditAction.DELETE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['users', 'roles']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeRoleFromUser", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    (0, cache_interceptor_1.Cache)(1200, 'users'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Update User', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    (0, smart_cache_decorator_1.SmartCache)({
        invalidate: ['users'],
        get: { ttl: 1200, keyPrefix: 'users' },
        updateCache: true
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, audit_decorator_1.Audit)({ entity: 'Delete User', action: client_1.AuditAction.DELETE, includeResponse: true }),
    (0, cache_interceptor_1.CacheInvalidate)(['users']),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map