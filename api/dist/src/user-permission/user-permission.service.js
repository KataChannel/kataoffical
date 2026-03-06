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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserPermissionService = class UserPermissionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assignPermissionToUser(data) {
        const user = await this.prisma.user.findUnique({
            where: { id: data.userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${data.userId} not found`);
        }
        const permission = await this.prisma.permission.findUnique({
            where: { id: data.permissionId },
        });
        if (!permission) {
            throw new common_1.NotFoundException(`Permission with ID ${data.permissionId} not found`);
        }
        const grantingUser = await this.prisma.user.findUnique({
            where: { id: data.grantedBy },
        });
        if (!grantingUser) {
            throw new common_1.NotFoundException(`Granting user with ID ${data.grantedBy} not found`);
        }
        return this.prisma.userPermission.upsert({
            where: {
                userId_permissionId: {
                    userId: data.userId,
                    permissionId: data.permissionId,
                },
            },
            update: {
                isGranted: data.isGranted,
                grantedBy: data.grantedBy,
                grantedAt: new Date(),
                reason: data.reason,
                expiresAt: data.expiresAt,
                updatedAt: new Date(),
            },
            create: {
                userId: data.userId,
                permissionId: data.permissionId,
                isGranted: data.isGranted,
                grantedBy: data.grantedBy,
                grantedAt: new Date(),
                reason: data.reason,
                expiresAt: data.expiresAt,
            },
            include: {
                user: { select: { id: true, name: true, email: true } },
                permission: { select: { id: true, name: true, codeId: true } },
            },
        });
    }
    async removeUserPermission(userId, permissionId) {
        const userPermission = await this.prisma.userPermission.findFirst({
            where: {
                userId,
                permissionId,
            },
        });
        if (!userPermission) {
            throw new common_1.NotFoundException(`Permission with ID ${permissionId} is not assigned to User with ID ${userId}`);
        }
        return this.prisma.userPermission.delete({
            where: {
                id: userPermission.id,
            },
        });
    }
    async getUserPermissions(userId) {
        return this.prisma.userPermission.findMany({
            where: { userId },
            include: {
                permission: {
                    select: {
                        id: true,
                        name: true,
                        codeId: true,
                        description: true,
                        group: true,
                    },
                },
            },
            orderBy: [
                { isGranted: 'desc' },
                { permission: { name: 'asc' } },
            ],
        });
    }
    async getUserEffectivePermission(userId, permissionId) {
        const userPermission = await this.prisma.userPermission.findFirst({
            where: {
                userId,
                permissionId,
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } },
                ],
            },
            include: {
                permission: true,
            },
        });
        return userPermission;
    }
    async getUserEffectivePermissionByName(userId, permissionName) {
        const userPermission = await this.prisma.userPermission.findFirst({
            where: {
                userId,
                permission: { name: permissionName },
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } },
                ],
            },
            include: {
                permission: true,
            },
        });
        return userPermission;
    }
    async findMany(params) {
        const { userId, permissionId, isGranted, isExpired, page = 1, limit = 50 } = params;
        const where = {};
        if (userId)
            where.userId = userId;
        if (permissionId)
            where.permissionId = permissionId;
        if (typeof isGranted === 'boolean')
            where.isGranted = isGranted;
        if (typeof isExpired === 'boolean') {
            if (isExpired) {
                where.expiresAt = { lt: new Date() };
            }
            else {
                where.OR = [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } },
                ];
            }
        }
        const [data, total] = await Promise.all([
            this.prisma.userPermission.findMany({
                where,
                include: {
                    user: { select: { id: true, name: true, email: true } },
                    permission: { select: { id: true, name: true, codeId: true, description: true } },
                },
                orderBy: [
                    { createdAt: 'desc' },
                ],
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.userPermission.count({ where }),
        ]);
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async batchAssignPermissions(data) {
        const results = [];
        for (const userId of data.userIds) {
            for (const permissionId of data.permissionIds) {
                const result = await this.prisma.userPermission.upsert({
                    where: {
                        userId_permissionId: { userId, permissionId },
                    },
                    update: {
                        isGranted: data.isGranted,
                        grantedBy: data.grantedBy,
                        grantedAt: new Date(),
                        reason: data.reason,
                        expiresAt: data.expiresAt,
                    },
                    create: {
                        userId,
                        permissionId,
                        isGranted: data.isGranted,
                        grantedBy: data.grantedBy,
                        reason: data.reason,
                        expiresAt: data.expiresAt,
                    },
                });
                results.push(result);
            }
        }
        return results;
    }
    async cleanupExpiredPermissions() {
        return this.prisma.userPermission.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                },
            },
        });
    }
    async getPermissionStats() {
        const [totalUserPermissions, activePermissions, expiredPermissions, grantedPermissions, deniedPermissions,] = await Promise.all([
            this.prisma.userPermission.count(),
            this.prisma.userPermission.count({
                where: {
                    OR: [
                        { expiresAt: null },
                        { expiresAt: { gt: new Date() } },
                    ],
                },
            }),
            this.prisma.userPermission.count({
                where: {
                    expiresAt: { lt: new Date() },
                },
            }),
            this.prisma.userPermission.count({
                where: {
                    isGranted: true,
                    OR: [
                        { expiresAt: null },
                        { expiresAt: { gt: new Date() } },
                    ],
                },
            }),
            this.prisma.userPermission.count({
                where: {
                    isGranted: false,
                    OR: [
                        { expiresAt: null },
                        { expiresAt: { gt: new Date() } },
                    ],
                },
            }),
        ]);
        return {
            total: totalUserPermissions,
            active: activePermissions,
            expired: expiredPermissions,
            granted: grantedPermissions,
            denied: deniedPermissions,
        };
    }
};
exports.UserPermissionService = UserPermissionService;
exports.UserPermissionService = UserPermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserPermissionService);
//# sourceMappingURL=user-permission.service.js.map